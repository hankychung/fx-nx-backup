import {
  IAuthBase,
  IOfficialCorpDetail,
  IUserEnterpriseTakers,
  IUserInfo,
  IVip,
  IUserSetting,
  TagModel
} from '@flyele-nx/types'

enum StoreKey {
  auth = 'auth',
  'user-info' = 'user-info',
  'user-vip' = 'user-vip',
  'user-vip-power' = 'user-vip-power',
  'user-setting' = 'user-setting',
  'user-enterprise-info' = 'user-enterprise-info',
  'user-enterprise-takers' = 'user-enterprise-takers',
  'user-tags' = 'user-tags'
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

  static setUserVip(params: IVip) {
    localStorage.setItem(StoreKey['user-vip'], JSON.stringify(params))
  }

  static setUserVipPower(params: IAuthBase) {
    localStorage.setItem(StoreKey['user-vip-power'], JSON.stringify(params))
  }

  static setUserSetting(params: IUserSetting) {
    localStorage.setItem(StoreKey['user-setting'], JSON.stringify(params))
  }

  static setUserEnterpriseInfo(params: IOfficialCorpDetail) {
    localStorage.setItem(
      StoreKey['user-enterprise-info'],
      JSON.stringify(params)
    )
  }

  static setUserEnterpriseTakers(params: IUserEnterpriseTakers[]) {
    localStorage.setItem(
      StoreKey['user-enterprise-takers'],
      JSON.stringify(params)
    )
  }

  static setUserTags(params: TagModel[]) {
    localStorage.setItem(StoreKey['user-tags'], JSON.stringify(params))
  }

  static getUserInfo() {
    const _ = localStorage.getItem(StoreKey['user-info'])

    return _ ? (JSON.parse(_) as IUserInfo) : null
  }

  static getUserVip() {
    const _ = localStorage.getItem(StoreKey['user-vip'])

    return _ ? (JSON.parse(_) as IVip) : null
  }

  static getUserVipPower() {
    const _ = localStorage.getItem(StoreKey['user-vip-power'])

    return _ ? (JSON.parse(_) as IAuthBase) : null
  }

  static getUserSetting() {
    const _ = localStorage.getItem(StoreKey['user-setting'])

    return _ ? (JSON.parse(_) as IUserSetting) : null
  }

  static getUserEnterpriseInfo() {
    const _ = localStorage.getItem(StoreKey['user-enterprise-info'])

    return _ ? (JSON.parse(_) as IOfficialCorpDetail) : null
  }

  static getUserEnterpriseTakers() {
    const _ = localStorage.getItem(StoreKey['user-enterprise-takers'])

    return _ ? (JSON.parse(_) as IUserEnterpriseTakers[]) : []
  }

  static getUserTags() {
    const _ = localStorage.getItem(StoreKey['user-tags'])

    return _ ? (JSON.parse(_) as TagModel[]) : []
  }

  static clear() {
    localStorage.removeItem(StoreKey.auth)
    localStorage.removeItem(StoreKey['user-info'])
    localStorage.removeItem(StoreKey['user-vip'])
    localStorage.removeItem(StoreKey['user-vip-power'])
    localStorage.removeItem(StoreKey['user-setting'])
    localStorage.removeItem(StoreKey['user-enterprise-info'])
    localStorage.removeItem(StoreKey['user-enterprise-takers'])
    localStorage.removeItem(StoreKey['user-tags'])
  }
}

export { LocalStore }
