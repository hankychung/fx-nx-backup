import React from 'react'
import styles from './index.module.scss'
import flyeleLogo from '../../../assets/flyeleLogo.png'
import bigLogo from '../../../assets/bigLogo.png'
import { PhoneLogin } from '@flyele-nx/ui'
import { useNavigate } from 'react-router-dom'
import { routePath } from '../../routes'

export const LoginPage = () => {
  const navigate = useNavigate()

  const onGetVerifyCode = (phone: string) => {
    return new Promise<string>((resolve, reject) => {
      try {
        resolve(phone)
      } catch (e) {
        reject('')
      }
    })
  }

  const onLogin = () => {
    localStorage.setItem('token', '123456789')
    navigate(routePath.order)
  }

  return (
    <div className={styles.LoginPageRoot}>
      <div className={styles.pageTop}>
        <div className={styles.topLeft}>
          <div className={styles.logoBox}>
            <img src={flyeleLogo} alt="logo" />
          </div>
          <div className={styles.text}>飞项会员管理平台</div>
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.contentLeft}>
          <div className={styles.bigLogo}>
            <img src={bigLogo} alt="bigLogo" />
          </div>
          <div className={styles.textBox}>
            <div className={styles.title}>把每件事都干得漂漂亮亮</div>
            <div className={styles.desc}>
              <span>事项派发</span>
              <span className={styles.descDiv}>/</span>
              <span>日程协作</span>
              <span className={styles.descDiv}>/</span>
              <span>项目管理</span>
              <span className={styles.descDiv}>/</span>
              <span>知识沉淀</span>
            </div>
          </div>
        </div>
        <div className={styles.contentRight}>
          <PhoneLogin getVerifyCode={onGetVerifyCode} onLogin={onLogin} />
        </div>
      </div>

      <div className={styles.footer}>
        Copyright © 2022-2022 Flyele. All Rights Reserved.
      </div>
    </div>
  )
}
