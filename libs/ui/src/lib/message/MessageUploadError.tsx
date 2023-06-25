import React from 'react'
import { WarmingRedIcon } from '@flyele-nx/icon'
import style from './useMessage.module.scss'

interface IProps {
  content: string
  line2content: string
}

export const MessageUploadError: React.FC<IProps> = (props) => {
  const { content, line2content } = props

  return (
    <div className={style.uploadError}>
      <div className={style.img}>
        <WarmingRedIcon width={32} height={32} />
      </div>
      <div>
        <div className={style.uploadError_content}>{content}</div>
        <div className={style.uploadError_line2content}>{line2content}</div>
      </div>
    </div>
  )
}
