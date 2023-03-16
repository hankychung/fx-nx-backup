import { BaseData, MDataTypeEnum } from './mdata'

export interface ObjectiveMember {
  avatar: string
  create_at: number
  exit_at: number
  invite_id: string
  invite_name: string
  nick_name: string
  objective_id: string
  original_name: string
  pinyin: string
  revoke_at: number
  state: number
  update_at: number
  user_id: string
}

export interface ObjectiveData {
  create_at: number
  creator_id: string
  creator_nick_name: string
  delete_at: number
  detail: string
  // files: [], 用不着直接注释
  level: TargetLevel
  objective_id: string
  objective_member: ObjectiveMember[]
  origin_id: string
  schedule: number
  state: TargetStatus
  title: string
  type: number
  update_at: number
  workspace_name: string
}

export enum TargetStatus {
  normal = 1,
  risk,
  delay,
  over
}
export enum TargetLevel {
  personal = 1,
  part,
  company
}

export interface TargetMdata extends BaseData {
  type: MDataTypeEnum.target
  target_level: TargetLevel
  target_status: TargetStatus
  target_progress: number
  target_id: string
}
