import React from 'react'
import { FinishBigIcon, ReopenBigIcon } from '@flyele-nx/icon'
import styles from './useMessage.module.scss'

type Props = {
  content: string
  line2content: string | undefined
  iconName: string
}

export const MessageWithIcon = ({
  content,
  line2content = undefined,
  iconName
}: Props) => {
  const getIconImage = (name: string) => {
    switch (name) {
      case '撒花':
        return (
          <div className={styles.img} style={{ width: 28, height: 29 }}>
            <FinishBigIcon width={28} height={29} />
          </div>
        )
      case '日历':
        return (
          <div className={styles.img} style={{ width: 28, height: 29 }}>
            <ReopenBigIcon width={28} height={29} />
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className={styles.message__common__inner}>
      {getIconImage(iconName)}

      <div>
        <div className={styles.message__common__inner__title}>{content}</div>

        {line2content && (
          <>
            <br />
            <div
              className={styles.message__common__inner__desc}
              style={{ fontSize: 13 }}
            >
              {line2content}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default MessageWithIcon
