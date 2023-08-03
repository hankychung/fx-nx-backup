import { produce } from 'immer'
import { IAuthBase, IContactDict, IVip } from '@flyele-nx/types'
import {
  IContactState,
  useContactStore,
  useUserInfoStore,
  useHolidayStore
} from '@flyele-nx/zustand-store'
import { IUserInfoState } from '@flyele-nx/types'
import { IHoliday, IUserInfo, IInteract } from '@flyele-nx/types'
import { LocalStore } from '@flyele-nx/utils'

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

  static updateHolidayStore(data: IHoliday[]) {
    const updateData = useHolidayStore.getState().updateData
    updateData(data)
  }
}

export { GlobalInfoHandler }
