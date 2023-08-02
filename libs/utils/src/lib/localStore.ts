import { IUserInfo } from '@flyele-nx/types'

enum StoreKey {
  auth = 'auth',
  'user-info' = 'user-info'
}

class LocalStore {
  static getToken() {
    return localStorage.getItem(StoreKey.auth) || ''
  }

  static updateToken(token: string) {
    localStorage.setItem(StoreKey.auth, token)
  }

  static setUserInfo(params: IUserInfo) {
    localStorage.setItem(StoreKey['user-info'], JSON.stringify(params))
  }

  static getUserInfo() {
    const _ = localStorage.getItem(StoreKey['user-info'])

    return _ ? (JSON.parse(_) as IUserInfo) : null
  }

  static clear() {
    localStorage.removeItem(StoreKey.auth)
    localStorage.removeItem(StoreKey['user-info'])
  }
}

export { LocalStore }
