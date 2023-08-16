import { IndustryMemberType } from '@flyele-nx/constant'
import { IRepeatConfig } from './schedule'

export interface IIndustryListParams {
  member_type: IndustryMemberType
}

export interface IIndustryList {
  industry_id: number
  industry_name: string
}

export type usageModeType = 'personal' | 'team' | ''

export interface IIndustryUserType {
  job?: string
  business_type?: string
}

export interface IIndustryTask {
  title: string
  detail?: string
  repeat_config?: IRepeatConfig
  task_time?: {
    date: string
    start_time: string
    end_time: string
  }
}

export interface IIndustryTaskGroup {
  group_name: string // 分组名称
  add_month?: number // 当前时间上 加几个月，替换上面 group_name 的文字用的 group_name 的格式为 '+x 月'
  tasks?: IIndustryTask[] // 事项
}

export interface IIndustryInfo {
  display_mode: 1 | 2 // 1:  平铺显示 、 2: 收合显示
  group_display: 'time' | 'group' | 'project' | 'default' // time: 按时间分区、group： 按分组分区、project：按项目分区、 default： 默认不分区
  is_edit: boolean
  project_name: string
  table_header_title?: number[] // 对应枚举 TableHeaderTitle
  task_group: IIndustryTaskGroup[] // 事项数组
}

export interface IIndustryTaskGroupWithId extends IIndustryTaskGroup {
  group_id: string // 分组id
}

export interface IIndustryTemplate extends IIndustryInfo {
  checked: 'checked' | 'normal'
  task_group: IIndustryTaskGroupWithId[]
}
