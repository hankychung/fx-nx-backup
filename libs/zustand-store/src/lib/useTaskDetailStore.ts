import { create } from 'zustand'
import { IZustandDetail } from '@flyele-nx/types'

const useTaskDetailStore = create<IZustandDetail>(() => {
  return {
    cacheIds: [],
    detailDict: {},
    commentDict: {}
  }
})

export { useTaskDetailStore }
