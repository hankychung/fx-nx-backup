import { VipTypeEnum } from '@flyele-nx/constant'

/**
 * 获取对象某个key的值类型
 */
export type GetObjKeyOfType<T, K extends keyof T> = Required<
  Pick<T, K>
> extends {
  [p in T extends K ? K : string]: infer U
}
  ? U
  : never

export interface CommonResponse<T> {
  code?: number
  message?: string
  data: T
}

export interface IExternalListResponse {
  total?: number
  complete_total?: number
}

// type ENV = 'normal' | 'dev' | 'test' | 'prod' | 'pre_prod' | 'pre_release'

export interface IErrorResponse {
  code: number
  dbg_error: string
  message: string
}

export type IResponse<T, M = Record<string, never>> = CommonResponse<T> & M

export type RequestConfig = import('axios').AxiosRequestConfig & {
  url: string
} & { notFilterEmpty?: boolean }

export interface IRequestList {
  page_number?: number // 查询页数，默认1
  page_record?: number // 查询条数，默认20
}

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

export interface ICreateOrderParams {
  amount: number
  coupon_id: number
  good_id: number
  origin_route: string
  total_price: number
  users_id: string[]
}
//获取支付信息
export interface IGetPayParams {
  code: string
  name: string
  order_method: number //下单的途径，0->默认未知，1->APP下单，2->小程序下单，3->JSAPI下单，4->Native下单，5->H5下单，6->支付宝下单
  out_trade_no: string
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

interface Member {
  end_time: number
  id: string
  invite_code: string
  start_time: number
  state: 0 | 1 | 2
  user_id: string
  next_end_time?: number //不为空表示他还有个人会员的过期时间
}
export interface IVipMember {
  member: Member
}

export interface IVip {
  id?: string // vip id
  invite_code?: string // vip邀请码
  level: number // 会员等级 1.8v 暂时只存在 0 | 1
  deadline: number // 会员结束时间
  start_time?: number // 会员开始时间
  next_end_time?: number
  end_time?: number
  recently_type?: 1 | 2 | undefined
}

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

// 中台协作人接口返回 - 协作人字典来源
export interface IInteract {
  avatar: string
  corp_id?: string
  corp_name?: string
  cu_status?: number
  is_interact?: number
  is_visible?: number
  nick_name: string
  original_name?: string
  pinyin?: string
  related_with_uid?: string
  remark?: string
  send_open_remind_at?: number
  species?: number
  telephone?: string
  user_id: string
  user_update_at?: number
  vip_expired_at?: number
  // 下一个会员过期时间，有这个代表即时个人会员又是团队会员 - by 洪亮
  vip_next_expired_at?: number
  vip_type?: VipTypeEnum
}

// 全局协作人字典
export interface IContactDict {
  [k: string]: IInteract
}

export * from './schedule'
export * from './tag'
export * from './project'
export * from './workflow'
export * from './space'
export * from './taker'
