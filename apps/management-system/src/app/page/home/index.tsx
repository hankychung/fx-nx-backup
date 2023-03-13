import React, { useEffect } from 'react'
import { useNavigate, Outlet, useLocation } from 'react-router-dom'
import { routePath } from '../../routes'
import { PageNav } from '../../components/pageNav'

export const HomePage = () => {
  const navigate = useNavigate()
  const location = useLocation()

  /**
   * 退出登录
   */
  const loginOut = () => {
    localStorage.removeItem('token')
    navigate(routePath.login)
  }

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate(routePath.login)
    } else if (location.pathname === '/') {
      navigate(routePath.order)
    }
  }, [location, navigate])

  return (
    <div>
      <PageNav loginOut={loginOut} />
      <Outlet />
    </div>
  )
}
