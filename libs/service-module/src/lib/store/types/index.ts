import { VipTypeEnum } from '@flyele-nx/service'

export interface IContactDict {
  [k: string]: Omit<IContactData, 'userId'>
}

export interface IContactData {
  userId: string
  avatar: string
  nick_name: string
  original_name: string
  pinyin?: string
  remark?: string
  telephone?: string
  user_id?: string
  is_interact?: number
  vip_type?: VipTypeEnum
  vip_expired_at?: number
  vip_next_expired_at?: number

  isVip?: boolean
  isTeamVip?: boolean
  recently_type?: 1 | 2 | undefined
  // 企业版相关
  /** 企业 id */
  corp_id?: string
  /** 企业 名称 */
  corp_name?: string
  /** 账号状态：0-个人版 1-正常，2-未启用，3-已失效，4-已离职 */
  cu_status?: 0 | 1 | 2 | 3 | 4

  // 内蒙相关
  /** 职务 */
  duty?: string
  /** 组织名称 */
  org_display_name?: string
  /** 组织路径 */
  org_path?: string
  /** 组织简称 */
  initials?: string
  /** 创建时间 */
  create_at?: number
  /** 邮箱 */
  email?: string
  account_state?: number
}

export type IInteractsDataDict = {
  [k: string]: IInteractsData
}

export interface IInteractsData {
  userId: string
  user_id?: string
  avatar: string
  name: string
  pinyin?: string
  is_interact: number // 是否为协作人 0 否，1是，2注销 现在2023.1.11 目前用不到
  species: number // 1 是已激活的  2 未激活
  telephone?: string
  vip_type?: VipTypeEnum //0-非会员，1-个人会员，2-团队会员
  isVip?: boolean
  isTeamVip?: boolean

  // 内蒙相关
  /** 职务 */
  duty?: string
  /** 组织名称 */
  org_display_name?: string
  /** 组织路径 */
  org_path?: string
  /** 组织简称 */
  initials?: string
  /** 创建时间 */
  create_at?: number
  /** 邮箱 */
  email?: string
}
