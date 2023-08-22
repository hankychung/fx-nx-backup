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
import { AlertWithOkAndCancel, useMessage } from '@flyele-nx/ui'
import { LabelApi } from '@flyele-nx/service'
import { TagType, TagWidgetColor } from '@flyele-nx/constant'
import { TagUtils } from '../../../tag_utils'
import TagWidget from '../../../tag-widget'
import TagAddButton from '../../../tag-add-button'
import { TagsHandler } from '@flyele-nx/zustand-handler'

export interface TagEditAreaProps {
  showTagModal: boolean
  defaultSelectedKeys?: string[]
  onSure?: (tags: TagModel[], selectedTagKeys: string[]) => void
  onCancel?: (isChanged: boolean) => void
  isShowTagModal: React.Dispatch<React.SetStateAction<boolean>>
}

export default function TagEditArea(props: TagEditAreaProps) {
  const {
    defaultSelectedKeys,
    onSure,
    showTagModal,
    onCancel,
    isShowTagModal
  } = props

  const inputRef = useRef<InputRef>({})

  // useEffect(() => {
  //   // // 事件订阅
  //   // if (controller) {
  //   //   controller.addListener((event) => {
  //   //     if (event) {
  //   //       switch (event.type) {
  //   //         case TagEditAreaEventKey.visible:
  //   //           setVisible(event.data as boolean)
  //   //           break
  //   //         case TagEditAreaEventKey.setKeys:
  //   //           setSelectedTags(event.data as string[])
  //   //           break
  //   //         default:
  //   //       }
  //   //     }
  //   //   })
  //   // }
  //   setVisible(showTagModal)
  //   console.log('又设置为true了嘛？', showTagModal)
  // }, [showTagModal])

  // 标签数据
  const [tags, setTags] = useState<TagModel[]>([])

  const Tags = TagsHandler.getTagsList()

  // 选中的数据
  const [selectedTags, setSelectedTags] = useState<string[]>([])

  // // 模态框状态
  // const [visible, setVisible] = useState(false)

  // 是否显示 添加框
  const [addVisible, setAddVisible] = useState(false)

  // 是否加载中
  const [loading, setLoading] = useState(false)

  // 添加标签最大值
  const maxSelectedTag = 5

  // 当前右击的对象
  const currentTag = useRef<TagModel | undefined>(undefined)

  // 是否改变过
  const isChanged = useRef<boolean>(false)

  const [showMsg] = useMessage()

  useEffect(() => {
    // 打开弹窗
    if (showTagModal) {
      // setSelectedTags(Tags)
      setTags([...Tags])
    }

    // 关闭弹窗
    if (!showTagModal) {
      isChanged.current = false
      setAddVisible(false)
    }
  }, [showTagModal, Tags])

  // 修改对话框 内容
  const buildUpdateAlert = () => {
    const onChange = async (name: string, color: TagWidgetColor) => {
      if (currentTag.current) {
        currentTag.current = { id: currentTag.current?.id, name, color }
      }
    }

    return (
      <div className={css['update-alert']}>
        <h1>修改标签后，该标签的事项、会议也会修改。</h1>
        <TagInput
          defaultValue={currentTag.current?.name}
          defaultColor={currentTag.current?.color}
          onChange={onChange}
          emptyCallBack={() => {
            showMsg({
              msgType: '消息',
              content: '请输入标签文本1~12个字'
            })
          }}
        />
      </div>
    )
  }

  const updateTagEvent = async (resolve: (v: boolean) => void) => {
    if (currentTag.current) {
      const { id, name, color } = currentTag.current

      if (name.trim().length === 0) {
        showMsg({ msgType: '消息', content: '标签名不能为空' })
        resolve(false)
        return
      }

      const res = await LabelApi.updateTag({
        id,
        name: name.trim(),
        color,
        type: TagType.ordinary
      })

      if (res) {
        onUpdateTag(id)
        showMsg({ msgType: '消息', content: '修改成功' })
        resolve(true)

        // Pubjs.publish(Pub.BATCH_UPDATE_TAG, {
        //   tags: [
        //     {
        //       id,
        //       name: name.trim(),
        //       color
        //     }
        //   ]
        // })
      } else {
        showMsg({ msgType: '错误', content: '修改失败' })
        resolve(false)
      }
    }
  }

  const [deleteVisible, toggleDeleteVisible] = useState(false)

  // 删除的对话框
  // const { alertCtx: delAlertCtx, showAlert: delShowAlert } = useAlert({
  //   message: `删除后，标签“${currentTag.current?.name}”将会从事项、会议中移除。`,
  //   cancelTxt: '取消',
  //   confirmTxt: '删除',
  //   color: 'red',
  //   onConfirm: async ({ resolve }) => {
  //     try {
  //       const id = currentTag.current?.id

  //       if (id) {
  //         const res = await tagApi.deleteTag(id)

  //         if (res) {
  //           const index = tags.findIndex((item) => item.id === id)

  //           tags.splice(index, 1)
  //           onRemoveTag(id)
  //         } else {
  //           showMsg({
  //             msgType: '错误',
  //             content: '删除标签失败',
  //           })
  //         }
  //       }
  //       resolve(true)
  //     } catch (error) {
  //       console.log(error)
  //     }
  //   },
  // })

  /**
   * 当你想将下面这几段代码注释掉，直接使用 tags 数据的时候
   * 你会见识到什么是真正的魔法，唯有黑魔法才能将其击败
   */
  // const [forceUpdate, set_forceUpdate] = useState(1)

  // useEffect(() => {
  //   set_forceUpdate((count) => count + 1)
  // }, [tags])

  const handleDelete = (node: any) => {
    currentTag.current = findTag(node.dataset.id as string)
    toggleDeleteVisible(true)
  }

  // 右击弹出

  // 找当前 tag
  const findTag = (id: string): TagModel | undefined => {
    let tag: TagModel | undefined

    try {
      tag = tags.find((item) => item.id === id)
    } catch (e) {
      console.error(e)
    }
    return tag
  }

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

  // 移除已选标签
  const onRemoveTag = (id: string) => {
    const index = selectedTags.indexOf(id)

    // 移除选中的标签不能 按取消
    if (index >= 0) {
      selectedTags.splice(index, 1)
      setSelectedTags([...selectedTags])
      isChanged.current = true
    }
  }

  // 更新标签
  const onUpdateTag = (id: string) => {
    if (currentTag.current) {
      const index = tags.findIndex((item) => item.id === id)

      tags[index] = currentTag.current

      const _index = selectedTags.indexOf(id)

      // 更新了选中的标签不能 按取消
      if (_index >= 0) {
        isChanged.current = true
      }
      setTags([...tags])
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
    const onTogetherTag = (id: string) => {
      /** 只能添加5个 **/
      if (!selectedTags.includes(id)) {
        if (selectedTags.length < maxSelectedTag) {
          setSelectedTags([id, ...selectedTags])
        } else {
          showMsg({ msgType: '消息', content: '最多只能选择5个标签' })
        }
      } else {
        onRemoveTag(id)
      }
    }

    return (
      <div className={css['tag-edit']}>
        {tags &&
          tags.map((item) => {
            return (
              <div key={item.id} className="tag-context-menu" data-id={item.id}>
                <TagWidget
                  done={selectedTags.includes(item.id)}
                  {...item}
                  onClick={onTogetherTag}
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
        showMsg({ msgType: '消息', content: '请输入标签名称' })
        return
      }
      if (
        way &&
        way === 'click' &&
        name &&
        selectedTags.length === maxSelectedTag
      ) {
        showMsg({ msgType: '消息', content: '最多只能选择5个标签' })
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
      showMsg({
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
    if (loading) return null
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

      <AlertWithOkAndCancel
        confirmTxt="删除"
        cancelTxt="取消"
        visible={deleteVisible}
        message={`删除后，标签“${currentTag.current?.name}”将会从事项、会议中移除。`}
        onCancel={() => toggleDeleteVisible(!deleteVisible)}
        onOk={async () => {
          try {
            const id = currentTag.current?.id

            if (id) {
              const res = await LabelApi.deleteTag(id)

              if (res) {
                const _tags = cloneDeep(tags)
                const index = _tags.findIndex((item) => item.id === id)

                _tags.splice(index, 1)

                setTags(_tags)

                onRemoveTag(id)
                toggleDeleteVisible(false)
                // Pubjs.publish(PUB.DEL_TAG, { tagId: id })
              } else {
                showMsg({
                  msgType: '错误',
                  content: '删除标签失败'
                })
              }
            }
          } catch (error) {
            showMsg({
              msgType: '错误',
              content: '删除标签失败'
            })
            console.log(error)
          }
        }}
      />
    </>
  )
}
