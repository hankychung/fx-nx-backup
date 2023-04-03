export enum Direction {
  up = 'up',
  down = 'down'
}

export interface TimerData {
  start_time: number
  end_time: number
}

// 1->未完成，2->已完成，3->我派发，4->我接受，5->协作事项，6->个人事项，7->我进行中，8->我延期中
export enum FilterQueryType {
  normal, // 默认
  unComplete, // 未完成
  complete, // 已完成
  dispatch, // 我派发
  accepted, // 我接受
  cooperation, // 协作事项
  personal, // 个人事项
  in_progress, // 我进行中
  delay // 我延期中
}

export enum FullGroupBy {
  time = 'time',
  group = 'group',
  project = 'project',
  default = 'default'
}

export enum FilterQuadrantValue {
  no_important_no_urgent = 1,
  urgent_no_important,
  important_no_urgent,
  important_urgent
}

export enum MatterState {
  TO_START = 1,
  EXECUTION,
  DELAY,
  COMPLETE_ON_TIME,
  COMPLETE_DELAY
}

export interface FilterParamsFilter {
  keyword?: string
  query_type?: FilterQueryType
  group_by?: FullGroupBy

  is_follow?: 1 | 2 // 1 已关注 2 未关注
  schedule_hide?: 1 | 2 // 1 已隐藏  2 未显示
  conclusion?: 1 | 2 // 1 有总结 2 无总结

  task_at?: TimerData
  create_at?: TimerData
  update_at?: TimerData
  finish_time?: TimerData
  complete_at?: TimerData

  tags?: string[]

  parent_id?: string

  application_ids?: string[]
  matter_states?: MatterState[]
  priority_levels?: FilterQuadrantValue[]
  taker_ids?: string[]
  creator_ids?: string[]
  admins_ids?: string[]
  project_ids?: string[]
  workspace_ids?: string[]
}

export interface FilterParamsProps {
  page_number: number
  page_record: number
  show_model: 1 | 2 // 1 平铺 2 收合
  direction: Direction

  order_by?: {
    order_by_key: string
    sort: 'DESC' | 'ASC'
  }

  filter?: FilterParamsFilter
}
