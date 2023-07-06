import { SPACE_TYPE, SPACE_LEVEL, SPACE_STATE } from './const'
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
