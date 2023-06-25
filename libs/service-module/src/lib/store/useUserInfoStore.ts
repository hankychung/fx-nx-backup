import { create } from 'zustand'
import { IUserInfo } from '@flyele-nx/service'
import { produce } from 'immer'

export interface IUserInfoState {
  userInfo: Omit<IUserInfo, 'Token'>
}

interface IMutation {
  updateUserInfo: (data: Omit<IUserInfo, 'Token'>) => void
}

const useUserInfoStore = create<IUserInfoState & IMutation>((set) => {
  return {
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

    updateUserInfo(data) {
      produce((state: IUserInfoState) => {
        state.userInfo = data
      })
    }
  }
})

export { useUserInfoStore }
