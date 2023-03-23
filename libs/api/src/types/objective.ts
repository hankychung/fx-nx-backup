export enum ObjectiveSnapMapTypeEnum {
  workspace = 'workspace',
  person = 'person'
}

export enum ObjectiveLevel {
  personal = 1,
  part,
  company
}

export enum TargetState {
  normal = 1,
  risk,
  delay,
  over
}

export interface ObjectiveMemberItem {
  avatar: string
  create_at: number
  creator_id: string
  exit_at: number
  invite_id: string
  invite_name: string
  nick_name: string
  objective_id: string
  original_name: string
  pinyin: string
  revoke_at: number
  state: TargetState
  update_at: number
  user_id: string
}

export interface ObjectiveSnapMapItem {
  create_at: number
  creator_id: string
  creator_nick_name: string
  level: ObjectiveLevel
  objective_id: string
  objective_member: ObjectiveMemberItem[]
  schedule: number
  state: TargetState
  title: string
  relation_total: number

  up_list?: ObjectiveSnapMapItem[]
  down_list?: ObjectiveSnapMapItem[]
}

export interface ObjectiveSnapMapParams {
  ref_id: string
  type: ObjectiveSnapMapTypeEnum
}
