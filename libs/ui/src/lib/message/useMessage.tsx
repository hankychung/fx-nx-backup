import React, { ReactNode } from 'react'
import { message } from 'antd'
import { useMemoizedFn } from 'ahooks'

import { MessageSimpleLine } from './MessageSimpleLine'
import { MessageWithIcon } from './MessageWithIcon'
import { MessageUploadError } from './MessageUploadError'
import { MessageApplication } from './MessageApplication'

declare type MsgType =
  | '消息'
  | '消息长'
  | '成功'
  | '错误'
  | '日历'
  | '撒花'
  | '时间'
  | '上传错误'
  | '个人会员'
  | '团队会员'
  | '应用发布'

type Msg = {
  msgType?: MsgType
  content?: string | any
  line2content?: string | any
  duration?: number | any
  key?: string
  icon?: ReactNode
  style?: React.CSSProperties
  top?: number
  fun?: () => void
}

export const showMsg = ({
  msgType = '消息',
  content = '',
  line2content = '',
  duration = 1.5,
  key = '', // 控制同步的key
  // icon = undefined,
  style = undefined, // 额外的样式
  top = 24,
  fun
}: Msg) => {
  message.destroy()

  message.config({ top, rtl: false })

  switch (msgType) {
    case '消息':
      return message.info({
        content: ' ',
        key: key || 'msg01',
        style,
        icon: <MessageSimpleLine content={content} iconName={msgType} />,
        duration
      })
    case '消息长':
      return message.info({
        content: ' ',
        key: key || 'msg01',
        style,
        icon: <MessageSimpleLine content={content} iconName={msgType} />,
        duration
      })
    case '成功':
      return message.info({
        content: ' ',
        key: key || 'msg02',
        style,
        icon: <MessageSimpleLine content={content} iconName={msgType} />,
        duration
      })

    case '时间':
      return message.info({
        content: ' ',
        key: key || 'msg02',
        style,
        icon: <MessageSimpleLine content={content} iconName={msgType} />,
        duration
      })
    case '错误':
      return message.info({
        content: ' ',
        key: key || 'msg03',
        style,
        icon: <MessageSimpleLine content={content} iconName={msgType} />,
        duration
      })
    case '日历':
      return message.info({
        content: ' ',
        key: key || 'msg04',
        duration,
        style,
        icon: (
          <MessageWithIcon
            content={content}
            line2content={line2content}
            iconName={msgType}
          />
        )
      })
    case '撒花':
      return message.info({
        content: ' ',
        key: key || 'msg05',
        duration,
        style,
        icon: (
          <MessageWithIcon
            content={content}
            line2content={line2content}
            iconName={msgType}
          />
        )
      })
    case '上传错误':
      return message.info({
        content: ' ',
        key: key || 'msg06',
        duration,
        style,
        className: 'uploadError_notice',
        icon: (
          <MessageUploadError content={content} line2content={line2content} />
        )
      })
    case '应用发布':
      return message.info({
        content: ' ',
        key: key || 'msg07',
        duration,
        style,
        icon: (
          <MessageApplication
            content={content}
            line2content={line2content}
            fun={fun}
          />
        )
      })
    default:
      return 0
  }
}

export const clearAllMsg = () => {
  message.destroy()
}

export const useMessage = (): [(v: Msg) => void, () => void] => {
  // 显示消息框
  const showMsg = useMemoizedFn(
    ({
      msgType = '消息',
      content = '',
      line2content = '',
      duration = 1.5,
      key = '', // 控制同步的key
      // icon = undefined,
      style = undefined, // 额外的样式
      top = 24
    }: Msg) => {
      message.destroy()
      message.config({ top })
      switch (msgType) {
        case '消息':
          return message.info({
            content: ' ',
            key: key || 'msg01',
            style,
            icon: <MessageSimpleLine content={content} iconName={msgType} />,
            duration
          })
        case '消息长':
          return message.info({
            content: ' ',
            key: key || 'msg01',
            style,
            icon: <MessageSimpleLine content={content} iconName={msgType} />,
            duration
          })
        case '成功':
          return message.info({
            content: ' ',
            key: key || 'msg02',
            style,
            icon: <MessageSimpleLine content={content} iconName={msgType} />,
            duration
          })

        case '时间':
          return message.info({
            content: ' ',
            key: key || 'msg02',
            style,
            icon: <MessageSimpleLine content={content} iconName={msgType} />,
            duration
          })
        case '错误':
          return message.info({
            content: ' ',
            key: key || 'msg03',
            style,
            icon: <MessageSimpleLine content={content} iconName={msgType} />,
            duration
          })
        case '日历':
          return message.info({
            content: ' ',
            key: key || 'msg04',
            duration,
            style,
            icon: (
              <MessageWithIcon
                content={content}
                line2content={line2content}
                iconName={msgType}
              />
            )
          })
        case '撒花':
          return message.info({
            content: ' ',
            key: key || 'msg05',
            duration,
            style,
            icon: (
              <MessageWithIcon
                content={content}
                line2content={line2content}
                iconName={msgType}
              />
            )
          })
        case '上传错误':
          return message.info({
            content: ' ',
            key: key || 'msg05',
            duration,
            style,
            className: 'uploadError_notice',
            icon: (
              <MessageUploadError
                content={content}
                line2content={line2content}
              />
            )
          })
        case '应用发布':
          return message.info({
            content: ' ',
            key: key || 'msg05',
            duration,
            style,
            icon: (
              <MessageApplication
                content={content}
                line2content={line2content}
              />
            )
          })
        default:
          return 0
      }
    }
  )

  const clearAllMsg = useMemoizedFn(() => {
    message.destroy()
  })

  return [showMsg, clearAllMsg]
}
