import { IUserInfo } from '@flyele-nx/types'

class LocalStore {
  static getToken() {
    return localStorage.getItem('auth') || ''
  }

  static updateToken(token: string) {
    localStorage.setItem('auth', token)
  }

  // static setUserInfo(params: { userInfo: Omit<IUserInfo, 'Token'> }) {}
}

export { LocalStore }
