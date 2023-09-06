import { useEffect } from 'react'
import { restoreLocalInfo } from '../utils/restoreLocalInfo'
import { SocketHandler } from '@flyele-nx/ws'
import { setLang } from '@flyele-nx/i18n'

export const useInitApp = () => {
  useEffect(() => {
    setLang('en-US')

    restoreLocalInfo()

    SocketHandler.initSocket()
  }, [])
}
