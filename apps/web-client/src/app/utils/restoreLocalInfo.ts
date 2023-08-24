import { GlobalInfoHandler, useUserInfoStore } from '@flyele-nx/service-module'
import { LocalStore } from '@flyele-nx/utils'

const restoreLocalInfo = () => {
  const userId = useUserInfoStore.getState().userInfo.user_id

  if (!userId) {
    const localUserInfo = LocalStore.getUserInfo()
    const localVip = LocalStore.getUserVip()
    const localVipPower = LocalStore.getUserVipPower()
    const localEnterpriseInfo = LocalStore.getUserEnterpriseInfo()
    const localEnterpriseTakers = LocalStore.getUserEnterpriseTakers()
    const localSetting = LocalStore.getUserSetting()
    const loaclTags = LocalStore.getUserTags()

    localUserInfo && GlobalInfoHandler.updateUserInfo(localUserInfo)
    localVip && GlobalInfoHandler.updateUserVip(localVip)
    localVipPower && GlobalInfoHandler.updateUserVipPower(localVipPower)
    localEnterpriseInfo &&
      GlobalInfoHandler.updateUserEnterpriseInfo(localEnterpriseInfo)
    localEnterpriseTakers &&
      GlobalInfoHandler.updateUserEnterpriseTakers(localEnterpriseTakers)
    localSetting && GlobalInfoHandler.updateUserSetting(localSetting)
    loaclTags && GlobalInfoHandler.updateTagsList(loaclTags)
  }
}

export { restoreLocalInfo }
