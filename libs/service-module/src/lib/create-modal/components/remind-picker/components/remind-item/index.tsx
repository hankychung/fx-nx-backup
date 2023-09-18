import React from 'react'
import styles from './index.module.scss'
import { FlyRadio, FlyIconSize } from '@flyele/flyele-components'

interface IProps {
  title: string
  checked?: boolean
  onClick?: () => void
  renderRightIcon?: () => React.ReactNode
}

const _RemindItem = ({ title, checked, onClick, renderRightIcon }: IProps) => {
  return (
    <div className={styles.remindItem} onClick={onClick}>
      <div className={styles.title}>{title}</div>
      {renderRightIcon ? (
        renderRightIcon()
      ) : (
        <FlyRadio
          size={FlyIconSize.normal}
          type={checked ? 'check' : 'normal'}
        />
      )}
    </div>
  )
}

export const RemindItem = React.memo(_RemindItem)
