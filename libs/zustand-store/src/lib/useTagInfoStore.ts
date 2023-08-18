import { create } from 'zustand'
import { TagModel } from '@flyele-nx/types'

export interface ITagInfoState {
  tagsList: TagModel[]
}

const initTagsState = {
  tagsList: []
}

const useTagInfoStore = create<ITagInfoState>(() => {
  return {
    ...initTagsState
  }
})

export { useTagInfoStore }
