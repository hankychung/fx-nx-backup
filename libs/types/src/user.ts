import { IVip } from './vip'
import { IAuthBase } from './auth'
import { CorpUserStatus } from '@flyele-nx/constant'
import { IOfficialCorpDetail } from './official'

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

export interface IUserEnterpriseTakers {
  user_id: string
  corp_userid: string
  corpid: string
  avatar: string
  corp_name: string
  cu_status: CorpUserStatus
  nick_name: string
  pinyin: string
  remark: string
  telephone: string
  stateTxt?: string
}

export interface IUserInfoState {
  userInfo: Omit<IUserInfo, 'Token'>
  isEnterprise: boolean
  vip: IVip
  vipPower: IAuthBase | undefined
  setting: IUserSetting
  enterprise: IOfficialCorpDetail
  enterpriseTakers: IUserEnterpriseTakers[]
}

export interface IRefreshToken {
  code: number
  Token: string
  max_age: number
}
export type SettingFileSyncPolicy = 'never' | 'after_view' | 'auto'

export type SettingRobotBindState = '1' | '2' | '3'

export interface IUserSetting {
  /** 事项列表显示模式 1 平铺 2 合 4 usages  */
  show_mode: string // 讨论列表显示模式
  /** 自定义视图排序  */
  view_sort: string // 系统看板排序
  /** 1 绑定，2 未绑定，3 小姐姐微信被删除，需要重新绑定 是否定飞项小姐姐微信 */
  robot_bind_state: SettingRobotBindState
  /** 文件同步策略 */
  file_sync_policy: SettingFileSyncPolicy
  /** 总的可用空间 */
  total_space: string
  /** 已使用空间 */
  used_space: string
  /** 1 开启，2 关闭 公众号 */
  acc_notify_state: string // "1"
  /** 日程定时提醒周期 */
  early_remind_date: string //"1,2,3,4,5"
  /** 日程定时提醒默认表达式 */
  early_remind_time: string //"09:00"
  /** 1 开启早报通知 */
  enable_early: string //"1"
  /** 1 开启晚报通知 */
  enable_night: string // "1"
  /** 全量视图,头部设置 */
  full_view: string //"1,2,3,4"
  /**  最后登录时间  */
  last_login_time: string //"1673487224"
  /** 移动端在线 */
  mobile_online: string // "2"
  /** 新消息通知 */
  new_message_notify: string //"1"
  /** 日程定时提醒周期 */
  night_remind_date: string // "1,2,3,4,5"
  /** 日程定时提醒默认表达式 */
  night_remind_time: string //"21:00"
  /** 公众号关注标记 */
  official_acc_subscribe: '0' | '1' //"0"
  /** 是否开启免打扰 silent mode 1 开启 2 关闭 */
  open_mobile_not_notify: '1' | '2'
  /** PC端在线 1 在线 2 离线 */
  pc_online: string //"2"
  /** 1 开启，2 关闭 小姐姐公众号 */
  robot_state: string //"1"
  /** 显示消息详情  */
  show_message_detail: string // "1"
  /** 空间目录排序 */
  space_directory_sort: string // "1,2"
  /** 菜单设置*/
  menu_bar_view: string
  /** 自定义菜单栏目的 排序*/
  menu_bar_item_sort: string // 字符串数组 转一下 ['project', 'space', 'more']
}
