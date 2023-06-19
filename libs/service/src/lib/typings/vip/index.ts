export interface IPower {
  batch_export: boolean
  child_tasks_num: number
  create_context_diagram: boolean
  create_team_workspace_num: number
  custom_remind_time: number
  custom_view_num: number
  month_view: boolean
  pc_widget: boolean
  self_file_capacity: number
  self_project_num: number
  sync_local_calendar: boolean
  tag_tasks_num: number
  task_interact_num: number
  upload_file_size: number
}

export interface IMember {
  end_time: number
  id: string
  invite_code: string
  start_time: number
  /** 0 非会员 1 个人会员 2 团队会员 */
  state: 0 | 1 | 2
  user_id: string
  next_end_time?: number //不为空表示他还有个人会员的过期时间
  recently_type?: 1 | 2 | undefined
}

export interface ICombos {
  user_id: string
  combo_id: string
  create_at: number
  name: string
  type: number
  duration: number
  equity: IPower
}

export interface IMemberApi {
  member: IMember
  member_equity?: IPower
  task_equity?: {
    child_tasks_num: number
    tag_tasks_num: number
    task_interact_num: number
  }
  user_ICombos?: ICombos[]
  creator_id: string // 事项创建人
}
