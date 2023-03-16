import { TargetLevel, TargetMdata, TargetStatus } from './target'

export enum isFullDay {
  Not = 1,
  Yes = 2
}

export interface BaseTimerData {
  start_time?: number
  start_time_full_day?: isFullDay
  end_time?: number
  end_time_full_day?: isFullDay
}

export enum MDataTypeEnum {
  matter = 1,
  workspace = 5,
  project,
  target,
  todo,
  meeting,
  file,
  note,
  text
}

export interface MdataTaker {
  taker_id?: string
  user_id?: string
  avatar: string
}

export interface TypeSize {
  width: number
  height: number
  specialHeight: number
}

interface BasePosition {
  typeSize: TypeSize
  width: number
  height: number
  x: number
  y: number
  dx: number
  dy: number
  px: number
  py: number
}

interface BaseLevelData {
  parent?: IsMdata
  children: Mdata[]
  _children: Mdata[]

  superiors: Mdata[]
  _superiors: Mdata[]

  collapse?: boolean
  superior_collapse?: boolean

  child_total?: number
  superior_total?: number

  depth: string
  isRoot: boolean
  isSuperiors: boolean
}

export interface BaseData extends BaseTimerData, BasePosition, BaseLevelData {
  id: string
  title: string
  type: MDataTypeEnum

  takers?: MdataTaker[]
  ref_id?: string
  timer?: string // 预处理时间文本

  target_level?: TargetLevel
  target_status?: TargetStatus
  target_progress?: number
  target_id?: string
}

export type Mdata = TargetMdata | BaseData

export type IsMdata = Mdata | null
