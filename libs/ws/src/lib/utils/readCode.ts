import { IWsMsg } from '@flyele-nx/types'
import { codeActions } from './codeActions'

export const readCode = (msg: IWsMsg) => {
  codeActions.forEach((handler, codes) => {
    if (codes.includes(msg.co)) {
      handler(msg)
    }
  })
}
