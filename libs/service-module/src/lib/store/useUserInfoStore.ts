import { create } from 'zustand'
import { IUserInfo } from '@flyele-nx/service'
import { produce } from 'immer'

export interface IUserInfoState {
  userInfo: Omit<IUserInfo, 'Token'>
  isEnterprise: boolean
}

interface IMutation {
  updateUserInfo: (data: Omit<IUserInfo, 'Token'>) => void
}

const initUserInfo = {
  userInfo: {
    nick_name: '',
    avatar: '',
    telephone: '',
    original_name: '',
    user_id: '',
    env: 'normal', // 全局域名环境地址 normal表示使用当前默认
    pinyin: '',
    create_at: 0
  },

  /**
   * 是否企业版用户
   */
  isEnterprise: false
}

const useUserInfoStore = create<IUserInfoState & IMutation>((set) => {
  return {
    ...initUserInfo,

    updateUserInfo(data) {
      produce((state: IUserInfoState) => {
        state.userInfo = data
        state.isEnterprise = !!data.corpid
      })
    }
  }
})

export { useUserInfoStore, initUserInfo }
