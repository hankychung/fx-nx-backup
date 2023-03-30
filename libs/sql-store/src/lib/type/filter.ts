export enum Direction {
  up = 'up',
  down = 'down'
}

export interface TimerData {
  start_time: number
  end_time: number
}

export interface FilterParamsProps {
  page_number: number
  page_record: number
  user_id: string
  direction: Direction

  filter?: {
    is_follow?: 1 | 2 // 1 已关注 2 未关注
    create_at?: TimerData
    update_at?: TimerData
    finish_time?: TimerData
    complete_at?: TimerData
    schedule_hide?: 1 | 2 // 1 已隐藏  2 未显示

    parent_id?: string
    keyword?: string
    taker_ids?: string[]
    creator_ids?: string[]
    admins_ids?: string[]
  }
}
