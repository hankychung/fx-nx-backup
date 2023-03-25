import React, { useState } from 'react'
import { useNavigate, Outlet, useLocation } from 'react-router-dom'
import { routePath } from '../../routes'
import { PageNav } from '../../components/pageNav'
import { useUserStore } from '../../store/user'
import { OrderSystemApi, service } from '@flyele-nx/service'
import { useMemoizedFn, useMount } from 'ahooks'
import { useInvoiceStore } from '../../store/invoice'

export const HomePage = () => {
  const [defaultTab, setDefaultTab] = useState('')
  const navigate = useNavigate()
  const location = useLocation()
  const userStore = useUserStore()
  const invoiceStore = useInvoiceStore()

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
  })

  return (
    <div>
      <PageNav defaultTab={defaultTab} loginOut={loginOut} />
      <Outlet />
    </div>
  )
}
