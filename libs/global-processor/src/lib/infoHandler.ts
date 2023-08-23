import { produce } from 'immer'
import {
  IAuthBase,
  IContactDict,
  IOfficialCorpDetail,
  IUserEnterpriseTakers,
  IVip,
  IUserSetting,
  TagModel
} from '@flyele-nx/types'
import {
  IContactState,
  useContactStore,
  useUserInfoStore,
  useHolidayStore
} from '@flyele-nx/zustand-store'
import { IUserInfoState } from '@flyele-nx/types'
import { IHoliday, IUserInfo, IInteract } from '@flyele-nx/types'
import { LocalStore } from '@flyele-nx/utils'
import { TagsHandler } from '@flyele-nx/zustand-handler'

class GlobalInfoHandler {
  static updateContactDict(data: IContactDict) {
    useContactStore.setState(
      produce((state: IContactState) => {
        state.contactDict = data
      })
    )
  }

  static updateInteracts(data: IInteract[]) {
    useContactStore.setState(
      produce((state: IContactState) => {
        state.interacts = data
      })
    )
  }

  static updateUserInfo(data: IUserInfo) {
    useUserInfoStore.setState(
      produce((state: IUserInfoState) => {
        state.userInfo = data
        state.isEnterprise = !!data.corpid

        LocalStore.setUserInfo(data)
      })
    )
  }

  static updateUserVip(data: IVip) {
    useUserInfoStore.setState(
      produce((state: IUserInfoState) => {
        state.vip = data

        LocalStore.setUserVip(data)
      })
    )
  }

  static updateUserVipPower(data: IAuthBase) {
    useUserInfoStore.setState(
      produce((state: IUserInfoState) => {
        state.vipPower = data

        LocalStore.setUserVipPower(data)
      })
    )
  }

  static updateUserSetting(data: IUserSetting) {
    useUserInfoStore.setState(
      produce((state: IUserInfoState) => {
        state.setting = data

        LocalStore.setUserSetting(data)
      })
    )
  }

  static updateUserEnterpriseInfo(data: IOfficialCorpDetail) {
    useUserInfoStore.setState(
      produce((state: IUserInfoState) => {
        state.enterprise = data

        LocalStore.setUserEnterpriseInfo(data)
      })
    )
  }

  static updateUserEnterpriseTakers(data: IUserEnterpriseTakers[]) {
    useUserInfoStore.setState(
      produce((state: IUserInfoState) => {
        state.enterpriseTakers = data

        LocalStore.setUserEnterpriseTakers(data)
      })
    )
  }

  static updateHolidayStore(data: IHoliday[]) {
    const updateData = useHolidayStore.getState().updateData
    updateData(data)
  }

  static updateTagsList(data: TagModel[]) {
    TagsHandler.updateTagsList(data)
    LocalStore.setUserTags(data)
  }
}

export { GlobalInfoHandler }
