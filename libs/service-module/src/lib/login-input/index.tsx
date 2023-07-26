import React, { useMemo, useState } from 'react'
import cs from 'classnames'
import style from './index.module.scss'
import { Tabs } from 'antd'
import type { TabsProps } from 'antd'
import { IUserInfo } from '@flyele-nx/service'
import QrCodeLogin from '../qrcode-login'
import { PhoneNumberLogin } from './components/phone-number-login'

interface Props {
  usePhoneNumLogin?: boolean
  onLoginSuccess?: (data?: IUserInfo) => void
}

const tabsImgArr = [
  { key: '1', src: 'https://cdn.flyele.net/resources/PC/pc-computer.png' },
  { key: '2', src: 'https://cdn.flyele.net/resources/PC/pc-qrcode.png' }
]

const _LoginInput: React.FC<React.PropsWithChildren<Props>> = ({
  usePhoneNumLogin = false,
  onLoginSuccess
}) => {
  const [active, setActive] = useState('1')

  const renderNav = () => {
    return (
      <div className={style.nav_wrap}>
        {tabsImgArr.map((item) => {
          return (
            <div
              key={item.key}
              className={cs(style.nav_item, {
                [style.hide]: item.key !== active
              })}
              onClick={() => {
                if (usePhoneNumLogin) {
                  // TODO 这里有点傻 没做通用的二选一，现在就固定 1 2 2 1 的选择
                  const activeKey = item.key === '1' ? '2' : '1'
                  setActive(activeKey)
                }
              }}
            >
              {usePhoneNumLogin && <img alt="" src={item.src} />}
            </div>
          )
        })}
      </div>
    )
  }

  const onChangeTab = (key: string) => {
    setActive(key)
  }

  const tabItem: TabsProps['items'] = useMemo(() => {
    return [
      {
        key: '1',
        label: '二维码登录',
        children: (
          <div className={style.qrcodeBox}>
            <div className={style.logo}>
              <img
                src="https://cdn.flyele.net/resources/PC/logo.png"
                alt="logo"
              />
            </div>
            <QrCodeLogin
              deviceParams={{
                client_version: '0.0.1',
                os: 'html5',
                platform: 'web',
                device_name: 'browser'
              }}
              onSuccess={onLoginSuccess}
            />
          </div>
        )
      },
      {
        key: '2',
        label: '手机号登录',
        children: (
          <PhoneNumberLogin
            deviceParams={{
              client_version: '0.0.1',
              os: 'html5',
              platform: 'web',
              device_name: 'browser'
            }}
            onSuccess={onLoginSuccess}
          />
        )
      }
    ]
  }, [onLoginSuccess])

  return (
    <div className={style.right_wrap}>
      <div className={style.right_wrap__container}>
        <Tabs
          activeKey={active}
          items={tabItem}
          renderTabBar={renderNav}
          onChange={onChangeTab}
          destroyInactiveTabPane={true}
        />
      </div>
    </div>
  )
}

export const LoginInput = React.memo(_LoginInput)
