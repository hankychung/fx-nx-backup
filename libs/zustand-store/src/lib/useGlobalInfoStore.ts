import { ILang } from '@flyele-nx/i18n'
import { IZustandGlobalInfo } from '@flyele-nx/types'
import { create } from 'zustand'

const useGlobalInfoStore = create<IZustandGlobalInfo>(() => ({
  lang: ((global as any).lang as ILang) || 'zh-CN'
}))

export { useGlobalInfoStore }
