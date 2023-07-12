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

export type Msg = {
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

export const useMessage = (): [
  (v: Msg) => void,
  () => void,
  React.ReactElement<any, string | React.JSXElementConstructor<any>>
] => {
  message.config({ top: 24 })

  const [messageApi, contextHolder] = message.useMessage()

  // 显示消息框
  const showMsg = useMemoizedFn(
    ({
      msgType = '消息',
      content = '',
      line2content = '',
      duration = 2,
      key, // 控制同步的key
      style = undefined // 额外的样式
    }: Msg) => {
      message.destroy()

      switch (msgType) {
        case '消息':
          return messageApi.open({
            content: ' ',
            key,
            style,
            icon: <MessageSimpleLine content={content} iconName={msgType} />,
            duration
          })
        case '消息长':
          return messageApi.open({
            content: ' ',
            key,
            style,
            icon: <MessageSimpleLine content={content} iconName={msgType} />,
            duration
          })
        case '成功':
          return messageApi.open({
            content: ' ',
            key,
            style,
            icon: <MessageSimpleLine content={content} iconName={msgType} />,
            duration
          })
        case '时间':
          return messageApi.open({
            content: ' ',
            key,
            style,
            icon: <MessageSimpleLine content={content} iconName={msgType} />,
            duration
          })
        case '错误':
          return messageApi.open({
            content: ' ',
            key,
            style,
            icon: <MessageSimpleLine content={content} iconName={msgType} />,
            duration
          })
        case '日历':
          return messageApi.open({
            content: ' ',
            key,
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
          return messageApi.open({
            content: ' ',
            key,
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
          return messageApi.open({
            content: ' ',
            key,
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
          return messageApi.open({
            content: ' ',
            key,
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
    messageApi.destroy()
  })

  return [showMsg, clearAllMsg, contextHolder]
}
