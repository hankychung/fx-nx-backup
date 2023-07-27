import { IUserInfo } from './types'

export interface IUserInfoState {
  userInfo: Omit<IUserInfo, 'Token'>
  isEnterprise: boolean
}
