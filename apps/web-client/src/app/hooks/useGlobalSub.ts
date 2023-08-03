import { LocalStore, emitter } from '@flyele-nx/utils'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { RoutePath } from '../routes/const'

export const useGlobalSub = () => {
  const navigate = useNavigate()

  useEffect(() => {
    emitter.on('logout', () => {
      LocalStore.clear()

      navigate(RoutePath.login)
    })

    return () => {
      emitter.off('logout')
    }
  }, [navigate])
}
