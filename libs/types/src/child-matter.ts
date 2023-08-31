import { LOOP_MATTER, QuadrantValue } from '@flyele-nx/constant'
import { IRepeatConfig, IScheduleTask } from './schedule'

export interface ChildMatterData {
  matterTitle: string // 标题
  // remindData: ChangeData<'all'> // 提醒时间
  // time: T
  focus: boolean // 是否处于获取焦点状态
  // ref?: any
  parent?: ChildMatterData
  detail?: string
  tagIds?: string[]
  files?: {
    id: string
    origin: string
    name: string
    size: string
  }[]
  temp_id?: string
  end_time?: number
  /** 截止时间全天事项，1->否，2->是 */
  end_time_full_day?: 1 | 2
  /**  是否派发 0 -> 否，1 -> 是 */
  is_dispatch?: 0 | 1 //
  remind_at?: IScheduleTask['remind_at']
  // [end_repeat_at,repeat_type] key 是专门给循环用的 --start
  end_repeat_at?: number
  /** 重复周期，0->永不，1->每天，2->每周，3->每两周，4->工作日，5->非工作日，6->每月 */
  repeat_type?: LOOP_MATTER
  repeat_config?: IRepeatConfig // 循环设置
  start_time?: number
  /** 开始时间全天事项，1->否，2->是 */
  start_time_full_day?: 1 | 2
  /** 邀请的协作人 */
  takers?: string[]
  /** 是否是默认创建的，需要继承的 */
  needInherited?: boolean
  /** 事项条件 **/
  // matterCondition?: IConditionType
  /** 当前的子事项层级 */
  level: number
  /** 优先级 */
  priority_level?: QuadrantValue
  operate_type?: number

  children?: any
  key: string
}
