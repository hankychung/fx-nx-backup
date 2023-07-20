import { useLocation, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { RoutePath } from '../routes/const'
import { getToken } from '../utils'

export const useAppDirect = () => {
  const location = useLocation()

  const navigate = useNavigate()

  useEffect(() => {
    navigate(getToken() ? location.pathname : RoutePath.login)
  }, [location, navigate])
}
