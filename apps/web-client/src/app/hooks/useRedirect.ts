import { useLocation, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { RoutePath } from '../routes/const'
import { LocalStore } from '@flyele-nx/utils'
import { SocketHandler } from '@flyele-nx/ws'
import { checkValidRoute } from '../utils/checkValidRoute'

export const useRedirect = () => {
  const { pathname } = useLocation()

  const navigate = useNavigate()

  useEffect(() => {
    SocketHandler.initSocket()

    navigate(
      LocalStore.getToken()
        ? checkValidRoute(pathname as RoutePath)
          ? pathname
          : RoutePath.dayView
        : RoutePath.login
    )
  }, [pathname, navigate])
}
