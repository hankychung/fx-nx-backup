import { produce } from 'immer'
import { IContactDict, IInteractsData } from '../store/types'
import { IContactState, useContactStore } from '../store/useContactStore'
import { IUserInfoState, useUserInfoStore } from '../store/useUserInfoStore'
import { IHoliday, IUserInfo } from '@flyele-nx/service'
import { useHolidayStore } from '../store/useHolidayStore'

class GlobalInfoHandler {
  static updateContactDict(data: IContactDict) {
    useContactStore.setState(
      produce((state: IContactState) => {
        state.contactDict = data
      })
    )
  }

  static updateInteracts(data: IInteractsData[]) {
    useContactStore.setState(
      produce((state: IContactState) => {
        state.interacts = data
      })
    )
  }

  static updateIsEnterprise(data: boolean) {
    useContactStore.setState(
      produce((state: IContactState) => {
        state.isEnterprise = data
      })
    )
  }

  static updateUserInfo(data: Omit<IUserInfo, 'Token'>) {
    useUserInfoStore.setState(
      produce((state: IUserInfoState) => {
        state.userInfo = data
      })
    )
  }

  static updateHolidayStore(data: IHoliday[]) {
    const updateData = useHolidayStore.getState().updateData
    updateData(data)
  }
}

export { GlobalInfoHandler }
