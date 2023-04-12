import React, { useState } from 'react'
import {
  useNavigate,
  Outlet,
  useLocation,
  useOutletContext
} from 'react-router-dom'
import { routePath } from '../../routes'
import { PageNav } from '../../components/page-nav'
import { useUserStore } from '../../store/user'
import { OrderSystemApi, service } from '@flyele-nx/service'
import { useMemoizedFn, useMount } from 'ahooks'
import { useInvoiceStore } from '../../store/invoice'
import { PageContainer } from '../../components/page-container'

type ContextType = {
  searchType: string
  setSearchType: React.Dispatch<React.SetStateAction<string>>
}

export const HomePage = () => {
  const [defaultTab, setDefaultTab] = useState('')
  const [searchType, setSearchType] = useState('')
  const navigate = useNavigate()
  const location = useLocation()
  const userStore = useUserStore()
  const invoiceStore = useInvoiceStore()

  /**
   * 根据路由切换tab
   */
  const changeTabOnUrl = () => {
    if (location.pathname) {
      switch (location.pathname) {
        case routePath.order:
          setDefaultTab('order')
          break
        case routePath.invoice:
          setDefaultTab('invoice')
          break
        default:
          break
      }
    }
  }

  /**
   * 点击左侧Item
   */
  const onClickItem = useMemoizedFn((type: string) => {
    if (type) {
      if (location.pathname === routePath.invoice) {
        navigate(routePath.order)
        setDefaultTab('order')
      }
      setSearchType(type)
    }
  })

  /**
   * 返回登录页
   */
  const goBackLogin = () => {
    localStorage.removeItem('Authorization')
    userStore.reset()
    navigate(routePath.login)
  }

  /**
   * 退出登录
   */
  const loginOut = useMemoizedFn(async () => {
    try {
      await OrderSystemApi.logout()
    } finally {
      goBackLogin()
    }
  })

  /**
   * 请求用户信息
   */
  const fetchAdminInfo = async () => {
    try {
      const { data } = await OrderSystemApi.getAdminInfo()
      if (data) {
        userStore.updateUserInfo({ ...data })
      }
    } catch (e) {
      console.log('请求用户信息失败')
    }
  }

  /**
   * 刷新重新进入页面前
   * 1、 token 存在 zustand 会被清空，所以需要从 localStorage 拿
   * 2、 localStorage 没有token 需要重定向到 登录页
   * 3、 用户信息会被清空，所以需要重新请求
   * 4、 定位一下 到 订单页面
   */
  const beforeRefreshPage = async () => {
    const localToken = localStorage.getItem('Authorization')
    if (!localToken) {
      goBackLogin()
    } else {
      if (service.getToken() === '') {
        service.updateToken(localToken)
      }
      if (!userStore.userInfo.nick_name) {
        await fetchAdminInfo()
      }
      if (invoiceStore.notOpenTotal === -1) {
        invoiceStore.fetch()
      }
      if (location.pathname === '/') {
        navigate(routePath.order)
      }
    }
  }

  useMount(async () => {
    service.tokenInvalid = () => {
      goBackLogin()
    }

    await beforeRefreshPage()

    changeTabOnUrl()
  })

  return (
    <div>
      <PageNav
        defaultTab={defaultTab}
        loginOut={loginOut}
        onChange={(key) => setDefaultTab(key)}
      />
      <PageContainer onClickItem={onClickItem}>
        <Outlet context={{ searchType, setSearchType }} />
      </PageContainer>
    </div>
  )
}

export function useSearchListType() {
  return useOutletContext<ContextType>()
}
