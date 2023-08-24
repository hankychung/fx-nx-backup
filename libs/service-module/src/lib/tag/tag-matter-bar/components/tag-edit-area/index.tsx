/**
 author: william   email:362661044@qq.com
 create_at:2021/10/20 下午 4:42
 **/

import React, { useEffect, useRef, useState } from 'react'
import { Modal } from 'antd'
import { cloneDeep } from 'lodash'
import css from './index.module.scss'
import { TagModel } from '@flyele-nx/types'
import { InputRef, TagInput } from '../../../tag-input'
import { LabelApi } from '@flyele-nx/service'
import { TagType, TagWidgetColor } from '@flyele-nx/constant'
import { TagUtils } from '../../../tag_utils'
import TagWidget from '../../../tag-widget'
import TagAddButton from '../../../tag-add-button'
import { useTagInfoStore } from '@flyele-nx/zustand-store'
import { globalNxController } from '@flyele-nx/global-processor'
export interface TagEditAreaProps {
  showTagModal: boolean
  defaultSelectedKeys?: string[]
  onSure?: (tags: TagModel[], selectedTagKeys: string[]) => void
  onCancel?: (isChanged: boolean) => void
  isShowTagModal: React.Dispatch<React.SetStateAction<boolean>>
}

export default function TagEditArea(props: TagEditAreaProps) {
  const {
    defaultSelectedKeys = [],
    onSure,
    showTagModal,
    onCancel,
    isShowTagModal
  } = props

  const inputRef = useRef<InputRef>({})

  // 标签数据
  const [tags, setTags] = useState<TagModel[]>([])

  const tagsList = useTagInfoStore((state) => state.tagsList)

  // 选中的数据
  const [selectedTags, setSelectedTags] = useState<string[]>([])

  // 是否显示 添加框
  const [addVisible, setAddVisible] = useState(false)

  // 添加标签最大值
  const maxSelectedTag = 5

  // 是否改变过
  const isChanged = useRef<boolean>(false)

  useEffect(() => {
    // 打开弹窗
    if (showTagModal) {
      setSelectedTags(defaultSelectedKeys)
      setTags([...tagsList])
    }

    // 关闭弹窗
    if (!showTagModal) {
      isChanged.current = false
      setAddVisible(false)
    }
  }, [defaultSelectedKeys, showTagModal, tagsList])

  // 关闭modal
  const onClose = () => {
    setSelectedTags([])
    isShowTagModal(false)
  }

  // 取消按钮
  const _onCancel = () => {
    setSelectedTags([])
    isShowTagModal(false)

    onCancel && onCancel(isChanged.current)
  }

  // 确定按钮
  const _onSure = async () => {
    const { name, pickerColor } = inputRef.current

    if (onSure) {
      /**
       * 判断是否处于输入状态
       * 判断标签数超过5个
       * 返回时 onSure 时，需要重新对选中id进行排序
       */

      if (name) {
        onAddTag(
          name!,
          pickerColor!,
          ({ tags, selectedTags }) => {
            const isExceed = selectedTags.length > 5

            const _selectedTags: string[] = cloneDeep(selectedTags)
            // 将最新的先删除
            const firstId = _selectedTags.splice(0, 1).join('')

            if (isExceed) {
              // 将上一次的第一个删除
              _selectedTags.splice(0, 1)
            }

            // 将最新的加回到最后
            _selectedTags.unshift(firstId)

            onSure(tags, _selectedTags)
            onClose()
          },
          'click'
        )
        return
      }

      onSure(tags, selectedTags)
    }
    onClose()
  }
  // 移除标签
  const onRemoveTag = (id: string) => {
    /** 只能添加5个 **/
    if (!selectedTags.includes(id)) {
      if (selectedTags.length < maxSelectedTag) {
        setSelectedTags([id, ...selectedTags])
      } else {
        console.log('最多只能选择5个标签')
        globalNxController.showMsg({
          msgType: '消息',
          content: '最多只能选择5个标签'
        })
      }
    } else {
      // 移除已选标签
      const index = selectedTags.indexOf(id)
      if (index >= 0) {
        selectedTags.splice(index, 1)
        setSelectedTags([...selectedTags])
        isChanged.current = true
      }
    }
  }

  // 底部按钮
  const buildFooter = () => {
    return (
      <div className={css['tag-footer']}>
        <div
          className={`${css['tag-footer-btn']} ${css.cancel}`}
          onClick={() => _onCancel()}
        >
          取消
        </div>

        <div
          className={`${css['tag-footer-btn']} ${css.sure}`}
          onClick={() => _onSure()}
        >
          确定
        </div>
      </div>
    )
  }

  /** 已选标签区域 **/
  const buildSelectedTagBox = () => {
    const tagListMap = TagUtils.transformTagsMap(tags)
    return (
      <div className={css['tag-edit']}>
        {selectedTags.map((_item) => {
          const item = tagListMap.get(_item)

          if (!item) return null

          return (
            <div key={item.id}>
              <TagWidget {...item} onClick={onRemoveTag} />
            </div>
          )
        })}
      </div>
    )
  }

  /** 添加标签区域 **/
  const buildTagEditBox = () => {
    return (
      <div className={css['tag-edit']}>
        {tags &&
          tags.map((item) => {
            return (
              <div key={item.id} className="tag-context-menu" data-id={item.id}>
                <TagWidget
                  done={selectedTags.includes(item.id)}
                  {...item}
                  onClick={onRemoveTag}
                  tag_id={item.id}
                />
              </div>
            )
          })}
        <TagAddButton
          visible={addVisible}
          onClick={() => setAddVisible(true)}
        />
      </div>
    )
  }

  // 区域标题
  const buildTitle = (title: string, tips: string) => {
    return (
      <h1>
        <>{title}</>
        &nbsp;
        <span>{tips}</span>
      </h1>
    )
  }

  const onAddTag = async (
    text: string,
    color: TagWidgetColor,
    callback?: (arg: { tags: TagModel[]; selectedTags: string[] }) => void,
    way?: 'click' | 'enter'
  ) => {
    try {
      const { name } = inputRef.current

      if (!text.trim()) {
        globalNxController.showMsg({
          msgType: '消息',
          content: '请输入标签名称'
        })
        return
      }
      if (
        way &&
        way === 'click' &&
        name &&
        selectedTags.length === maxSelectedTag
      ) {
        globalNxController.showMsg({
          msgType: '消息',
          content: '最多只能选择5个标签'
        })
        return
      }

      const res = await LabelApi.createTag({
        name: text,
        color,
        type: TagType.ordinary
      })
      const tagId = res!.data as string
      const obj: TagModel = { name: text, color, id: tagId }

      // 新创建的时候顺序改变了
      const newTags = [obj, ...tags]
      const newSelectedTags = [tagId, ...selectedTags]

      setTags(newTags)

      // 自动添加
      if (selectedTags.length < maxSelectedTag) {
        setSelectedTags(newSelectedTags)
      }

      callback && callback({ tags: newTags, selectedTags: newSelectedTags })
    } catch (e) {
      globalNxController.showMsg({
        msgType: '消息',
        content: `“${text}” 标签名称已存在`,
        duration: 1.5
      })
    }
  }

  /** 添加tag框 **/
  const buildTagInput = () => {
    // 调服务

    return (
      <div
        style={{ display: addVisible ? 'block' : 'none' }}
        className={css['tag-input-container']}
      >
        <TagInput
          ref={inputRef}
          onTap={onAddTag}
          emptyCallBack={() => {
            setAddVisible(false)
          }}
        />
      </div>
    )
  }

  const buildContent = () => {
    return (
      <>
        <div className={css['tag-edit-area']}>
          <div className={css.container}>
            {buildTitle(
              '已选标签',
              `(${`${selectedTags.length}/${maxSelectedTag}`})`
            )}
            {buildSelectedTagBox()}
          </div>
          <div className={css.container}>
            {buildTitle('常用标签', '(添加的标签，仅自己可见)')}
            {buildTagEditBox()}
            {buildTagInput()}
          </div>
        </div>
        {buildFooter()}
      </>
    )
  }

  return (
    <>
      <Modal
        closable={false}
        mask={false}
        maskClosable={false}
        footer={null}
        title={null}
        centered
        open={showTagModal}
        destroyOnClose
        onCancel={_onCancel}
      >
        <div id="TagEditArea">{buildContent()}</div>
      </Modal>
    </>
  )
}
