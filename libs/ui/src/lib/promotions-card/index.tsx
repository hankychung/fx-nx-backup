import React, { FC, useCallback } from 'react'
import classNames from 'classnames'
import css from './index.module.scss'
import { VipGiftIcon } from '@flyele-nx/icon'

interface Props {
  title?: string
  className?: string
  onCallback?: () => void
  onClick?: () => void
  style?: React.CSSProperties
  width?: string
}

export const PromotionsCard: FC<React.PropsWithChildren<Props>> = (props) => {
  const { title, width = '100%', className, onCallback, onClick, style } = props

  const handleClick = useCallback(() => {
    onClick?.()
    onCallback?.()
  }, [onCallback, onClick])

  return (
    <div
      className={classNames(css.container, className)}
      style={{ ...style, width }}
      onClick={handleClick}
    >
      <VipGiftIcon className={css.icon} />
      <span>{title}</span>
    </div>
  )
}
