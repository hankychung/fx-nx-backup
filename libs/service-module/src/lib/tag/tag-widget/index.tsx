/**
 author: william   email:362661044@qq.com
 create_at:2021/10/20 下午 3:10
 **/

import React, { MouseEvent, useRef, useState } from 'react'
import { LabelApi, TagModel } from '@flyele-nx/service'
import classNames from 'classnames'
import { TagUtils } from '../tag_utils'
import css from './index.module.scss'
import { DoneIcon } from '@flyele-nx/icon'
import { useMemoizedFn } from 'ahooks'
import { contextMenuTool } from '../../context-menu/contextMenuTool'
import { useTagsMenuActions } from '../tag-matter-bar/hooks/useTagsMenuActions'
import { TagType, TagWidgetColor } from '@flyele-nx/constant'
import { TagInput } from '../tag-input'
import { AlertWithOkAndCancel, useMessage } from '@flyele-nx/ui'
import { TagsHandler } from '@flyele-nx/zustand-handler'
import { useTagInfoStore } from '@flyele-nx/zustand-store'
import useAlert from '../tag-matter-bar/hooks/useAlert'
import { cloneDeep } from 'lodash'

export enum TagWidgetSize {
  normal = 'normal',
  large = 'large'
}

export interface TagWidgetModel extends TagModel {
  done?: boolean
  onClick?: (id: string) => void
  colourful?: boolean
  size?: TagWidgetSize
  widgetContainerCla?: string
  nowrap?: boolean
  tag_id?: string
}

// const brNotColor = 'rgba(235, 235, 235, 1)'
const textNotColor = 'rgba(153, 159, 171, 1)'

export default function TagWidget(props: TagWidgetModel) {
  const {
    name,
    done,
    color,
    id,
    onClick: _onClick,
    colourful = true,
    size = TagWidgetSize.normal,
    widgetContainerCla,
    nowrap = false,
    tag_id = ''
  } = props

  const bgColor = TagUtils.getBgColor(color)
  const textColor = TagUtils.getTextColor(color)
  const [deleteVisible, toggleDeleteVisible] = useState(false)
  const tagsList = useTagInfoStore((state) => state.tagsList)

  // 当前右击的对象
  const currentTag = useRef<TagModel | undefined>(undefined)
  const [showMsg] = useMessage()

  // size 类名 判断
  const sizeClassName = (): string => {
    switch (size) {
      case TagWidgetSize.normal:
        return css['tag-normal']
      case TagWidgetSize.large:
        return css['tag-large']
      default:
        return ''
    }
  }

  const tagCn = classNames([css.tag, sizeClassName()], {
    [css['not-color']]: !colourful,
    [css['empty-color']]: colourful && id === '-1',
    [css.nowrapClass]: nowrap
  })

  /**
   * 打开右键菜单
   */
  const handleContextMenu = useMemoizedFn(
    (event: MouseEvent<HTMLDivElement>) => {
      event.preventDefault()
      event.stopPropagation()

      contextMenuTool.open({
        x: event.clientX,
        y: event.clientY,
        action: menuActions
      })
    }
  )

  // 更新标签
  const onUpdateTag = (id: string) => {
    if (currentTag.current) {
      const _tagsList = cloneDeep(tagsList)

      const index = _tagsList.findIndex((item) => item.id === id)

      _tagsList[index] = currentTag.current
      TagsHandler.updateTagsList(_tagsList)
    }
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
      } else {
        showMsg({ msgType: '错误', content: '修改失败' })
        resolve(false)
      }
    }
  }
  // 修改标签对话框
  const buildUpdateAlert = () => {
    const onChange = async (name: string, color: TagWidgetColor) => {
      currentTag.current = { id, name, color }
    }

    return (
      <div className={css['update-alert']}>
        <h1>修改标签后，该标签的事项、会议也会修改。</h1>
        <TagInput
          defaultValue={name}
          defaultColor={color}
          onChange={onChange}
          onTap={() => {
            updateTagEvent(hideAlert)
          }}
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
  // 修改对话框
  const { alertCtx, showAlert, hideAlert } = useAlert({
    message: buildUpdateAlert(),
    cancelTxt: '取消',
    confirmTxt: '保存',
    color: 'red',
    onConfirm: async ({ resolve }) => {
      updateTagEvent(resolve)
    }
  })
  const { menuActions } = useTagsMenuActions({
    tag_id,
    toggleDeleteVisible,
    showAlert
  })
  const tagTextCn = classNames([css['tag-text']], {
    [css['tag-text-large']]: size === TagWidgetSize.large
  })

  return (
    <div
      className={classNames(`${css['tag-container']}`, widgetContainerCla)}
      key={id}
      onClick={_onClick ? () => _onClick(id) : undefined}
      onContextMenu={handleContextMenu}
    >
      <div
        className={tagCn}
        style={{
          // backgroundColor: colourful ? bgColor : 'white',
          backgroundColor: colourful && id !== '-1' ? bgColor : 'white'
        }}
      >
        <span
          className={tagTextCn}
          style={{
            color:
              id !== '-1' ? (colourful ? textColor : textNotColor) : '#6A6A6A'
          }}
        >
          {name}
        </span>
        {done ? (
          <DoneIcon
            width={11}
            height={11}
            className={css['tag-done']}
            color={id !== '-1' ? textColor : '#6A6A6A'}
          />
        ) : null}
      </div>
      {alertCtx}
      <AlertWithOkAndCancel
        confirmTxt="删除"
        cancelTxt="取消"
        visible={deleteVisible}
        message={`删除后，标签“${name}”将会从事项、会议中移除。`}
        onCancel={() => toggleDeleteVisible(!deleteVisible)}
        onOk={async () => {
          try {
            const res = await LabelApi.deleteTag(id)
            if (res) {
              const _Tags = tagsList.filter((item) => item.id !== id)
              TagsHandler.updateTagsList(_Tags)
              toggleDeleteVisible(false)
            } else {
              showMsg({
                msgType: '错误',
                content: '删除标签失败'
              })
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
    </div>
  )
}
