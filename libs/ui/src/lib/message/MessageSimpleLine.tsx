import React from 'react'
import { Spin } from 'antd'
import { SuccessIcon, WarmingIcon, TimeSmallIcon } from '@flyele-nx/icon'
import styles from './useMessage.module.scss'

type Props = {
  content: string
  iconName: string
  loading?: boolean
}

export const MessageSimpleLine = ({ content, iconName, loading }: Props) => {
  const getIconImage = (name: string) => {
    switch (name) {
      case '错误':
        return (
          <div className={styles.img}>
            <WarmingIcon width={17} height={17} />
          </div>
        )
      case '成功':
        return (
          <div className={styles.img}>
            <SuccessIcon width={17} height={17} />
          </div>
        )
      case '时间':
        return (
          <div className={styles.img}>
            <TimeSmallIcon width={17} height={17} />
          </div>
        )
      default:
        return null
    }
  }

  const getStyle = (name: string) => {
    switch (name) {
      case '错误':
        return styles.message__error
      case '成功':
        return styles.message__error
      case '时间':
        return styles.message__error
      case '消息长':
        return styles.message__simpleline_long
      default:
        return styles.message__simpleline
    }
  }

  return (
    <div className={getStyle(iconName)}>
      {loading ? (
        <Spin style={{ width: '50px', minWidth: 0 }} />
      ) : (
        getIconImage(iconName)
      )}
      <div
        style={loading ? { minWidth: 0 } : {}}
        className={styles.message__common__inner__title}
      >
        {content}
      </div>
    </div>
  )
}

export default MessageSimpleLine
