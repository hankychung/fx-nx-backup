import React, { useState, useEffect } from 'react'
import { TagInput } from '../tag-input'
import { useMemoizedFn, useMount } from 'ahooks'
import TagWidget, { TagWidgetModel } from '../tag-widget'
import TagAddButton from '../tag-add-button'
import { cloneDeep, uniqBy } from 'lodash'
import style from './index.module.scss'
import {
  LabelApi,
  TagObjType,
  IScheduleTask,
  ScheduleTaskConst,
  TagConst
} from '@flyele-nx/service'
import { useMessage } from '@flyele-nx/ui'
import { globalNxController } from '../../global/nxController'
import PUB from '../../global/types/pubsub'
import { useUserInfoStore } from '../../store/useUserInfoStore'
import {
  EditTagType,
  MatterStatus,
  PeopleType
} from '../../global/types/sensor/matter'

interface ITagContent {
  data: Pick<
    IScheduleTask,
    'tags' | 'matter_type' | 'creator_id' | 'ref_task_id'
  > & {
    ref_task_id?: string
  }
}

const TagContent: React.FC<ITagContent> = ({ data }) => {
  const userId = useUserInfoStore((state) => state.userInfo.user_id)
  const [showMsg] = useMessage()
  const { tags, matter_type, ref_task_id, creator_id } = data

  const [tagList, setTagList] = useState<TagWidgetModel[]>([])
  const [showInput, setShowInput] = useState<boolean>(false)
  // 选中的数据
  const [selectedTags, setSelectedTags] = useState<string[]>([])

  // 添加标签最大值
  const maxSelectedTag = 5

  const type: Record<number, TagObjType> = {
    10701: 'task',
    10705: 'todo',
    10702: 'meeting',
    10708: 'project'
  }

  useEffect(() => {
    if (tags) {
      const selectedIds: string[] = []

      tags.forEach((tag) => {
        // 为了兼容后端的字段名字不统一
        // 热更新的时候推的是 id 全量列表返回的字段叫 tag_id
        const id = tag.tag_id || tag.id

        if (id) {
          selectedIds.push(id)
        }
      })

      setSelectedTags(selectedIds)
    } else {
      setSelectedTags([])
    }
  }, [tags])

  /**
   * 排序规则
   * 选中的，先排在前面
   */
  const sortList = useMemoizedFn((data: TagWidgetModel[]) => {
    if (tags && tags.length) {
      const cloneTags = tags.map((tag) => {
        return {
          id: tag.tag_id || tag.id,
          name: tag.name,
          color: tag.color
        }
      })
      const cloneData = cloneDeep(data)
      const target = cloneTags.concat(cloneData)

      return uniqBy(target, 'id')
    }
    return data
  })

  /**
   * 请求默认tag
   */
  const fetchTags = useMemoizedFn(async () => {
    const { code, data } = await LabelApi.getTagList()

    if (code === 0) {
      // 为了顺序，选中的要显示在前面
      const resData = sortList(data as TagWidgetModel[])

      setTagList([...resData])
    }
  })

  const onVisibleChange = useMemoizedFn(async () => {
    await fetchTags()
  })

  useMount(() => {
    onVisibleChange()
  })

  /**
   * 点击每一项
   * */
  const onClickItem = useMemoizedFn(
    async (tagId: string, isCreate?: boolean) => {
      const cloneSelectedTags = [...selectedTags]

      if (isCreate && selectedTags.length >= maxSelectedTag) {
        cloneSelectedTags.splice(0, 1)
      }
      const findTagIndex = cloneSelectedTags.findIndex((id) => id === tagId)

      if (findTagIndex === -1) {
        cloneSelectedTags.push(tagId)
      } else {
        cloneSelectedTags.splice(findTagIndex, 1)
      }

      if (cloneSelectedTags.length <= maxSelectedTag) {
        try {
          const {
            data: { code }
          } = await LabelApi.bindTag({
            tagKeys: cloneSelectedTags,
            refId: ref_task_id,
            obj_type: type[matter_type]
          })

          if (code === 0) {
            const targetTags: TagWidgetModel[] = []

            for (let i = 0; i < tagList.length; i++) {
              const tagId = tagList[i].id

              if (tagId && cloneSelectedTags.includes(tagId)) {
                targetTags.push(tagList[i])
              }
            }

            globalNxController.pubJsPublish(PUB.UPDATE_TAGS, {
              task_id: ref_task_id,
              tags: targetTags
            })

            setSelectedTags(cloneSelectedTags)

            const business_type = ScheduleTaskConst.MatterTypeLabel[matter_type]

            globalNxController.sensorSend('SEN__bind_tag', {
              enter_page: EditTagType.full,
              business_id: ref_task_id,
              add_people_id: userId || '', // 添加人 id
              add_people_type:
                creator_id === userId ? PeopleType.creator : PeopleType.taker, // 添加人类型
              business_type, // 业务类型
              add_to_label_state: MatterStatus.create_done_add, // 添加标签时状态
              label_name: targetTags.map((item) => item.name).join(',')
            })
          }
        } catch (e) {
          showMsg({ msgType: '错误', content: '选择标签失败' })
        }
      } else {
        showMsg({ msgType: '消息', content: '最多只能选择5个标签' })
      }
    }
  )

  /**
   * 新增tag
   */
  const onCreateTag = useMemoizedFn(
    async (text: string, color: TagConst.TagWidgetColor) => {
      try {
        const { data } = await LabelApi.createTag({
          name: text,
          color,
          type: TagConst.TagType.ordinary
        })
        const tagId = data?.data as string

        await fetchTags()
        // 自动添加
        onClickItem(tagId, true)

        return true
      } catch (e) {
        showMsg({
          msgType: '消息',
          content: `“${text}” 标签名称已存在`,
          duration: 1.5
        })
        return false
      }
    }
  )

  /**
   * 输入回车确定
   */
  const onEnterTap = useMemoizedFn(async (test, color) => {
    const createRes = await onCreateTag(test, color)

    if (createRes) setShowInput(false)
  })

  return (
    <div
      className={style.tagPopoverRoot}
      onClick={(event) => {
        event.stopPropagation()
      }}
    >
      {tagList.map((item) => (
        <TagWidget
          key={item.id}
          {...item}
          done={selectedTags.includes(item.id)}
          onClick={() => onClickItem(item.id, false)}
        />
      ))}
      {!showInput && (
        <TagAddButton
          onClick={() => {
            setShowInput(true)
          }}
        />
      )}
      {showInput && (
        <TagInput onTap={onEnterTap} wrapCla={style.tagInputRoot} />
      )}
    </div>
  )
}

export default TagContent
