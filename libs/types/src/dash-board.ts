import {
  IDENTITY,
  LOOP_MATTER,
  MATTER_CREATOR_STATE,
  MATTER_OPERATE_STATE,
  MATTER_PERSONAL_STATE,
  MATTER_TAKER_STATE,
  MEETING_CREATOR_STATE,
  MEETING_OPERATE_STATE,
  MEETING_PERSONAL_STATE,
  MEETING_TAKER_STATE,
  MatterType
} from '@flyele-nx/constant'
import { RepeatList, Taker } from './schedule'

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

export interface ICustomDashboardItem {
  repeat_id?: string
  dispatch_id: string
  complete_at?: number
  end_time?: number
  end_time_full_day?: 1 | 2
  creator_id: string
  execute_at?: number
  finish_time?: number
  repeat_finish_time?: number
  has_follow: boolean // 是否关注
  matter_type: MatterType
  // matter_type: MATTER_TYPE
  operate_state: MATTER_OPERATE_STATE | MEETING_OPERATE_STATE
  personal_state: MATTER_PERSONAL_STATE | MEETING_PERSONAL_STATE
  start_time?: number
  start_time_full_day?: 1 | 2
  state:
    | MATTER_CREATOR_STATE
    | MEETING_CREATOR_STATE
    | MATTER_TAKER_STATE
    | MEETING_TAKER_STATE
  task_id: string
  title: string
  create_at: number
  identity: IDENTITY
  cycle?: number
  cycle_date?: string
  repeat_list?: RepeatList[] // TODO: 不知道类型对不对，待检查
  repeat_type?: LOOP_MATTER
  category?: number
  flow_step_id?: string
  flow_step_complete_at?: number // 所处步骤的完成时间
  flow_step_join?: boolean // 是否加入当前步骤

  biz: {
    /**
     * 自定义视图的时间状态 1未开始 2今日开始 3今日截止 4进行中 5延期中 6已完成
     */
    time_state: number
    /**
     * 时间字符串
     */
    time_str: string
  }
}
