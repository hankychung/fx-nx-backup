import { CorpAppStatus, CorpUserStatus, CorpVersion } from '@flyele-nx/constant'

export interface IOfficialGetQrCodeParams {
  page: string
  scene: string
  is_hyaline?: number
}

export interface IOfficialCorpAuthInfo {
  avatar: string
  corp_name: string
  corp_userid: string
  corpid: string
  create_at: number
  nick_name: string
  pinyin: string
  telephone: string
  token: string
  user_id: string
  original_name: string
}

export interface IOfficialCorpDetail {
  /**
   * 应用状态，付费状态。 0-没有付费; 1-限时试用; 2-试用过期; 3-购买期内; 4-购买过期; 5-不限时试用; 6-购买期内，但是人数超标, 注意，超标后还可以用7天; 7-购买期内，但是人数超标, 且已经超标试用7天
   */
  app_status: CorpAppStatus
  /** 企业名称 */
  corp_name: string
  /** 企业corpid */
  corpid: string
  /** 企业用户状态 */
  cu_status: CorpUserStatus
  /** 过期时间 */
  expired_time: number
  /** 已使用用户数 */
  user_count: number
  /** 用户ID */
  user_id: string
  /** 用户限制数量 */
  user_limit: number
  /** 版本，trial-试用，paid-付费版 */
  version: CorpVersion
  /** 总容量 */
  total_capacity: number
  /** 已使用容量 */
  used_capacity: number
}
