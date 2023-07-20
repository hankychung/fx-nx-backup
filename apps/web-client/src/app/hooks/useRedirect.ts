import { useLocation, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { RoutePath } from '../routes/const'
import { TokenHandler } from '@flyele-nx/utils'

const validRoutes = Object.values(RoutePath) as string[]

export const useRedirect = () => {
  const { pathname } = useLocation()

  const navigate = useNavigate()

  useEffect(() => {
    navigate(
      TokenHandler.get()
        ? validRoutes.includes(pathname)
          ? pathname
          : RoutePath.board
        : RoutePath.login
    )
  }, [pathname, navigate])
}
