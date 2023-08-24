import {
  DayInMonth,
  ITimeDay,
  ITimeProps,
  ITimeMatterSectionType,
  ITimeMatterSectionReturn,
  IScheduleTask,
  ITimeParams
} from '@flyele-nx/types'
import { defaultSelector } from '@flyele-nx/constant'
import dayjs, { Dayjs } from 'dayjs'
import { timeGetter } from '../timeGetter'
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'
dayjs.extend(isSameOrAfter)

type TimeKeys = {
  time: 'startTime' | 'endTime'
  remindTime: 'startRemindTime' | 'endRemindTime'
  noSetting: 'startNoSetting' | 'endNoSetting'
  fullDay: 'startTimeFullDay' | 'endTimeFullDay'
}

export const defaultMinDate = dayjs('2020-5-18') // 最小日期
export const defaultMaxDate = dayjs().add(2, 'year').endOf('year') // 最大日期

// 常量：星期几 - 映射dayjs.day()
export const DAY_DICT = ['日', '一', '二', '三', '四', '五', '六']

const deleteUndefinedByObj = <T>(data: T): T => {
  if (typeof data === 'object' && data !== null) {
    try {
      Object.keys(data).forEach((key) => {
        if (typeof data[key as keyof T] === 'undefined') {
          delete data[key as keyof T]
        }
      })
    } catch (e) {
      console.log('deleteUndefinedByObj error:', e)
    }
  }

  return data
}

//生成前月，本月，后月的日
function getDays(
  date: Dayjs,
  dayInMonth: DayInMonth,
  today: Dayjs,
  daysNum: number
): ITimeDay[] {
  const days: ITimeDay[] = []

  //从1开始，0会冒泡到上个月最后一天
  for (let i = 1; i <= daysNum; i++) {
    const day: Dayjs = date.clone().date(i)

    days.push({
      date: day,
      dayInMonth,
      isToday: day.isSame(today)
    })
  }

  return days
}

// 获取初始化事项时间对象
export const getInitMatterTime = (): ITimeProps => {
  return {
    minDate: dayjs('2020-5-18').startOf('day'),
    maxDate: dayjs().add(2, 'year').endOf('year'),
    startTime: dayjs(),
    startTimeFullDay: 2,
    endTime: dayjs(),
    endTimeFullDay: 2,
    isSetTime: false,
    cur: dayjs()
  }
}

// 获取当前时间5分制
export const getCurOnMin = async () => {
  const curDate = await timeGetter.getDate()

  const cur = dayjs.unix(curDate)
  const min = cur.minute()

  cur.minute(min + (5 - (cur.minute() % 5))).startOf('minute')

  return cur
}

export const generateCalendarData = (
  month: Dayjs,
  today: Dayjs = dayjs(),
  isFully?: boolean
) => {
  const _month = dayjs(month)
  const _today = dayjs(today)

  //当月1号是星期几，用来计算第一周需要补多少空位，如1号为周三，需往前补2天
  const previousNum = _month.clone().date(1).day()
  const previous = getDays(_month, 'previous', _today, previousNum)

  //推入当月所有天，不需要管末尾是否空余
  const currentNum = _month.clone().daysInMonth()
  const current = getDays(_month, 'current', _today, currentNum)

  //获取当月最后一天，用来计算最后一周需要补多少空位，如30号为周四，需补3天(一周7天)
  //如果要求生成完全月份，需判断days的长度是否满足42天（7天 * 6周），如果是的话则补最多一周的数据

  //最多补6天，若周日为当前月最后一天，则补的话会多出一周来
  //非完全月不可直接用5周35天来计算末尾，因为28天的时候，28号一定无法抵达第六周
  let nextNum = Math.min(7 - _month.clone().endOf('month').day(), 6)

  //完全月需要补足不足42天的部分
  isFully && (nextNum += 42 - (previousNum + currentNum + nextNum))
  const next = getDays(_month, 'next', _today, nextNum)

  return ([] as ITimeDay[]).concat(previous, current, next)
}

// 详情显示规则
export const getDate_validity_date = (
  params: ITimeMatterSectionType = {},
  hide_year: boolean | null = false,
  hideWeek = false,
  hideSameMonth = false
): ITimeMatterSectionReturn => {
  const {
    start_time = 0,
    start_time_full_day,
    end_time = 0,
    end_time_full_day
  } = params

  let firstStr = ''
  let secondStr = ''
  let output = ''
  // 前半截输出，后半截输出
  let firstPartOutput = ''
  let secondPartOutput = ''

  if (!start_time && !end_time)
    return {
      output: '添加时间',
      firstPartOutput,
      secondPartOutput,
      noSetTime: true
    }

  const today = dayjs()

  function isSameDay(a: dayjs.Dayjs, b: dayjs.Dayjs) {
    const today_YYYYMMMMDD = a.format('YYYYMMDD')
    const time_YYYYMMMMDD = b.format('YYYYMMDD')

    return today_YYYYMMMMDD === time_YYYYMMMMDD
  }

  const start_YYYY = dayjs.unix(start_time).format('YYYY年')
  const end_YYYY = dayjs.unix(end_time).format('YYYY年')
  const today_YYYY = today.format('YYYY年')

  const start_MMDD = dayjs.unix(start_time).format('M月D日')
  let end_MMDD = dayjs.unix(end_time).format('M月D日')

  const isSameMonth =
    start_time &&
    end_time &&
    dayjs.unix(start_time).isSame(dayjs.unix(end_time), 'month')

  if (hideSameMonth && isSameMonth) {
    end_MMDD = dayjs.unix(end_time).format('D日')
  }

  const start_Week = !hideWeek
    ? `周${DAY_DICT[dayjs.unix(start_time).day()]}`
    : ''
  const end_Week = !hideWeek ? `周${DAY_DICT[dayjs.unix(end_time).day()]}` : ''

  // 年份 + 日期
  if (start_YYYY !== today_YYYY && !hide_year) {
    firstStr += start_YYYY
    firstStr += ' '
  }
  firstStr += start_MMDD

  if ((end_YYYY !== today_YYYY || end_YYYY !== start_YYYY) && !hide_year) {
    secondStr += end_YYYY
    secondStr += ' '
  }
  secondStr += end_MMDD

  // 周几 在最后拼接

  // 01 是开始全天 (单天全天)
  if (
    start_time_full_day === 2 &&
    start_time &&
    isSameDay(dayjs.unix(end_time), dayjs.unix(start_time))
  ) {
    output += firstStr
    output += ' '
    output += isSameDay(today, dayjs.unix(start_time)) ? '今天' : start_Week
    output += ' '
    output += '(全天)'
    firstPartOutput = output
    return { output, firstPartOutput, secondPartOutput }
  }
  // 02 连续全天
  if (start_time_full_day === 2 && end_time_full_day === 2) {
    output += firstStr
    output += ' '
    output += isSameDay(today, dayjs.unix(start_time)) ? '今天' : start_Week
    firstPartOutput = output

    output += ' - ' // +3 需要被裁掉
    output += secondStr
    output += ' '
    output += isSameDay(today, dayjs.unix(end_time)) ? '今天' : end_Week
    secondPartOutput = output.slice(firstPartOutput.length + 3, output.length)
    return { output, firstPartOutput, secondPartOutput }
  }
  // 03 仅，开始，非全天
  if (start_time_full_day !== 2 && start_time && !end_time) {
    output += firstStr
    output += ' '
    output += isSameDay(today, dayjs.unix(start_time)) ? '今天' : start_Week
    output += ' '
    output += dayjs.unix(start_time).format('HH:mm')
    output += ' 开始'
    firstPartOutput = output
    return { output, firstPartOutput, secondPartOutput }
  }
  // 04 仅，结束，非全天
  if (!start_time && end_time) {
    output += secondStr
    output += ' '
    output += isSameDay(today, dayjs.unix(end_time)) ? '今天' : end_Week
    output += ' '
    output += dayjs.unix(end_time).format('HH:mm')
    output += ' 截止'
    firstPartOutput = output
    return { output, firstPartOutput, secondPartOutput }
  }
  // 05有开始、有截止时间
  if (start_time && end_time) {
    output += firstStr
    output += ' '
    output += isSameDay(today, dayjs.unix(start_time)) ? '今天' : start_Week
    output += ' '
    output +=
      start_time_full_day === 2 ? '' : dayjs.unix(start_time).format('HH:mm')
    firstPartOutput = output

    output += ' - '
    if (!isSameDay(dayjs.unix(start_time), dayjs.unix(end_time))) {
      output += secondStr
      output += ' '
      output += isSameDay(today, dayjs.unix(end_time)) ? '今天' : end_Week
      output += ' '
    }

    output +=
      end_time_full_day === 2 ? '' : dayjs.unix(end_time).format('HH:mm')
    secondPartOutput = output.slice(firstPartOutput.length + 3, output.length)
    return { output, firstPartOutput, secondPartOutput }
  }

  return { output, firstPartOutput, secondPartOutput }
}

// 获取事项开始时间
export const getMatterStartTime = async (
  cur: Dayjs,
  data: { date?: number } = {}
) => {
  const { date } = data

  if (date) {
    // 带时间进入
    const _cur = cur.clone().startOf('day')
    const _date = dayjs.unix(date).clone().startOf('day')
    const dateIsAfterCur = _date.isSameOrAfter(_cur)
    if (!dateIsAfterCur) {
      // 未来日期设置为未来日上午9点
      return _date.hour(9).startOf('hour')
    }

    if (_date.isBefore(_cur)) {
      // 历史日
      return _date.hour(9).startOf('hour')
    }
  }
  let start = cur.clone()

  start = dayjs(start.minute(start.minute() + 30))

  if (start.date() !== cur.date()) {
    start.subtract(1, 'day')
  }
  return start
}

export const getTaskMatterEndTime = (
  date: Dayjs,
  task?: Pick<
    IScheduleTask,
    'start_time' | 'end_time' | 'end_time_full_day' | 'start_time_full_day'
  >
) => {
  if (!task) return date
  const taskEndFullDay = task && task.end_time_full_day === 2
  const { end_time } = task

  if (end_time) {
    const isStartFullDay =
      task.start_time_full_day === 2 &&
      dayjs.unix(task?.end_time || 0).second() === 59

    const end = dayjs.unix(end_time)

    if (isStartFullDay || taskEndFullDay) {
      return end
        .hour(date.hour())
        .minute(date.minute() + 30)
        .startOf('minute')
    }

    return end
  }

  return date
}

export const getTaskMatterStartTime = (
  date: Dayjs,
  task?: Pick<
    IScheduleTask,
    'start_time' | 'end_time' | 'end_time_full_day' | 'start_time_full_day'
  >
) => {
  if (!task) return date
  const taskStartFullDay = task && task.start_time_full_day === 2
  const { start_time, end_time } = task

  if (start_time) {
    const start = dayjs.unix(start_time)

    return taskStartFullDay
      ? start.hour(date.hour()).minute(date.minute())
      : start
  }
  // 如果只有截止， 就把开始并到截止
  if (!start_time && end_time) {
    return dayjs
      .unix(end_time)
      .hour(date.hour())
      .minute(date.minute())
      .startOf('minute')
  }

  return date
}

// 获取预置的提醒时间
export const getPresetRemindTime = (refDate: Dayjs, remindList: number[]) => {
  const data = remindList.map((t) => {
    if (t < 0) {
      switch (Math.abs(t)) {
        case 1090:
          return refDate
            .clone()
            .subtract(1, 'day')
            .hour(9)
            .startOf('hour')
            .unix()
        case 90:
          return refDate.clone().hour(9).startOf('hour').unix()
        case 18:
          return refDate.clone().hour(18).startOf('hour').unix()
        default:
          return 0
      }
    } else {
      return refDate.unix() - t
    }
  })

  return data.filter((t) => t > 0)
}

const getCustomRemindTime = (customRemindData: {
  remindList: { time: Dayjs }[]
  total: number
}) => {
  const { total, remindList } = customRemindData
  const list = remindList.map((t) => t.time.unix())

  return deleteUndefinedByObj({
    max_alone_total: total,
    alone_remind: remindList.length > 0 ? list : undefined
  })
}

/** 预定义时间提醒 前端转换成后端数据戳 */
export const presetRemindDataToTimeRemind = (
  remindData: [string[], string[]]
) => {
  const first = defaultSelector.startRemind.filter((item) =>
    remindData[0].find((t) => t === item.key)
  )

  const second = defaultSelector.endRemind.filter((item) =>
    remindData[1].find((t) => t === item.key)
  )

  return {
    startRemindTime: first.map((t) => t.timeOffSet),
    endRemindTime: second.map((t) => t.timeOffSet)
  }
}

// 获取提醒时间参数
export const getMatterRemindTime = ({
  presetData,
  time,
  customRemindData
}: {
  presetData: [string[], string[]]
  time: { start_time?: number; end_time?: number }
  customRemindData?: {
    remindList: { time: Dayjs }[]
    total: number
  }
}) => {
  const { startRemindTime, endRemindTime } =
    presetRemindDataToTimeRemind(presetData)
  const { start_time, end_time } = time
  const value: IScheduleTask['remind_at'] = {}

  if (startRemindTime) {
    const v = getPresetRemindTime(dayjs.unix(start_time!), startRemindTime)

    // 预置开始提醒
    v.length > 0 && (value.start_remind = v)
  }
  if (endRemindTime) {
    const v = getPresetRemindTime(dayjs.unix(end_time!), endRemindTime)

    // 预置截止提醒
    v.length > 0 && (value.end_remind = v)
  }

  if (customRemindData) {
    Object.assign(value, getCustomRemindTime(customRemindData))
  }

  return value
}

export const getMatterTimeParamsByTimeData = (timeData: ITimeProps) => {
  const value: Pick<
    IScheduleTask,
    'start_time_full_day' | 'end_time_full_day' | 'start_time' | 'end_time'
  > = {}

  const { startTime, endTime, startTimeFullDay, endTimeFullDay, isSetTime } =
    timeData

  const startFullDay = startTimeFullDay === 2
  const enFullDay = endTimeFullDay === 2

  const isSameDay = startTime.isSame(endTime, 'day')

  const isOnlyEndTime = isSameDay && !enFullDay && startFullDay // 只有截止时间的情况
  const isOnlyStartTime = isSameDay && enFullDay // 只有开始的情况

  if (isSetTime && !isOnlyEndTime) {
    value.start_time_full_day = startTimeFullDay
    value.start_time = startFullDay
      ? startTime.clone().startOf('day').unix()
      : startTime.unix()
  }

  if (isSetTime && !isOnlyStartTime) {
    value.end_time_full_day = endTimeFullDay
    value.end_time = enFullDay
      ? endTime.clone().endOf('day').unix()
      : endTime.unix()
  }

  if (startTimeFullDay === 2 && value.start_time && !value.end_time) {
    // 开始全天补截止
    value.end_time = startTime.clone().endOf('day').unix()
    value.end_time_full_day = 2 // 各端保持一致
  }

  return value
}

// 获取事项时间和提醒时间参数
export const getMatterTimeParams = (
  timeData: ITimeProps,
  remindData: [string[], string[]],
  customRemindData?: {
    remindList: { time: Dayjs }[]
    total: number
  }
) => {
  const value: ITimeParams = {
    remind_at: {}
  }

  Object.assign(value, getMatterTimeParamsByTimeData(timeData))

  Object.assign(
    value.remind_at || {},
    getMatterRemindTime({
      presetData: remindData,
      time: { ...value },
      customRemindData
    })
  )

  return value
}

export const getTimeKeys = (type: 'start' | 'end') => {
  const isStart = type === 'start'

  const keys: TimeKeys = {
    time: isStart ? 'startTime' : 'endTime',
    remindTime: isStart ? 'startRemindTime' : 'endRemindTime',
    noSetting: isStart ? 'startNoSetting' : 'endNoSetting',
    fullDay: isStart ? 'startTimeFullDay' : 'endTimeFullDay'
  }

  return keys
}
