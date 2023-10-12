import { I18N, isCN } from '@flyele-nx/i18n'
import dayjs, { Dayjs } from 'dayjs'
import { IScheduleTask, Taker, RepeatList } from '@flyele-nx/types'
import { MatterType } from '@flyele-nx/constant'
import { getEnFormat } from '@flyele-nx/utils'

export type ITimeMatterSectionType = {
  start_time?: number // 开始时间
  start_time_full_day?: 1 | 2 // 开始是否为全天
  end_time?: number // 结束时间
  end_time_full_day?: 1 | 2 // 结束是否为全天

  flow_step_id?: string
  repeat_type?: number
}

// 事项时间格式化之后的输出格式
export type ITimeMatterSectionReturn = {
  output: string // 完成的时间格式输出
  delayTxt?: string // 延期信息
  firstPartOutput: string // 开始时间内容
  secondPartOutput: string // 结束时间内容
  noSetTime?: boolean // 是否未设置时间
}

/**
 * 提前时间转化所需的类型
 */
type TaskDateType = Pick<
  Partial<IScheduleTask>,
  | 'start_time'
  | 'end_time'
  | 'execute_at'
  | 'matter_type'
  | 'finish_time'
  | 'start_time_full_day'
  | 'end_time_full_day'
  | 'cycle'
  | 'takers'
>

interface TAddTakers {
  takers?: Taker[]
}

interface TAddRepeat {
  repeat_type?: number
  last_active_at?: number
}

function runConditions(cons: Map<() => boolean, () => any>) {
  for (const [c, callback] of cons.entries()) {
    if (c()) {
      return callback()
    }
  }
  return '未命中条件'
}

/**
 * 中英文翻译转化
 * 开始
 */
const transitionStartAt = (dateStr: string, needSpace?: boolean) => {
  return isCN ? `${dateStr}${needSpace ? ' ' : ''}开始` : `Start at ${dateStr}`
}

/**
 * 中英文翻译转化
 * 截止
 * isTime at 用于时间 on 用于日期
 */
const transitionDueAt = (
  dateStr: string,
  needSpace?: boolean,
  isTime?: boolean
) => {
  return isCN
    ? `${dateStr}${needSpace ? ' ' : ''}截止`
    : `Due ${isTime ? 'at' : 'on'} ${dateStr}`
}

const formatDate = (n: number) => getEnFormat(dayjs.unix(n), 'M月D日', 'MMM D')

const formatTime = (n: number, needAllDate?: boolean) => {
  const date = dayjs.unix(n)
  const isCurYear = dayjs().isSame(date, 'year')
  const formatRule = needAllDate
    ? `${isCurYear ? '' : 'YYYY年'}M月D日 H:mm`
    : 'H:mm'
  const formatRuleEn = needAllDate
    ? `MMM D${isCurYear ? '' : ', YYYY h:mm A'}`
    : 'h:mm A'

  return getEnFormat(dayjs.unix(n), formatRule, formatRuleEn)
}

export const formatDateWithYear = (n: number) => {
  const date = dayjs.unix(n)
  const isCurYear = dayjs().isSame(date, 'year')

  return getEnFormat(
    date,
    `${isCurYear ? '' : 'YYYY年'}M月D日`,
    `MMM D${isCurYear ? '' : ', YYYY'}`
  )
}

/** 判断两个时间是否是同一天 */
export const isSameDay = (a: Dayjs, b: Dayjs) => {
  const today_YYYYMMMMDD = a.format('YYYYMMDD')
  const time_YYYYMMMMDD = b.format('YYYYMMDD')

  return today_YYYYMMMMDD === time_YYYYMMMMDD
}

const dateRange = (
  s: number,
  e: number,
  options?: {
    startFull?: boolean
    endFull?: boolean
    today?: 'start' | 'end'
    selectDate?: Dayjs
    curTime?: Dayjs
    needAllDate?: boolean
  }
) => {
  const start = dayjs.unix(s)
  const end = dayjs.unix(e)

  if (start.isSame(end, 'date')) {
    return `${formatTime(s, options?.needAllDate)} - ${formatTime(e)}`
  }

  const isStartFull = options?.startFull

  const isEndFull = options?.endFull

  /**
   * 开始时间显示 "今天" 的规则
   * 开始时间为全天
   * 当前为开始时间
   * 开始时间是今天
   * 选中的日期也是今天
   */
  const todayStartFull =
    isStartFull &&
    options?.today === 'start' &&
    options?.curTime?.isSame(start, 'd') &&
    options?.selectDate?.isSame(options.curTime, 'd')

  /**
   * 结束时间显示 "今天" 的规则
   * 结束时间为全天
   * 当前为结束时间
   * 结束时间是今天
   * 选中的日期也是今天
   */
  const todayEndFull =
    isEndFull &&
    options?.today === 'end' &&
    options.curTime?.isSame(end, 'd') &&
    options?.selectDate?.isSame(options.curTime, 'd')

  function getTxt(txt: string, pos: 'start' | 'end') {
    if (!options) {
      return txt
    }

    if (
      (pos === 'start' && todayStartFull) ||
      (pos === 'end' && todayEndFull)
    ) {
      return I18N.common.todayWord
    }

    return txt
  }

  if (start.isSame(end, 'month')) {
    if (options?.needAllDate) {
      return `${getTxt(formatDateWithYear(s), 'start')} - ${getTxt(
        getEnFormat(end, 'D日', 'D'),
        'end'
      )}`
    }
    return `${getTxt(
      getEnFormat(start, 'M月D日', 'MMM D'),
      'start'
    )} - ${getTxt(getEnFormat(end, 'D日', 'D'), 'end')}`
  }

  if (start.isSame(end, 'year')) {
    if (options?.needAllDate) {
      return `${getTxt(formatDateWithYear(s), 'start')} - ${getTxt(
        formatDate(e),
        'end'
      )}`
    }
    return `${getTxt(formatDate(s), 'start')} - ${getTxt(formatDate(e), 'end')}`
  }

  if (s === 0) {
    return `${getTxt(getEnFormat(end, 'YYYY年M月D日', 'MMM D, YYYY'), 'end')}`
  }

  return `${getTxt(formatDate(s), 'start')} - ${getTxt(
    getEnFormat(end, 'YYYY年M月D日', 'MMM D, YYYY'),
    'end'
  )}`
}

// v1.6版本事项列表显示(简易)规则
export const getDate_validity_low_date = (
  params: ITimeMatterSectionType = {},
  options?: {
    notToday?: boolean
    curTime?: number
    needDelay?: boolean
    SameMonth?: boolean
  }
): ITimeMatterSectionReturn => {
  const {
    start_time = 0,
    start_time_full_day,
    end_time = 0,
    end_time_full_day,
    flow_step_id,
    repeat_type
  } = params

  const {
    notToday,
    curTime = 0,
    needDelay = false,
    SameMonth = false
  } = options || {}

  let firstStr = ''
  let secondStr = ''
  let output = ''
  // 前半截输出，后半截输出
  let firstPartOutput = ''
  let secondPartOutput = ''

  if (!start_time && !end_time)
    return {
      output:
        !flow_step_id && !repeat_type
          ? I18N.common.unscheduled
          : I18N.common.noTime, //新增待安排字段
      delayTxt: '',
      firstPartOutput,
      secondPartOutput,
      noSetTime: true
    }

  const today = dayjs()

  let delayTxt = ''

  if (needDelay && end_time && end_time < curTime && start_time < curTime) {
    delayTxt = I18N.common.delayed
  }

  const startDj = dayjs.unix(start_time)
  const start_YYYY = getEnFormat(startDj, 'YYYY年', 'YYYY')
  const endDj = dayjs.unix(end_time)
  const end_YYYY = getEnFormat(endDj, 'YYYY年', 'YYYY')
  const today_YYYY = getEnFormat(today, 'YYYY年', 'YYYY')

  const start_MMDD = getEnFormat(dayjs.unix(start_time), 'M月D日', 'MMM D')

  let end_MMDD_format = ''
  let end_MMDD_format_EN = ''
  if (
    SameMonth &&
    start_time &&
    startDj.isSame(startDj, 'month') &&
    !isSameDay(startDj, endDj)
  ) {
    end_MMDD_format = 'D日'
    end_MMDD_format_EN = 'D'
  } else {
    end_MMDD_format = 'M月D日'
    end_MMDD_format_EN = 'MMM D'
  }

  const end_MMDD = getEnFormat(
    dayjs.unix(end_time),
    end_MMDD_format,
    end_MMDD_format_EN
  )

  // 年份 + 日期
  if (start_YYYY !== today_YYYY) {
    firstStr += start_YYYY
    firstStr += ' '
  }
  firstStr += start_MMDD

  if (end_YYYY !== today_YYYY) {
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
    output +=
      !notToday && isSameDay(today, dayjs.unix(start_time))
        ? I18N.common.todayWord
        : firstStr
    output += ' '
    output += `(${I18N.common.all_day})`
    firstPartOutput = output
    return { output, delayTxt, firstPartOutput, secondPartOutput }
  }
  // 02 连续全天
  if (start_time_full_day === 2 && end_time_full_day === 2) {
    output += firstStr
    firstPartOutput = output

    output += ' - ' // +3 需要被裁掉
    output += secondStr
    secondPartOutput = output.slice(firstPartOutput.length + 3, output.length)
    return { output, delayTxt, firstPartOutput, secondPartOutput }
  }
  // 03 仅，开始，非全天
  if (start_time_full_day !== 2 && start_time && !end_time) {
    output += `${isCN ? '' : 'Start on '}`
    output += firstStr
    output += ' '
    output += dayjs.unix(start_time).format(isCN ? 'HH:mm' : 'h:mm A')
    output += `${isCN ? ' 开始' : ''}`
    firstPartOutput = output
    return { output, delayTxt, firstPartOutput, secondPartOutput }
  }
  // 04 仅，结束，非全天
  if (!start_time && end_time) {
    output += `${isCN ? '' : 'Due on '}`
    output += secondStr
    output += ' '
    output += dayjs.unix(end_time).format(isCN ? 'HH:mm' : 'h:mm A')
    output += `${isCN ? ' 截止' : ''}`
    firstPartOutput = output
    return { output, delayTxt, firstPartOutput, secondPartOutput }
  }

  // 如果开始时间和结束时间是在同一天, 且他们都不是整天
  if (
    end_time &&
    start_time &&
    start_time_full_day !== 2 &&
    end_time_full_day !== 2 &&
    firstStr === secondStr
  ) {
    output += firstStr
    output += ' '

    output += dayjs.unix(start_time).format(isCN ? 'HH:mm' : 'h:mm A')
    firstPartOutput = output

    output += ' - '
    output += dayjs.unix(end_time).format(isCN ? 'HH:mm' : 'h:mm A')
    secondPartOutput = dayjs.unix(end_time).format(isCN ? 'HH:mm' : 'h:mm A')

    return { output, delayTxt, firstPartOutput, secondPartOutput }
  }

  // 05有开始、有截止时间
  if (start_time && end_time) {
    output += firstStr
    output += ' '
    firstPartOutput = output

    output += ' - '
    output += secondStr
    output += ' '
    secondPartOutput = output.slice(firstPartOutput.length + 3, output.length)
    return { output, delayTxt, firstPartOutput, secondPartOutput }
  }

  return { output, delayTxt, firstPartOutput, secondPartOutput }
}

export const getScheduleDate = ({
  item,
  selectDate: _date,
  curTime: _curTime,
  isTeamSchedule,
  userId
}: {
  item: TaskDateType &
    TAddTakers &
    TAddRepeat & { repeat_list?: Array<RepeatList> }
  selectDate: number
  curTime: number
  isTeamSchedule?: boolean
  userId?: string
}): { txt: string; delayTxt?: string } => {
  const {
    start_time = 0,
    end_time = 0,
    execute_at,
    matter_type: matterType,
    finish_time,
    start_time_full_day,
    end_time_full_day,
    takers = []
  } = item

  const mySelf = takers.find((taker) => taker.taker_id === userId)
  const takersFinishedTime = mySelf ? mySelf.finish_time : undefined
  const finishTime = takersFinishedTime || finish_time

  const startTime = execute_at || start_time
  // 启动时间在截止时间之后，相当于无截止时间
  const endTime = startTime > end_time ? 0 : end_time
  const selectDate = dayjs.unix(_date)
  const isExecute = !!execute_at
  const startTimeDj = dayjs.unix(startTime)
  const endTimeDj = dayjs.unix(endTime)
  const startFull = start_time_full_day === 2
  const endFull = end_time_full_day === 2

  function delayStart() {
    return execute_at && end_time && execute_at > end_time
  }

  switch (matterType) {
    case MatterType.calendar:
    case MatterType.matter:
    case MatterType.todo: {
      // 已完成
      if (finishTime) {
        const { cycle } = item

        const txt =
          matterType === MatterType.calendar
            ? `${formatTime(finishTime, isTeamSchedule)} ${I18N.common.ended}`
            : item?.repeat_type && item?.repeat_type !== 0
            ? `${formatTime(finishTime, isTeamSchedule)} 完成所有循环`
            : `${formatTime(finishTime, isTeamSchedule)} ${
                I18N.common.completed
              }`
        const delayDays = Math.floor((finishTime - endTime) / (60 * 60 * 24))

        return {
          txt: cycle
            ? `${formatTime(finishTime, isTeamSchedule)} 完成第${cycle}次循环`
            : `${txt}${delayDays > 0 && endTime ? ` 延期${delayDays}天` : ''}`
        }
      }

      // 全天（未延期状态下显示）
      if (
        startFull &&
        startTimeDj.isSame(endTimeDj, 'date') &&
        endTime > _curTime &&
        !execute_at
      ) {
        if (isTeamSchedule) {
          return {
            txt: `${formatDateWithYear(startTime)}（${I18N.common.all_day}）`
          }
        }
        return { txt: I18N.common.all_day }
      }

      // 未完成
      const conds = new Map<
        () => boolean,
        () => { txt: string; delayTxt?: string }
      >([
        // 无截止时间/启动时间大于截止时间
        [
          () => !endTime,
          () => {
            // 有开始时间
            if (startTime) {
              const suffix = isCN ? (isExecute ? '启动' : '开始') : 'Start on'

              const getDelaytxt = () => {
                if (end_time && end_time < _curTime && startTime < _curTime) {
                  return I18N.common.delayed
                }

                return delayStart() ? I18N.common.delayedStart : ''
              }

              return {
                txt: `${
                  startTimeDj.isBefore(selectDate, 'date')
                    ? `${isCN ? '' : `${suffix} `} ${formatDateWithYear(
                        startTime
                      )} ${isTeamSchedule ? formatTime(startTime) : ''}`
                    : isTeamSchedule && startTimeDj.isAfter(selectDate, 'date')
                    ? `${isCN ? '' : `${suffix} `} ${formatDateWithYear(
                        startTime
                      )} ${formatTime(startTime)}`
                    : `${isCN ? '' : `Start at `}${formatTime(startTime)}`
                } ${isCN ? suffix : ''}`,
                delayTxt: getDelaytxt()
              }
            }
            // 无开始时间
            return {
              txt: ''
            }
          }
        ],
        // 截止时间在选中天
        [
          () => endTimeDj.isSame(selectDate, 'date'),
          () => {
            // 开始时间在选中天
            if (startTime && dayjs.unix(startTime).isSame(selectDate, 'date')) {
              return {
                txt: dateRange(startTime, endTime, {
                  needAllDate: isTeamSchedule
                }),
                delayTxt: endTime < _curTime ? I18N.common.delayed : ''
              }
            }

            // 有开始时间 & 选中天是全天事项
            if (startTime && endFull) {
              return {
                txt: dateRange(startTime, endTime, {
                  today: 'end',
                  startFull,
                  endFull,
                  selectDate,
                  curTime: dayjs.unix(_curTime)
                })
              }
            }

            // 无开始时间 / 选中天不是全天事项
            return {
              txt: `${
                isTeamSchedule ? `${formatDateWithYear(endTime)} ` : ''
              }${formatTime(endTime)} 截止${
                startTime ? ` (${dateRange(startTime, endTime)})` : ''
              }`,
              delayTxt: endTime < _curTime ? '已延期' : ''
            }
          }
        ],
        // 截止时间在历史
        [
          () => endTimeDj.isBefore(selectDate, 'date'),
          () => {
            const conds = new Map([
              // 无开始时间/开始时间与截止时间在同一天
              [
                () => !startTime || startTimeDj.isSame(endTimeDj, 'date'),
                () =>
                  `${transitionDueAt(
                    `${formatDateWithYear(endTime)} ${
                      isTeamSchedule ? formatTime(endTime) : ''
                    }`
                  )}`
              ],
              // 开始时间在选中天
              [
                () => !!startTime && startTimeDj.isSame(selectDate, 'date'),
                () => `${formatDateWithYear(startTime)} 启动`
              ],
              // 开始时间在历史
              [
                () => !!startTime && startTimeDj.isBefore(selectDate, 'date'),
                () =>
                  startTime > endTime
                    ? `${transitionDueAt(
                        `${formatDateWithYear(endTime)}`,
                        true
                      )}`
                    : dateRange(startTime, endTime, {
                        needAllDate: isTeamSchedule
                      })
              ]
            ])

            return {
              txt: runConditions(conds),
              delayTxt:
                startTime < _curTime
                  ? I18N.common.delayed
                  : I18N.common.delayedStart
            }
          }
        ],
        // 截止时间在未来
        [
          () => endTimeDj.isAfter(selectDate, 'date'),
          () => {
            // 全天事项
            const range = dateRange(startTime, endTime, {
              startFull,
              endFull,
              today: 'start',
              selectDate,
              curTime: dayjs.unix(_curTime),
              needAllDate: isTeamSchedule
            })

            if (
              startFull &&
              (!isExecute || !startTimeDj.isSame(selectDate, 'date'))
            ) {
              return { txt: range }
            }

            return {
              txt: startTimeDj.isSame(selectDate, 'date')
                ? isCN
                  ? `${formatTime(startTime)} ${
                      isExecute ? '启动' : '开始'
                    } (${dateRange(startTime, endTime)})`
                  : `${dateRange(startTime, endTime)} ${
                      isExecute ? 'Start at' : 'Start at'
                    } ${formatTime(startTime)}`
                : startTime === 0 && isTeamSchedule
                ? `${range} ${transitionDueAt(
                    formatTime(endTime),
                    false,
                    true
                  )}`
                : range,
              delayTxt: delayStart() ? I18N.common.delayedStart : ''
            }
          }
        ]
      ])

      return runConditions(conds)
    }

    case MatterType.meeting: {
      return {
        txt: `${dateRange(startTime, end_time, {
          needAllDate: isTeamSchedule
        })}${finishTime ? ` ${I18N.common.ended}` : ''}`
      }
    }

    case MatterType.timeCollect: {
      const conds = new Map([
        [() => !!finishTime, () => `${formatTime(end_time)} 已截止`],
        [
          () => startTimeDj.isSame(endTimeDj, 'date'),
          () => dateRange(startTime, endTime)
        ],
        [
          () => startTimeDj.isSame(selectDate, 'date'),
          () => `${transitionStartAt(`${formatTime(startTime)}`, true)}`
        ],
        [
          () => true,
          () => `${transitionDueAt(`${formatTime(endTime)}`, true, true)}`
        ]
      ])

      return {
        txt: runConditions(conds)
      }
    }

    case MatterType.notice: {
      const range = dateRange(startTime, endTime)

      const conds = new Map([
        [
          () => !!finishTime,
          () => `${formatTime(end_time)} ${I18N.common.ended}`
        ],
        [
          () => startTimeDj.isSame(selectDate, 'date'),
          () =>
            `${transitionStartAt(`${formatTime(startTime)}`, true)} (${range})`
        ],
        [
          () => endTimeDj.isSame(selectDate, 'date'),
          () =>
            `${
              isCN
                ? `${formatTime(endTime)} 结束`
                : `End at ${formatTime(endTime)}`
            } (${range})`
        ],
        [() => true, () => range]
      ])

      return {
        txt: runConditions(conds)
      }
    }

    default:
      return { txt: 'invalid matter type' }
  }
}
