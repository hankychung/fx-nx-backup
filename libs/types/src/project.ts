import { PROJECT_STATE, SPACE_TYPE, SPACE_LEVEL } from '@flyele-nx/constant'
import { IUserInfo } from './user'

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

export interface IProject extends IBaseProjectInfo {
  members?: IUserInfo[] // TODO: 会员类型-接口文档上写着是这个类型，但是IUser.IUserInfo还没改。
  sort: number // 排序位置
  create_at: number // 创建时间
  creator_id: string // 项目创建者
  delay_task_total: number //延期事项总数
  finished_task_total: number // 完成事项总数
  last_active_at: number //最后一次活跃时间
  member_total: number // 项目成员总数
  state: PROJECT_STATE // 项目状态 1 正常 2 解散 3 待激活状态
  task_total: number // 事项总数
  today_add_task_total: number // 今日新增事项总数
  unfinished_task_total: number // 未完成事项总数
  target_workspace_name?: string // 移动的目标空间名称
  target_workspace_id?: string // 移动的目标空间id
  notice_id?: string // 通知id
  is_join?: boolean // 是否加入
  is_like?: boolean // 是否收藏
  today_delay_task_total: number
  today_finished_task_total: number
  workspace_level?: SPACE_LEVEL
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

export interface IProjectCreateParams {
  files?: {
    id: string
    name: string
    origin: string
    size: string
  }[] // 项目文件
  project_desc?: string // 详细描述
  project_name: string // 标题
  target_time?: number // 项目时间
  workspace_id?: string // 空间id
  group_names?: string[] // 分组名称
}
/**
 * 项目分组信息
 */
export interface IProjectGroup {
  creator_id: string // 分组创建者
  id: string // 分组ID
  is_default: 1 | 2 // 是否未默认 1 默认 2 非默认
  name: string // 分组名称
  sort: number // 分组排序
}

export type CreateSuccessType = (
  type: 'invite' | 'create',
  data: CreatedProjectSucData
) => void

// 项目创建成功
export type CreatedProjectSucData = {
  project_id: string
} & IProjectCreateParams
