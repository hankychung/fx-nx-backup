import { SpaceMemberType } from '../space/const'
import { Taker } from '../schedule'

export enum AddContactsType {
  matterRelevant = '事项相关方',
  flyeleContacts = '飞项协作人',
  qrCode = '微信好友',
  inviteLink = '邀请链接'
}

export enum EConCheckStatus {
  unChecked = 'unChecked',
  checked = 'checked',
  /** 勾上不可选 */
  noSel = 'noSel',
  disabled = 'disabled'
}

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
/**
 * 0-非会员，1-个人会员，2-团队会员
 */
export enum VipTypeEnum {
  Poor = 0,
  Person = 1,
  Team = 2
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
