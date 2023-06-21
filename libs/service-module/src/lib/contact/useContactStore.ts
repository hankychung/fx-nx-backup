import { create } from 'zustand'
import { IContactDict, IInteractsData } from './types'

export interface IState {
  contactDict: IContactDict
  interacts: IInteractsData[]
  isEnterprise: boolean
}

interface IMutation {
  updateContactDict: (data: IContactDict) => void
  updateInteracts: (data: IInteractsData[]) => void
  updateIsEnterprise: (data: boolean) => void
}

const useContactStore = create<IState & IMutation>((set) => {
  return {
    /**
     *  所有联系人字典(含企业微信)
     */
    contactDict: {},

    /**
     * 我的协作人
     */
    interacts: [],

    /**
     * 是否企业版用户
     */
    isEnterprise: false,

    updateContactDict(data) {
      set(() => ({
        contactDict: data
      }))
    },

    updateInteracts(data) {
      set(() => ({
        interacts: data
      }))
    },

    updateIsEnterprise(data) {
      set(() => ({
        isEnterprise: data
      }))
    }
  }
})

export { useContactStore }
