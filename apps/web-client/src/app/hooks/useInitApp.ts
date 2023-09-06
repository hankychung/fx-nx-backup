import { useEffect } from 'react'
import { restoreLocalInfo } from '../utils/restoreLocalInfo'
import { SocketHandler } from '@flyele-nx/ws'

export const useInitApp = () => {
  useEffect(() => {
    restoreLocalInfo()

    SocketHandler.initSocket()
  }, [])
}
