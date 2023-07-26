export type IInteractList = IInteract[]

export interface IInteract {
  avatar?: string
  corp_id?: string
  corp_name?: string
  cu_status?: number
  is_interact?: number
  is_visible?: number
  nick_name?: string
  original_name?: string
  pinyin?: string
  related_with_uid?: string
  remark?: string
  send_open_remind_at?: number
  species?: number
  telephone?: string
  user_id?: string
  user_update_at?: number
  vip_expired_at?: number
  vip_type?: number
}
