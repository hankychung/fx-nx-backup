import React from 'react'
import styles from './index.module.scss'

export const PhoneLogin = ({ title = '登录' }: { title?: string }) => {
  return (
    <div className={styles.phoneLoginRoot}>
      <div className={styles.title}>{title}</div>
      <div className={styles.from}>input</div>
      <div className={styles.footer}>footer</div>
    </div>
  )
}
