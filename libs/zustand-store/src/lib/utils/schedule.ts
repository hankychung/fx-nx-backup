import { ILocalTask, IScheduleTask } from '@flyele-nx/types'
import dayjs from 'dayjs'

type IScheduleTaskWithCompareVal = IScheduleTask & {
  compareVal: number
}

const sortFn = (
  a: IScheduleTaskWithCompareVal,
  b: IScheduleTaskWithCompareVal
) => {
  if (a.compareVal === b.compareVal) {
    return a.create_at - b.create_at
  }

  return a.topmost_at && !a.finish_time
    ? b.compareVal - a.compareVal
    : a.compareVal - b.compareVal
}

/**
 * 获取日程中用于计算排序规则的时间
 */
function getDecentTime(task: IScheduleTask) {
  const { start_time = 0, end_time = 0, execute_at = 0 } = task

  // 有启动时间则替换开始时间
  const startTime = execute_at || start_time

  // 启动时间在截止时间之后, 则变成只有启动时间的事项
  const endTime = execute_at > end_time ? 0 : end_time

  return {
    startTime,
    endTime
  }
}

function getKey(i: Pick<IScheduleTask, 'ref_task_id' | 'repeat_id'>) {
  return i.repeat_id ? `${i.ref_task_id}-${i.repeat_id}` : i.ref_task_id
}

function getDiffKeys(arr: Pick<IScheduleTask, 'ref_task_id' | 'repeat_id'>[]) {
  return arr.reduce<{ keys: string[]; keysWithRepeatIds: string[] }>(
    (pre, cur) => {
      pre.keys.push(cur.ref_task_id)

      pre.keysWithRepeatIds.push(getKey(cur))

      return pre
    },
    { keys: [], keysWithRepeatIds: [] }
  )
}

function getKeyOfList(task: ILocalTask) {
  return task.finish_time ? getKey(task) : task.ref_task_id
}

/**
 * 日程排序规则
 */
function getSortedSchedule(params: { date: string; tasks: IScheduleTask[] }) {
  const pin: IScheduleTaskWithCompareVal[] = []

  /**
   * 今天有明确时间
   * 1、今天某个时间点开始
   * 2、今天某个时间点截止
   */
  const precise: IScheduleTaskWithCompareVal[] = []

  /**
   * 今天无明确时间
   * 1、历史开始，今天全天截止
   * 2、今天全天
   * 3、历史开始，未来截止
   * 4、今天全天开始，未来截止
   */
  const unclear: IScheduleTaskWithCompareVal[] = []

  /**
   * 已延期
   * 1、有截止时间（包括全天），截止时间后未完成
   */
  const delay: IScheduleTaskWithCompareVal[] = []

  /**
   * 流转到当天事项
   * 1、历史开始，无截止
   */
  const startInHistory: IScheduleTaskWithCompareVal[] = []

  const { date, tasks } = params

  const theDate = dayjs(date)

  const today = dayjs()

  tasks.forEach((task) => {
    const { start_time_full_day, end_time_full_day, finish_time, topmost_at } =
      task
    const { startTime, endTime } = getDecentTime(task)
    const startDj = dayjs.unix(startTime)
    const endDj = dayjs.unix(endTime)
    const startFull = start_time_full_day === 2
    const endFull = end_time_full_day === 2

    // 置顶事项
    if (topmost_at && !finish_time) {
      pin.push({ ...task, compareVal: topmost_at })
      return
    }

    // 延期事项
    if (endTime && endDj.isBefore(today, 'date')) {
      delay.push({ ...task, compareVal: endTime })
      return
    }

    // 在该日期有明确时间
    if (
      (startDj.isSame(theDate, 'date') && !startFull) ||
      (endDj.isSame(theDate, 'date') && !endFull)
    ) {
      precise.push({ ...task, compareVal: startTime || endTime })
      return
    }

    // 无明确时间
    if (startTime && endTime) {
      unclear.push({ ...task, compareVal: endTime })
      return
    }

    // 流转到该日期
    startInHistory.push({ ...task, compareVal: startTime })
  })

  const all = [pin, precise, unclear, delay, startInHistory]

  const result = all.reduce<string[]>((arr, tasks) => {
    arr.push(...tasks.sort(sortFn).map((task) => task.ref_task_id))

    return arr
  }, [])

  const decentList = [...new Set(result)]

  console.log('[nx] local list', result, decentList)

  return decentList
}

export { getDiffKeys, getKey, getKeyOfList, getSortedSchedule }
