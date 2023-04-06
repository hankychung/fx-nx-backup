export enum FullShowMode {
  flat = 1,
  group
}

export type FullViewParamsQueryType =
  | 0
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | ''
  | undefined

export enum ScheduleShow {
  UN_SHOW = 1, // 不显示
  SHOW // 显示
}

export enum Conclusion {
  EXIST = 1, // 有总结
  NULL // 无总结
}

export enum Duration {
  EXIST = 1, // 有时间
  NULL // 无时间
}

export enum MatterState {
  TO_START = 1,
  EXECUTION,
  DELAY,
  COMPLETE_ON_TIME,
  COMPLETE_DELAY
}

export enum FullGroupBy {
  time = 'time',
  group = 'group',
  project = 'project',
  default = 'default'
}

export interface FullViewParams {
  projectId?: string // 项目id
  query_type?: FullViewParamsQueryType // - 查询类型，1->未完成，2->已完成，3->我派发，4->我接受，5->协作事项，6->个人事项
  date_type?: 1 | 2 | '' // - 日期类型，1->今天之前，2->今天之后（包含今天）
  keywords?: string // 搜索关键字
  start_time?: number | '' // - 开始时间，时间戳
  end_time?: number | '' // - 截止时间，时间戳
  is_follow?: 1 | 2 // - 是否关注 1->关注，2->未关注
  schedule_show?: ScheduleShow | '' //  - 日程显示 1->显示，2->不显示
  conclusion?: Conclusion //  总结，1->有总结，2->无总结
  tags_id?: string // - 标签id，多个用逗号隔开
  takers_id?: string // - 参与人id，多个用逗号隔开
  creators_id?: string //  - 创建人id，多个用逗号隔开
  administrators_id?: string // - 责任人id，多个用逗号隔开
  projects_id?: string // - 项目id，多个用逗号隔开
  not_projects_id?: string //  - 不包含项目id，多个用逗号隔开
  tasks_id?: string // - 事项id，多个用逗号隔开
  not_tasks_id?: string // - 不包含事项id，多个用逗号隔开
  sort?: 'asc' | 'desc' | '' // - 排序，asc->正序，desc->倒序， 默认正序
  parent_id?: string
  page_number: number // - 查询页数
  page_record?: number // 查询条数
  repeats_id?: string // 循环事项id
  group_by?: FullGroupBy
  show_mode?: FullShowMode // 1 平铺 2 收合

  complete_stime?: number
  complete_etime?: number
}
