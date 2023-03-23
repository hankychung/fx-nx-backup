import React, { useEffect, useState } from 'react'
import { useNavigate, Outlet, useLocation } from 'react-router-dom'
import { routePath } from '../../routes'
import { PageNav } from '../../components/pageNav'
import { useUserStore } from '../../store/user'
import { service } from '@flyele-nx/service'

export const HomePage = () => {
  const [defaultTab, setDefaultTab] = useState('')
  const navigate = useNavigate()
  const location = useLocation()
  const userStore = useUserStore()

  /**
   * 退出登录
   */
  const loginOut = () => {
    localStorage.removeItem('Authorization')
    userStore.reset()
    navigate(routePath.login)
  }

  useEffect(() => {
    service.tokenInvalid = () => {
      loginOut()
    }

    const localToken = localStorage.getItem('Authorization')
    if (!localToken) {
      navigate(routePath.login)
    } else {
      if (service.getToken() === '') {
        service.updateToken(localToken)
      }
      if (location.pathname === '/') {
        navigate(routePath.order)
      }
    }

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
  }, [location, navigate])

  return (
    <div>
      <PageNav defaultTab={defaultTab} loginOut={loginOut} />
      <Outlet />
    </div>
  )
}
