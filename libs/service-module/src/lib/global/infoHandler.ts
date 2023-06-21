import { produce } from 'immer'
import { IContactDict } from '../contact/types'
import { IState, useContactStore } from '../contact/useContactStore'

class GlobalInfoHandler {
  static updateContactDict(data: IContactDict) {
    useContactStore.setState(
      produce((state: IState) => {
        state.contactDict = data
      })
    )
  }
}

export { GlobalInfoHandler }
