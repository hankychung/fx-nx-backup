import { ILang, IZustandGlobalInfo } from '@flyele-nx/types'
import { useGlobalInfoStore } from '@flyele-nx/zustand-store'
import { produce } from 'immer'

class GlobalInfoHandler {
  setLang(lang: ILang) {
    useGlobalInfoStore.setState(
      produce((state: IZustandGlobalInfo) => {
        state.lang = lang
      })
    )
  }
}

export const globalInfoHandler = new GlobalInfoHandler()
