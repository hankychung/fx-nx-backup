import React, { useState } from 'react'
import styles from './index.module.scss'
import flyeleLogo from '../../../assets/flyeleLogo.png'
import bigLogo from '../../../assets/bigLogo.png'
import { PhoneLogin, IPhoneLoginData } from '@flyele-nx/ui'
import { OrderSystemApi, service, IErrorResponse } from '@flyele-nx/service'
import { useNavigate } from 'react-router-dom'
import { routePath } from '../../routes'
import { message } from 'antd'
import { AxiosError } from 'axios'
import { useUserStore } from '../../store/user'
import { useMount } from 'ahooks'
import classNames from 'classnames'

type Region = 'zh-CN' | 'en-US'

const regions: { label: string; value: Region }[] = [
  {
    label: '国内订单',
    value: 'zh-CN'
  },
  {
    label: '海外订单',
    value: 'en-US'
  }
]

export const LoginPage = () => {
  const [messageApi, contextHolder] = message.useMessage()
  const userStore = useUserStore()
  const navigate = useNavigate()
  const [region, setRegion] = useState<Region>('zh-CN')

  useMount(() => {
    const lang = localStorage.getItem('ENV_LANG')
    if (lang) {
      setRegion(lang as Region)
      ;(global as any).lang = lang
    }
  })

  const onGetVerifyCode = (phone: string) => {
    return new Promise<boolean>((resolve, reject) => {
      try {
        OrderSystemApi.getPhoneLoginCode({ telephone: phone })
          .then(() => {
            resolve(true)
          })
          .catch((e) => {
            reject(false)
          })
      } catch (e) {
        reject(false)
      }
    })
  }

  const onLogin = async (loginData: IPhoneLoginData) => {
    const { telephone, verify_code } = loginData
    try {
      const { code, data } = await OrderSystemApi.phoneLogin({
        telephone: telephone,
        verify_code: verify_code
      })
      if (code === 0) {
        const { token } = data
        userStore.updateUserInfo({ ...data })
        localStorage.setItem('Authorization', token)
        service.updateToken(token)
        navigate(routePath.order)
      }
    } catch (e) {
      const error = e as AxiosError<IErrorResponse>
      let msg = '登录失败，请稍后重试'
      if (error.response) {
        const {
          data: { code, message }
        } = error.response
        msg = message
        if (code === 40010) {
          msg = '账号不存在'
        }
      }

      messageApi.open({
        type: 'error',
        content: msg
      })
    }
  }

  const handleRegionChange = (lang: Region) => {
    setRegion(lang)
    ;(global as any).lang = lang
    localStorage.setItem('ENV_LANG', lang)
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
          <PhoneLogin
            title={
              <div className={styles.langRadioGroup}>
                {regions.map((item) => (
                  <div
                    key={item.value}
                    className={classNames(
                      styles.langRadio,
                      region === item.value && styles.active
                    )}
                    onClick={() => handleRegionChange(item.value)}
                  >
                    {item.label}
                  </div>
                ))}
              </div>
            }
            getVerifyCode={onGetVerifyCode}
            onLogin={onLogin}
          />
        </div>
      </div>

      <div className={styles.footer}>
        Copyright © 2022-2022 Flyele. All Rights Reserved.
      </div>

      {contextHolder}
    </div>
  )
}
