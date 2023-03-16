import { BaseTimerData, Mdata, MdataTaker } from './mdata'
import { TargetLevel, TargetStatus } from './target'

export interface Data extends BaseTimerData {
  title: string

  test_type?: Mdata['type']
  card_type?: Mdata['type']

  target_id?: string
  target_status?: TargetStatus
  target_level?: TargetLevel
  target_progress?: number

  takers?: MdataTaker[]

  creator_id?: string

  child_total?: number // 子事项数量
  children?: Array<Data>
  collapse?: boolean

  superior_collapse?: boolean
  superiors?: Array<Data>
  superior_total?: number
}

export type TwoNumber = [number, number]
