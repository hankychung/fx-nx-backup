import { useLocation, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { RoutePath } from '../routes/const'
import { LocalStore } from '@flyele-nx/utils'
import { SocketHandler } from '@flyele-nx/ws'
import { checkValidRoute } from '../utils/checkValidRoute'
import { restoreLocalInfo } from '../utils/restoreLocalInfo'
import { useLogout } from './useLogout'

export const useRedirect = () => {
  const { pathname } = useLocation()

  const { handleLogout } = useLogout()

  const navigate = useNavigate()

  useEffect(() => {
    restoreLocalInfo()

    SocketHandler.initSocket({
      goaway: handleLogout
    })

    navigate(
      LocalStore.getToken()
        ? checkValidRoute(pathname as RoutePath)
          ? pathname
          : RoutePath.dayView
        : RoutePath.login
    )
  }, [pathname, navigate, handleLogout])
}
