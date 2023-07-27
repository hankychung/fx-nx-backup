import { produce } from 'immer'
import { IContactDict } from '../store/types'
import { IContactState, useContactStore } from '../store/useContactStore'
import { useUserInfoStore } from '../store/useUserInfoStore'
import { IUserInfoState } from '@flyele-nx/types'
import { IHoliday, IUserInfo, IInteract } from '@flyele-nx/service'
import { useHolidayStore } from '../store/useHolidayStore'
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

  static updateHolidayStore(data: IHoliday[]) {
    const updateData = useHolidayStore.getState().updateData
    updateData(data)
  }
}

export { GlobalInfoHandler }
