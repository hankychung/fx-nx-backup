import { LocalStore, emitter } from '@flyele-nx/utils'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { RoutePath } from '../routes/const'
import { useSocket } from './useSocket'

export const useGlobalSub = () => {
  const navigate = useNavigate()

  useSocket()

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
