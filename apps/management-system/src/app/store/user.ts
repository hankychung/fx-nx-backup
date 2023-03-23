import { create } from 'zustand'
import { OrderSystemType } from '@flyele-nx/service'

interface IUserState {
  userInfo: OrderSystemType.IUser
  updateUserInfo: (info: OrderSystemType.IUser) => void
  reset: () => void
}

const initUserInfo: OrderSystemType.IUser = {
  id: '',
  nick_name: '', // 昵称
  telephone: '' // 手机号
}

export const useUserStore = create<IUserState>((set) => ({
  userInfo: initUserInfo,
  updateUserInfo: (data) =>
    set((state) => ({
      userInfo: {
        ...data
      }
    })),
  reset: () =>
    set((state) => ({
      userInfo: initUserInfo
    }))
}))
