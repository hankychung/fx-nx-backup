import { ILang } from '@flyele-nx/i18n'
import { IZustandGlobalInfo } from '@flyele-nx/types'
import { create } from 'zustand'

const useGlobalInfoStore = create<IZustandGlobalInfo>(() => ({
  lang: (localStorage.getItem('lang') as ILang) || 'zh-CN'
}))

export { useGlobalInfoStore }
