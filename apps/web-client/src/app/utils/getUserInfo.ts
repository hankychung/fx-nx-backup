import { useUserInfoStore } from '@flyele-nx/service-module'
import { LocalStore } from '@flyele-nx/utils'

export const getUserInfoSafely = () => {
  const { userInfo } = useUserInfoStore.getState()

  return userInfo.user_id ? userInfo : LocalStore.getUserInfo()
}
