import { produce } from 'immer'
import { IContactDict } from '../store/types'
import { IContactState, useContactStore } from '../store/useContactStore'
import { IUserInfoState, useUserInfoStore } from '../store/useUserInfoStore'
import { IHoliday, IUserInfo, IInteract } from '@flyele-nx/service'
import { useHolidayStore } from '../store/useHolidayStore'

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

  static updateUserInfo(data: Omit<IUserInfo, 'Token'>) {
    useUserInfoStore.setState(
      produce((state: IUserInfoState) => {
        state.userInfo = data
        state.isEnterprise = !!data.corpid
      })
    )
  }

  static updateHolidayStore(data: IHoliday[]) {
    const updateData = useHolidayStore.getState().updateData
    updateData(data)
  }
}

export { GlobalInfoHandler }
