//当前日与生成月份的相对关系
import { Dayjs } from 'dayjs'
import { ICreateParams } from './schedule'

export type DayInMonth = 'current' | 'previous' | 'next'

export interface ITimeDay {
  date: Dayjs
  dayInMonth: DayInMonth
  isToday: boolean
  classNames?: string[]
}

export interface ITimeBaseProps {
  startTimeFullDay: 1 | 2 // 是否全天 1->否，2->是
  endTimeFullDay: 1 | 2 // 是否全天 1->否，2->是
  startTime: Dayjs
  endTime: Dayjs
  isSetTime: boolean // 是否清空
}

export interface ITimeProps extends ITimeBaseProps {
  minDate: Dayjs
  maxDate: Dayjs
  cur: Dayjs
}

export type ITimeParams = Partial<
  Pick<
    ICreateParams,
    | 'start_time'
    | 'remind_at'
    | 'end_time'
    | 'end_time_full_day'
    | 'start_time_full_day'
  >
>

export type ITimeMatterSectionType = {
  start_time?: number // 开始时间
  start_time_full_day?: 1 | 2 // 开始是否为全天
  end_time?: number // 结束时间
  end_time_full_day?: 1 | 2 // 结束是否为全天
}

// 事项时间格式化之后的输出格式
export type ITimeMatterSectionReturn = {
  output: string // 完成的时间格式输出
  firstPartOutput: string // 开始时间内容
  secondPartOutput: string // 结束时间内容
  noSetTime?: boolean // 是否未设置时间
}
