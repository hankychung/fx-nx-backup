import { GlobalInfoHandler, useUserInfoStore } from '@flyele-nx/service-module'
import { LocalStore } from '@flyele-nx/utils'

const restoreLocalInfo = () => {
  const userId = useUserInfoStore.getState().userInfo.user_id

  if (!userId) {
    const localUserInfo = LocalStore.getUserInfo()

    localUserInfo && GlobalInfoHandler.updateUserInfo(localUserInfo)
  }
}

export { restoreLocalInfo }
