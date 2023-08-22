import {
  SpaceMemberType,
  EConCheckStatus,
  AddContactsType,
  VipTypeEnum
} from '@flyele-nx/constant'
import { Taker } from './schedule'

export interface IContacts {
  avatar: string
  nick_name: string
  original_name: string
  pinyin?: string
  user_id: string
  taker_id?: string // 太多地方这里是taker_id了
  remark: string
  is_interact: number // 是否协作人
  species: number
  telephone?: string
  user_update_at?: number
  member_type?: SpaceMemberType // 成员类型：1空间成员，2外部成员
  is_external_member?: boolean // 成员类型 是否为项目外部成员 true 为外部成员 false | void 内部成员
}

export interface IContactsAndStatus extends IContacts {
  status: EConCheckStatus
  key?: string
  addType?: AddContactsType
  count?: number
  vip_type?: VipTypeEnum //0-非会员，1-个人会员，2-团队会员
}

export interface ITakerAndStatus extends Taker {
  status: EConCheckStatus
  key?: string
  addType?: AddContactsType
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

export interface IInviteTaker {
  avatar: string
  nick_name: string
  pinyin: string
  taker_id: string
  vip_type?: VipTypeEnum
}
