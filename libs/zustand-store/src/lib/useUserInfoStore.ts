import { create } from 'zustand'
import { IUserInfoState } from '@flyele-nx/types'

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
  vip: {
    level: 0,
    deadline: 0
  },
  vipPower: undefined,
  /**
   * 是否企业版用户
   */
  isEnterprise: false
}

const useUserInfoStore = create<IUserInfoState>(() => {
  return {
    ...initUserInfo
  }
})

export { useUserInfoStore, initUserInfo }
