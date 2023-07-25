import { create } from 'zustand'
import { IContactDict, IInteractsData } from './types'

export interface IContactState {
  contactDict: IContactDict
  interacts: IInteractsData[]
}

interface IMutation {
  updateContactDict: (data: IContactDict) => void
  updateInteracts: (data: IInteractsData[]) => void
}

const initContact: IContactState = {
  /**
   *  所有联系人字典(含企业微信)
   */
  contactDict: {},

  /**
   * 我的协作人
   */
  interacts: []
}

const useContactStore = create<IContactState & IMutation>((set) => {
  return {
    ...initContact,

    updateContactDict(data) {
      set(() => ({
        contactDict: data
      }))
    },

    updateInteracts(data) {
      set(() => ({
        interacts: data
      }))
    }
  }
})

export { useContactStore, initContact }
