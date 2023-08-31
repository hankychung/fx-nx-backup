import React from 'react'
import styles from './index.module.scss'
import { FlyRadio, FlyIconSize } from '@flyele/flyele-components'

interface IProps {
  title: string
  checked?: boolean
  onClick?: () => void
}

const _RemindItem = ({ title, checked, onClick }: IProps) => {
  return (
    <div className={styles.remindItem} onClick={onClick}>
      <div className={styles.title}>{title}</div>
      <FlyRadio size={FlyIconSize.normal} type={checked ? 'check' : 'normal'} />
    </div>
  )
}

export const RemindItem = React.memo(_RemindItem)
