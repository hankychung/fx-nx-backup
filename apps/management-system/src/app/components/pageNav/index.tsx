import React from 'react'
import styles from './index.module.scss'
import flyeleLogo from '../../../assets/flyeleLogo.png'
import { Button } from 'antd'

const _PageNav = ({ loginOut }: { loginOut: () => void }) => {
  return (
    <div className={styles.pageNavRoot}>
      <div className={styles.navLeft}>
        <div className={styles.logoBox}>
          <img src={flyeleLogo} alt="logo" />
        </div>
        <div className={styles.text}>飞项会员管理平台</div>
      </div>
      <div className={styles.navCenter}>111</div>
      <div className={styles.navRight}>
        <div className={styles.userName}>周杰伦</div>
        <Button type="text" onClick={loginOut}>
          退出
        </Button>
      </div>
    </div>
  )
}

export const PageNav = React.memo(_PageNav)
