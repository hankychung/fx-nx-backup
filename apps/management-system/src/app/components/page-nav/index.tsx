import React, { useEffect, useMemo, useState } from 'react'
import styles from './index.module.scss'
import flyeleLogo from '../../../assets/flyeleLogo.png'
import { Button } from 'antd'
import { FlyTabs, IFlyTabs } from '@flyele/flyele-components'
import { routePath } from '../../routes'
import { useNavigate } from 'react-router-dom'
import { useUserStore } from '../../store/user'
import { useInvoiceStore } from '../../store/invoice'

const _PageNav = ({
  defaultTab,
  loginOut,
  onChange
}: {
  defaultTab: string
  loginOut: () => void
  onChange?: (key: string) => void
}) => {
  const userStore = useUserStore()
  const invoiceStore = useInvoiceStore()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('')

  const onChangeTab = (key: string) => {
    setActiveTab(key)
    let path = ''
    switch (key) {
      case 'order':
        path = routePath.order
        break
      case 'invoice':
        path = routePath.invoice
        break
      default:
        console.log('没有找到匹配的路由')
        break
    }
    navigate(path)
    onChange && onChange(key)
  }

  const tabs: IFlyTabs[] = useMemo(() => {
    return [
      {
        key: 'order',
        title: '订单管理'
      },
      {
        key: 'invoice',
        title: `发票管理${
          invoiceStore.notOpenTotal === -1
            ? ''
            : ` ${invoiceStore.notOpenTotal}`
        }`
      }
    ]
  }, [invoiceStore.notOpenTotal])

  useEffect(() => {
    if (defaultTab && defaultTab !== activeTab) {
      setActiveTab(defaultTab)
    }
  }, [activeTab, defaultTab])

  return (
    <div className={styles.pageNavRoot}>
      <div className={styles.navLeft}>
        <div className={styles.logoBox}>
          <img src={flyeleLogo} alt="logo" />
        </div>
        <div className={styles.text}>飞项会员管理平台</div>
      </div>
      <div className={styles.navCenter}>
        <FlyTabs
          tabs={tabs}
          active={activeTab}
          gap={60}
          itemClass={styles.tabBoldItem}
          onChange={onChangeTab}
        />
      </div>
      <div className={styles.navRight}>
        <div className={styles.userName}>{userStore.userInfo.nick_name}</div>
        <Button type="text" onClick={loginOut}>
          退出
        </Button>
      </div>
    </div>
  )
}

export const PageNav = React.memo(_PageNav)
