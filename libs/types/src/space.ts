import { SPACE_TYPE, SPACE_LEVEL, SPACE_STATE } from '@flyele-nx/constant'
import { IFullViewFiles } from './fullView'
/**
 * 空间基础信息
 */
export interface IBasicSpace {
  icon: string // 空间icon
  icon_color: string // 空间icon颜色
  bg_icon: string // 背景图 keyname
  name: string // 空间名称
  create_at: number //创建时间
  expired_at?: number // 会员到期时间
  workspace_id: string //空间ID
  ws_type: SPACE_TYPE // 1:团队空间  2:个人空间
  level: SPACE_LEVEL // 空间类型 (1: 基础版  2: 专业版)
  creator_id?: string // 创建人Id
  creator_name?: string // 创建人名称
  deadline?: number
  state: SPACE_STATE // 空间状态 1: 正常  2:解散  3:禁用(带激活)
  has_red?: boolean // 是否有小红点
  has_like_project?: boolean // 是否有收藏项目
  sort?: number // 排序

  _activeTime?: number // 最后选中时间 (当前有一个选中时间修改排序! 未来可能做成热更新, 先补位)
  member_type?: number //内部外部成员
  identify?: number //管理员 普通成员
}

export interface ISpaceList {
  data_list?: IBasicSpace[]
  other_datas?: IBasicSpace[]
}

export interface ISpaceListParams {
  workspace_id?: string
  keyword?: string
  query_external?: boolean
}

/**
 * (项目) 移动到空间请求参数
 */
export interface ISpaceMoveToSpaceParams {
  project_id: string
  current_workspace_id: string
}

/**
 * 用户空间资源(头像/头像背景/皮肤)配置的基础类型
 */
export interface IBasicSpaceConfig {
  base_url: string // 请求的cdn 地址 小程序专属
  filename: string[]
  level: SPACE_LEVEL // 配置的使用权限 1: 普通版本  2: 专业版
  resource_type: '1' | '2' | '3' // 当前配置所属的资源类型 1、头像 2、背景 3、颜色
}

/**
 * 空间资源 "皮肤" 的配置类型
 */
export interface ISpaceSinkConfig extends IBasicSpaceConfig {
  key_name: string
}

/**
 * 空间资源 "头像" 的配置类型
 */
export interface ISpaceAvatarConfig extends IBasicSpaceConfig {
  key_name: string
}

/**
 * 空间资源 "头像背景" 的配置类型
 */
export interface ISpaceAvatarColorConfig extends IBasicSpaceConfig {
  icon_color: string
}

/**
 * 空间资源配置统合参数
 * 当前配置所属的资源类型 1、头像 2、背景 3、颜色
 */
export type SpaceConfigItem<T extends '1' | '2' | '3'> = [T] extends ['1']
  ? ISpaceAvatarConfig
  : [T] extends ['2']
  ? ISpaceSinkConfig
  : ISpaceAvatarColorConfig

export interface ISpaceCreateParams {
  files?: IFullViewFiles[]
  bg_icon: string //
  icon: string // 空间icon
  icon_color: string // 空间icon颜色
  name: string // 空间名称
  workspace_id?: string // 临时空间ID
  level: SPACE_LEVEL // 1: 普通版本  2: 专业版本
  ws_desc?: string // 空间背景详情
  user_ids?: string[] // 用户Id
  is_default_expired?: boolean // 一键升级为专业版本
  have_upload_file?: boolean
  business?: string // 行业
  scale?: string // 规模
  is_update_team_vip?: boolean // 升级空间
  is_demote_team_vip?: boolean // 空间降级
  demote_reserve_app_id?: string[] // 降级空间保留的应用
  demote_reserve_user_id?: string[] // 降级空间保留的人员
}
