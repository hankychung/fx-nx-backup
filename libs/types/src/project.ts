import { PROJECT_STATE, SPACE_TYPE, SPACE_LEVEL } from '@flyele-nx/constant'

// 基础项目信息, 别随便加类型
export interface IBaseProjectInfo {
  ws_levle?: SPACE_LEVEL // 空间等级
  project_id: string // 项目id
  project_name: string // 项目名称
  workspace_name?: string // 空间名称  个人空间 是没有名字
  workspace_id: string // 空间id
  ws_type: SPACE_TYPE // 空间类型
  creator_id?: string
}

/**
 * 项目信息
 */
export interface IProjectInfo extends IBaseProjectInfo {
  create_at: number // 创建时间
  cancel_at: number // 取消时间
  creator_id: string // 创建者ID
  target_time?: number // 目标时间
  files?: IProjectFiles[] // 项目介绍文件
  project_desc?: string // 项目描述
  project_members: IProjectMember[] // 项目协作人
  state: PROJECT_STATE // 项目状态
  archive_at?: number
  archive_by?: string
  archive_by_nick_name?: string
  archive_state?: number
  project_choro_gram_config?: IProjectChorogramConfig
  workspace_level?: SPACE_LEVEL
  target_workspace_id?: string
  target_workspace_name?: string
}

/** 项目文件 **/
interface IProjectFiles {
  id: string
  name: string
  origin: string
  size: string
}

/**
 * 项目协作人信息
 */
export interface IProjectMember {
  accept_at: number // 项目接受时间
  avatar: string // 头像
  create_at: number // 项目创建时间
  invite_id: string // 邀请人id
  invite_name: string // 邀请人名称
  invite_create_at: string // 邀请时间
  nick_name: string // 名称
  original_name: string // 原始名称
  pinyin: string // 拼音
  refuse_at: number // 项目拒绝时间
  revoke_at: number // 项目更新时间
  state: number // 当前人状态
  user_id: string // 用户id
  is_external_member?: boolean // 是否为外部成员
  like_at?: number
  notice_id?: string // 审批人id
  vip_type?: number
  is_team_vip?: boolean
  corp_id?: string // 是否是企业用户
  is_corp_vip?: boolean
  last_vip_expired_at?: number
  isVip?: boolean
  isTeamVip?: boolean
}

export interface IProjectChorogramConfig {
  file: OpenClose // 文件
  objective: OpenClose // 目标
  schedule: OpenClose // 日程
  template: OpenClose // 模板库
}

export enum OpenClose {
  OPEN = 1, // 开
  CLOSE // 关
}
