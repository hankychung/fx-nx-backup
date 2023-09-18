import { useGlobalInfoStore } from '@flyele-nx/zustand-store'

class GlobalInfoHandler {
  langIsCn() {
    return useGlobalInfoStore.getState().lang === 'zh-CN'
  }
}

export const globalInfoHandler = new GlobalInfoHandler()
