import React from 'react'
import styles from './index.module.scss'
import FlyeleLogo from '../../../assets/flyeleLogo.png'

export const LoginPage = () => {
  return (
    <div className={styles.LoginPageRoot}>
      <div className={styles.pageTop}>
        <div className={styles.topLeft}>
          <div className={styles.logoBox}>
            <img src={FlyeleLogo} alt="logo" />
          </div>
          <div className={styles.text}>飞项会员管理平台</div>
        </div>
      </div>

      <div className={styles.content}>content</div>

      <div className={styles.footer}>
        Copyright © 2022-2022 Flyele. All Rights Reserved.
      </div>
    </div>
  )
}
