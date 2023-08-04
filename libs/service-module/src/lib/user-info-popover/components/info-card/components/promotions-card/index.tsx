import React, { FC, useCallback } from 'react'
import cs from 'classnames'
// import { Scaffold } from '@/global/scaffold/service'
import styles from './index.module.scss'
import { VipGiftIcon } from '@flyele-nx/icon'

interface Props {
  title?: string
  className?: string
  width?: string
  onCallback?: () => void
}

export const PromotionsCard: FC<Props> = (props) => {
  const { title, width = '100%', className, onCallback } = props

  const handleClick = useCallback(() => {
    // Scaffold.of.vsController.showVipInvite()
    onCallback?.()
  }, [onCallback])

  return (
    <div
      className={cs(styles.container, className)}
      style={{ width }}
      onClick={handleClick}
    >
      <div className={styles.icon}>
        <VipGiftIcon width={22} height={22} />
      </div>
      <span>{title}</span>
    </div>
  )
}
