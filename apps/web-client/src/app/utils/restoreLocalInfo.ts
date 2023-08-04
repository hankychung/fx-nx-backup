import { GlobalInfoHandler, useUserInfoStore } from '@flyele-nx/service-module'
import { LocalStore } from '@flyele-nx/utils'

const restoreLocalInfo = () => {
  const userId = useUserInfoStore.getState().userInfo.user_id

  if (!userId) {
    const localUserInfo = LocalStore.getUserInfo()
    const localVip = LocalStore.getUserVip()
    const localVipPower = LocalStore.getUserVipPower()
    const localSetting = LocalStore.getUserSetting()

    localUserInfo && GlobalInfoHandler.updateUserInfo(localUserInfo)
    localVip && GlobalInfoHandler.updateUserVip(localVip)
    localVipPower && GlobalInfoHandler.updateUserVipPower(localVipPower)
    localSetting && GlobalInfoHandler.updateUserSetting(localSetting)
  }
}

export { restoreLocalInfo }
