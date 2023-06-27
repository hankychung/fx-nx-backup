/*
 * @Author: wanghui wanghui@flyele.net
 * @Date: 2023-04-08 16:30:07
 * @LastEditors: wanghui wanghui@flyele.net
 * @LastEditTime: 2023-04-18 11:35:17
 * @FilePath: /electron-client/app/components/MessageExample/MessageApplication.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React from 'react'
import { Close, ApplicationReleaseIcon } from '@flyele-nx/icon'
import { message } from 'antd'
import style from './useMessage.module.scss'

interface IProps {
  content: string
  line2content: string
  fun?: () => void
}

export const MessageApplication: React.FC<IProps> = (props) => {
  const { content, line2content, fun } = props

  return (
    <div className={style.messageApplicationBlock}>
      <div className={style.messageApplication}>
        <ApplicationReleaseIcon />
        <div className={style.messageApplication_right}>
          <div className={style.messageApplication_content}>{content}</div>
          <div className={style.messageApplication_line2content}>
            {line2content}
          </div>
        </div>
      </div>
      {fun && (
        <div className={style.messageApplicationRight}>
          <div
            className={style.goUse}
            onClick={() => {
              message.destroy()
              fun && fun()
            }}
          >
            去使用
          </div>
          <div
            className={style.img}
            onClick={() => {
              message.destroy()
            }}
          >
            <Close width={17} height={17} />
          </div>
        </div>
      )}
    </div>
  )
}
