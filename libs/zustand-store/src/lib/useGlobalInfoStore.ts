import { IZustandGlobalInfo } from '@flyele-nx/types'
import { create } from 'zustand'

const useGlobalInfoStore = create<IZustandGlobalInfo>(() => ({
  lang: 'zh-CN'
}))

export { useGlobalInfoStore }
