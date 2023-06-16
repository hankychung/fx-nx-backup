import { SPACE_TYPE, SPACE_LEVEL } from '../space/const'

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
