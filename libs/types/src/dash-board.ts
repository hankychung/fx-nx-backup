import { LOOP_MATTER } from '@flyele-nx/constant'
import { Taker } from './schedule'

export interface IDashboardCount {
  dispatch_finish_total?: number
  dispatch_total?: number
  follow_total?: number
  follow_finish_total?: number
  join_finish_total?: number
  join_total?: number
  self_finish_total?: number
  self_total?: number
}

export interface IDashboardItem {
  end_time?: number
  complete_at?: number
  end_time_full_day?: 1 | 2
  execute_at?: number
  last_active_at?: number
  start_time?: number
  start_time_full_day?: 1 | 2
  takers: Taker[]
  task_id: string
  title: string
  finish_time?: number
  repeat_finish_time?: number
  creator_id: string
  matter_type: number
  state: number
  has_follow?: boolean
  cycle?: number
  repeat_type?: LOOP_MATTER
  repeat_id?: string
  create_at: number
  flow_step_count_total?: string
  flow_step_id?: string
  flow_step_name?: string
  dispatch_id: string
  flow_step_complete_at?: number // 所处步骤的完成时间
  flow_step_join?: boolean // 是否加入当前步骤
}

export type IDashboard = null | IDashboardItem[]

export interface IDashboardItem {
  end_time?: number
  complete_at?: number
  end_time_full_day?: 1 | 2
  execute_at?: number
  last_active_at?: number
  start_time?: number
  start_time_full_day?: 1 | 2
  takers: Taker[]
  task_id: string
  title: string
  finish_time?: number
  repeat_finish_time?: number
  creator_id: string
  matter_type: number
  state: number
  has_follow?: boolean
  cycle?: number
  repeat_type?: LOOP_MATTER
  repeat_id?: string
  create_at: number
  flow_step_count_total?: string
  flow_step_id?: string
  flow_step_name?: string
  dispatch_id: string
  flow_step_complete_at?: number // 所处步骤的完成时间
  flow_step_join?: boolean // 是否加入当前步骤
  // TODO: 待检查
  ref_task_id: string
}
