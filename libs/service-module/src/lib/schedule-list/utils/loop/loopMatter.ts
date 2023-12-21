import { IScheduleTask, IRepeatConfig, IHoliday } from '@flyele-nx/types'
import dayjs, { Dayjs, ManipulateType } from 'dayjs'
import { cloneDeep, uniq } from 'lodash'
import isBetween from 'dayjs/plugin/isBetween'
import weekday from 'dayjs/plugin/weekday'
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'
import { getHoliday } from '../holiday'
import {
  RepeatConfigRepeatType,
  AlwaysFinishTime,
  LOOP_MATTER
} from '@flyele-nx/constant'
dayjs.extend(weekday)
dayjs.extend(isBetween)
dayjs.extend(isSameOrAfter)

interface INextLoopRule {
  time: Dayjs
  startTime: Dayjs
  finnishTime: Dayjs
  isFirst?: boolean
  firstTime?: Dayjs
  ignoreHoliday?: boolean
  realHolidays?: IHoliday[]
  dutyHoliday?: IHoliday[]
  repeat_config?: IRepeatConfig
}

interface ICheckHolidayMini {
  time: Dayjs
  finnishTime: Dayjs
  realHolidays: IHoliday[] // 真正的假期，通过总的那边filter出来的，去除补班的
  dutyHoliday: IHoliday[] // 补班的，通过总的那边filter出来的
}

interface ICheckHoliday extends ICheckHolidayMini {
  timeAmount?: number
  timeUnit?: ManipulateType
}

interface ICheckDateRepeatConfig extends ICheckHolidayMini {
  repeat_config: IRepeatConfig
  isFirst?: boolean
  ignoreHoliday?: boolean
}

interface IIsDateJump extends ICheckHolidayMini {
  time: Dayjs
  finnishTime: Dayjs
  repeat_date: number[] | string[]
  timeAmount: number
  timeUnit: ManipulateType
  ignoreHoliday?: boolean
}

// 是否是一直循环
export const isAlwaysRepeat = (finishTime: number) => {
  return finishTime === AlwaysFinishTime.value
}

// 获取当前循环数据
export const getNowRepeatData = (task: IScheduleTask) => {
  return task.repeat_list?.find?.((v) => v.repeat_id === task?.repeat_id)
}

export const getRepeatStartTime = (task: IScheduleTask) => {
  if (task.original_end_time) {
    return task.original_end_time
  }
  if (!task.start_time) {
    return task.create_at
  }
  const target = getNowRepeatData(task)

  if (target?.start_time === task.start_time) {
    if (task.repeat_list?.[0]) {
      return task.repeat_list[0].start_time || 0
    }
  }

  return task.start_time
}

function infoIsMoment(res: any): res is Dayjs {
  return !('isJumpAmount' in res)
}

/**
 * type 转换 timeUnit
 */
const repeatTypeToUnit = (repeat_type: RepeatConfigRepeatType) => {
  let timeUnit: ManipulateType = 'day'

  switch (repeat_type) {
    case RepeatConfigRepeatType.EVERY_DAY:
      timeUnit = 'day'
      break
    case RepeatConfigRepeatType.EVERY_WEEK:
      timeUnit = 'week'
      break
    case RepeatConfigRepeatType.EVERY_MONTH:
      timeUnit = 'month'
      break
    case RepeatConfigRepeatType.EVERY_YEAR:
      timeUnit = 'year'
      break
    default:
      break
  }

  return timeUnit
}

/**
 * 检查当前循环日期是否在节假日里面 （周末也算，但是周末要考虑是否 节假日补班的问题，所以引入了 dutyHoliday）
 * 如果是，则加一天，再判断是不是，如果是，继续判断
 * 如果不是，则返回日期
 * realHolidays 、 dutyHoliday 为什么不在函数里面处理呢，因为外层是有个 while 的，我不想在while函数里面重复处理这种数组的问题
 * 所以我就传入来使用
 */
const checkDateIsJumpHoliday = ({
  time,
  finnishTime,
  realHolidays,
  dutyHoliday
}: ICheckHolidayMini): boolean => {
  const timeDate = time.format('YYYY-MM-DD')
  const week = time.get('day')
  const nextWeeks = [6, 0, 7] // 关于周日：后端用 7 、 dayjs 用 0
  const isWeekday = nextWeeks.includes(week)
  const isMaxDate = time.isAfter(finnishTime, 'date') // 必须判断是否大于最后日期了，不然会一直循环下去超出日期
  let isJumpHoliday = false

  if (isWeekday) {
    isJumpHoliday =
      dutyHoliday.findIndex((item) => item.date === timeDate) === -1
  } else {
    isJumpHoliday =
      realHolidays.findIndex((item) => item.date === timeDate) !== -1
  }

  return isJumpHoliday && !isMaxDate
}

/**
 * 普通循环的检查节假日
 */
const checkDateAndReturnDate = ({
  time,
  finnishTime,
  realHolidays,
  dutyHoliday,
  timeAmount = 1,
  timeUnit = 'day'
}: ICheckHoliday): Dayjs => {
  const isJump = checkDateIsJumpHoliday({
    time,
    finnishTime,
    realHolidays,
    dutyHoliday
  })

  if (isJump) {
    return checkDateAndReturnDate({
      time: time.add(timeAmount, timeUnit),
      finnishTime,
      realHolidays,
      dutyHoliday,
      timeAmount,
      timeUnit
    })
  }

  return time
}

/**
 * 检查日期是否要往后跳
 * 检查是否在循环配置内
 * 检查是否节假日
 */
const isDateJump = ({
  time,
  finnishTime,
  repeat_date,
  timeAmount,
  timeUnit,
  realHolidays,
  dutyHoliday,
  ignoreHoliday = false
}: IIsDateJump): { date: Dayjs; isJumpAmount: boolean } => {
  const repeatDate = repeat_date || []
  const repeatDateLen = repeatDate.length

  let isJumpAmount = false

  if (repeatDateLen) {
    const isMaxDate = time.isAfter(finnishTime, 'day') // 必须判断是否大于最后日期了，不然会一直循环下去超出日期
    let date = time.get('date')
    let isJump = false

    if (timeUnit === 'week') {
      date = time.get('day')
      date = date === 0 ? 7 : date

      const lastDay =
        repeatDate[repeatDateLen - 1] === 7 ? 0 : repeatDate[repeatDateLen - 1]
      const targetDate = time.day(lastDay as number)

      isJump = !(repeatDate as number[]).includes(date)
      isJumpAmount = time.isSameOrAfter(targetDate, 'day') && timeAmount !== 1
    }

    if (timeUnit === 'month') {
      let cloneRepeatDate = cloneDeep(repeatDate) as number[]
      const lastMonthDate = time.endOf('month').get('date')
      const lastRepeatDateValue = Number(repeatDate[repeatDateLen - 1])
      const lastMonthNum = Math.min(lastRepeatDateValue, lastMonthDate)
      const targetDate = time.date(lastMonthNum)

      // 需求要的，如果用户选了31号，这个月又没有31号，那么就取这个月的最后一天
      if (lastRepeatDateValue > lastMonthNum) {
        cloneRepeatDate.push(lastMonthNum)
        cloneRepeatDate = uniq(cloneRepeatDate)
      }

      isJump = !cloneRepeatDate.includes(date)
      isJumpAmount = time.isSameOrAfter(targetDate, 'day') && timeAmount !== 1
    }

    if (ignoreHoliday && !isJump) {
      isJump = checkDateIsJumpHoliday({
        time,
        finnishTime,
        realHolidays,
        dutyHoliday
      })
    }

    if (!isMaxDate) {
      if (isJump) {
        if (isJumpAmount) {
          const newTime =
            timeUnit === 'week'
              ? time.add(timeAmount, timeUnit).weekday(1)
              : time.add(timeAmount, timeUnit).date(1)

          return isDateJump({
            time: newTime,
            repeat_date,
            timeAmount,
            timeUnit,
            finnishTime,
            realHolidays,
            dutyHoliday,
            ignoreHoliday
          })
        }

        return isDateJump({
          time: time.add(1, 'day'),
          repeat_date,
          timeAmount,
          timeUnit,
          finnishTime,
          realHolidays,
          dutyHoliday,
          ignoreHoliday
        })
      }
    }
  }

  return {
    date: time,
    isJumpAmount
  }
}

/**
 * 检查日期是否在自定义循环日期内
 * 如果不是 则 跳过
 */
const checkDateRepeatConfig = ({
  time,
  repeat_config,
  finnishTime,
  isFirst,
  ignoreHoliday = false,
  realHolidays,
  dutyHoliday
}: ICheckDateRepeatConfig) => {
  const { repeat_interval, repeat_type, repeat_date } = repeat_config

  if (!repeat_type) {
    return time
  }

  const timeAmount = repeat_interval || 0
  const timeUnit = repeatTypeToUnit(repeat_type)

  // 每周、每月
  if (
    [
      RepeatConfigRepeatType.EVERY_WEEK,
      RepeatConfigRepeatType.EVERY_MONTH
    ].includes(repeat_type)
  ) {
    return isDateJump({
      time: isFirst ? time : time.add(1, 'day'),
      repeat_date: repeat_date || [],
      timeAmount,
      timeUnit,
      finnishTime,
      ignoreHoliday,
      realHolidays,
      dutyHoliday
    })
  }
  // 每天、每年 不处理
  const jumpStart = isFirst ? time : time.add(timeAmount, timeUnit)

  if (ignoreHoliday) {
    return checkDateAndReturnDate({
      time: jumpStart,
      realHolidays,
      dutyHoliday,
      finnishTime,
      timeAmount,
      timeUnit
    })
  }
  return jumpStart
}

// 根据设定，一周的开始是0
export const nextLoopRule: {
  [k: string]: {
    getNext: (
      params: INextLoopRule
    ) => Dayjs | { date: Dayjs; isJumpAmount: boolean }
  }
} = {
  [LOOP_MATTER.noLoop]: {
    getNext: (params: INextLoopRule) => {
      return params.time
    }
  },
  [LOOP_MATTER.everDay]: {
    getNext: (params: INextLoopRule) => {
      const {
        time,
        finnishTime,
        isFirst,
        startTime,
        ignoreHoliday = false,
        realHolidays = [],
        dutyHoliday = []
      } = params

      // 事项开始时间在历史日
      if (time.isBefore(startTime, 'day')) {
        return startTime
      }

      let addTime = time

      if (!isFirst) {
        addTime = addTime.add(1, 'day')
      }

      if (ignoreHoliday) {
        return checkDateAndReturnDate({
          time: addTime,
          realHolidays,
          dutyHoliday,
          finnishTime
        })
      }
      return addTime
    }
  },
  [LOOP_MATTER.weekly]: {
    getNext: (params: INextLoopRule) => {
      const {
        time,
        finnishTime,
        isFirst,
        startTime,
        ignoreHoliday = false,
        realHolidays = [],
        dutyHoliday = []
      } = params

      // 事项开始时间在历史日
      if (time.isBefore(startTime, 'day')) {
        const week = time.get('day')

        // 事项开始时间与比对的时间为同一个星期则跳到下一个星期
        // 事项开始时间与比对时间不同星期但跳到周几小于比对时间则跳到下一个星期
        return startTime.isSame(time, 'week') ||
          startTime.day(week).isBefore(startTime, 'day')
          ? startTime.add(1, 'week').weekday(week)
          : startTime.day(week)
      }

      let addTime = time

      if (!isFirst) {
        addTime = addTime.add(1, 'week')
      }

      if (ignoreHoliday) {
        return checkDateAndReturnDate({
          time: addTime,
          finnishTime,
          realHolidays,
          dutyHoliday,
          timeUnit: 'week'
        })
      }
      return addTime
    }
  },
  [LOOP_MATTER.everyFortnight]: {
    getNext: (params: INextLoopRule) => {
      const {
        time,
        finnishTime,
        startTime,
        isFirst,
        ignoreHoliday = false,
        realHolidays = [],
        dutyHoliday = []
      } = params

      // 事项开始时间在历史日
      if (time.isBefore(startTime, 'day')) {
        return startTime.add(2, 'week').weekday(time.get('day'))
      }

      let addTime = time

      if (!isFirst) {
        addTime = addTime.add(2, 'week')
      }

      if (ignoreHoliday) {
        return checkDateAndReturnDate({
          time: addTime,
          realHolidays,
          dutyHoliday,
          timeAmount: 2,
          timeUnit: 'week',
          finnishTime
        })
      }
      return addTime
    }
  },
  [LOOP_MATTER.weekdays]: {
    // 工作日的规则 从2.2版本p2需求后 废除，改为自定义循环
    getNext: (params: INextLoopRule) => {
      const { time, startTime } = params

      const week = time.get('day')
      const nextWeeks = [5, 6]

      // 事项开始时间在历史日
      if (time.isBefore(startTime, 'date')) {
        const startWeek = startTime.get('day')

        // 比对时间在周六则跳到下周一
        return [6].includes(startWeek)
          ? startTime.add(1, 'week').weekday(1)
          : startTime
      }

      // 如果是周五周六，下一个工作日是下周一
      return nextWeeks.includes(week)
        ? time.add(1, 'week').weekday(1)
        : time.add(1, 'day')
    }
  },
  [LOOP_MATTER.nonWork]: {
    // 非工作日的规则 从2.2版本p2需求后 废除，改为自定义循环
    getNext: (params: INextLoopRule) => {
      const { time, startTime } = params

      const week = time.get('day')
      const weekdays = [1, 2, 3, 4, 5]

      // 事项开始时间在历史日
      if (time.isBefore(startTime, 'day')) {
        // 在工作日跳到周六，否则返回该时间
        return weekdays.includes(startTime.get('day'))
          ? startTime.weekday(6)
          : startTime
      }

      if (weekdays.includes(week)) {
        return time.weekday(6) // 工作日跳转到本周六
      }

      // 如果是周日则跳到下周六
      return week === 0 ? time.weekday(6) : time.add(1, 'day')
    }
  },
  [LOOP_MATTER.monthly]: {
    // 如果是月循环必传firstTime字段
    getNext: (params: INextLoopRule) => {
      const {
        time,
        finnishTime,
        startTime,
        isFirst,
        firstTime,
        ignoreHoliday = false,
        realHolidays = [],
        dutyHoliday = []
      } = params

      let date: Dayjs
      const _day = firstTime?.get('date') || 0

      if (time.isBefore(startTime, 'day')) {
        // 同月跳下月
        date = startTime.isSame(time, 'month')
          ? startTime.add(1, 'month')
          : startTime.date(_day)
      } else {
        let addTime = time

        if (!isFirst) {
          addTime = addTime.add(1, 'month')
        }

        if (ignoreHoliday) {
          date = checkDateAndReturnDate({
            time: addTime,
            realHolidays,
            dutyHoliday,
            timeUnit: 'month',
            finnishTime
          })
        } else {
          date = addTime
        }
      }

      if (_day > date.daysInMonth()) {
        date.endOf('month')
      } else {
        date.date(_day)
      }

      return date
    }
  },
  [LOOP_MATTER.custom]: {
    getNext: (params: INextLoopRule) => {
      const {
        time,
        finnishTime,
        startTime,
        ignoreHoliday = false,
        realHolidays = [],
        dutyHoliday = [],
        repeat_config,
        isFirst
      } = params

      // 事项开始时间在历史日
      if (time.isBefore(startTime, 'day')) {
        return startTime
      }

      let addTime: Dayjs | { date: Dayjs; isJumpAmount: boolean } = time

      if (repeat_config) {
        addTime = checkDateRepeatConfig({
          time: addTime,
          repeat_config,
          finnishTime,
          isFirst,
          ignoreHoliday,
          realHolidays,
          dutyHoliday
        })
      } else if (!isFirst) addTime = time.add(1, 'day')

      return addTime
    }
  }
}

/**
 * 获取循环的日期和次数
 * @param value
 */
export const getLoopDatesAndCount = (value: {
  startTime: number
  createAt: number
  finnishTime: number
  loopOpt: LOOP_MATTER
  ignoreHoliday?: boolean
  repeat_config?: IRepeatConfig
}) => {
  const {
    startTime,
    createAt,
    finnishTime,
    loopOpt,
    ignoreHoliday = false,
    repeat_config
  } = value
  const firstTime = dayjs.unix(startTime)

  const cycleDates: string[] = []

  const ignoreHolidayValue = !repeat_config
    ? ignoreHoliday
    : repeat_config.ignore_holiday === 1

  /** startTime 和 createAt 中选择后者作为 计算的开始时间 */
  const getStartTime = (startTime: number, createAt: number) => {
    const _startTime = dayjs.unix(startTime)
    const _createAt = dayjs.unix(createAt)

    return _startTime.isBefore(_createAt, 'day') ? _createAt : _startTime
  }

  const _startTime = getStartTime(startTime, createAt)

  // 结束时间小于循环的开始时间或者是不循环
  if (
    _startTime.isAfter(dayjs.unix(finnishTime), 'day') ||
    loopOpt === LOOP_MATTER.noLoop
  ) {
    return {
      cycleDates: [],
      count: 0
    }
  }

  let time = firstTime.clone()
  const _finnishTime = dayjs.unix(finnishTime)
  const { realHolidays, dutyHoliday } = getHoliday()

  const { getNext } = nextLoopRule[loopOpt]

  const timeAmount = repeat_config?.repeat_interval || 0
  const timeUnit = repeatTypeToUnit(
    repeat_config?.repeat_type || RepeatConfigRepeatType.EVERY_DAY
  )

  let isFirst = true

  const cloneRepeatConfig = cloneDeep(repeat_config)

  while (time.isBefore(_finnishTime, 'day')) {
    const info = getNext({
      time: time.clone(),
      startTime: _startTime.clone(),
      firstTime,
      ignoreHoliday: ignoreHolidayValue,
      realHolidays,
      dutyHoliday,
      isFirst,
      repeat_config: cloneRepeatConfig,
      finnishTime: _finnishTime
    })

    isFirst = false

    time = infoIsMoment(info) ? info : info.date

    if (time.isBetween(_startTime, _finnishTime, 'day', '[]')) {
      cycleDates.push(time.format('YYYY-MM-DD'))
    }

    const needGap = !infoIsMoment(info) && info.isJumpAmount && repeat_config

    if (needGap) {
      time =
        timeUnit === 'week'
          ? time.add(timeAmount, timeUnit).weekday(1)
          : time.add(timeAmount, timeUnit).date(1)

      isFirst = true
    }
  }

  return { count: cycleDates.length, cycleDates }
}
