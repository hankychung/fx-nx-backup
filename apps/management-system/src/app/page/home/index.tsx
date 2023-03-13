import React, { useEffect } from 'react'
import { useNavigate, Outlet } from 'react-router-dom'
import { routePath } from '../../routes'

export const HomePage = () => {
  const navigate = useNavigate()

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate(routePath.login)
    }
  }, [navigate])

  return (
    <div>
      <div>Home</div>
      <Outlet />
    </div>
  )
}
