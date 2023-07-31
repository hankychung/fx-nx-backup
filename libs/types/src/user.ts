export interface IUserInfo {
  Token: string
  create_at: number
  avatar: string
  nick_name: string
  original_name: string
  telephone: string
  user_id: string
  pinyin: string
  corp_name?: string
  corp_userid?: string
  corpid?: string
  token?: string
}

/**
 * 登录相关的如下
 */
export interface IDevice {
  client_ip?: string
  client_version: string
  device_name?: string
  mac_addr?: string
  os: string
  platform: 'pc' | 'web'
  device_id: string
}

export interface ILoginKeyParams {
  device: IDevice
  last_login_key: string
}

export interface IPhoneLoginParams {
  device: IDevice
  telephone: string
  verify_code?: string
  user_id?: string
  channel_source?: string
}

/**
 * 登录相关结束
 */

export interface IWeather {
  code: string
  humidity: string
  iso_week: number
  name: string
  pressure: string
  temperature: string
  text: string
  visibility: string
  week_day: number
  wind_direction: string
  wind_direction_degree: string
  wind_scale: string
  wind_describe: string
  message?: string
}

export interface IUserInfoState {
  userInfo: Omit<IUserInfo, 'Token'>
  isEnterprise: boolean
}
