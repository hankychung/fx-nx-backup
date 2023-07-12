import { IScheduleTask, ScheduleTaskConst } from '@flyele-nx/service'
import dayjs, { Dayjs } from 'dayjs'
import { DateType } from '../typing'
import { getNowRepeatData, isAlwaysRepeat } from './loop/loopMatter'
import { loopStuff } from './loop/loopStuff'
import {
  useScheduleStore,
  initScheduleState
} from '../../store/useScheduleStore'
import timeGetter from '../../global/timeGetter'

type IScheduleTaskWithCompareVal = IScheduleTask & {
  compareVal: number
}

interface IGetRepeatDelayTotalParams {
  rawTask?: IScheduleTask
  userId: string
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

/**
 * 上级数量
 */
function getParentsCount(task: Pick<IScheduleTask, 'parent_id'>) {
  const { parent_id } = task

  if (!parent_id) return 0

  return parent_id.split(',').length
}

/**
 * 直属关系字典
 */
function getChildrenDict({
  tasks,
  childHandler,
  originalId
}: {
  tasks: IScheduleTask[]
  originalId: string
  childHandler?: (child: IScheduleTask) => void
}) {
  const dict: {
    [k: string]: string[]
  } = {}

  // 潜在父事项id字典
  const parentKey: { [k: string]: boolean } = { [originalId]: true }

  tasks
    .sort((a, b) => getParentsCount(a) - getParentsCount(b))
    .forEach((task) => {
      if (childHandler) {
        childHandler(task)
      }

      const { parent_id, ref_task_id } = task

      parentKey[ref_task_id] = true

      if (parent_id) {
        const parentIds = parent_id.split(',').reverse()

        for (const parentId of parentIds) {
          if (parentKey[parentId]) {
            if (!dict[parentId]) dict[parentId] = []

            dict[parentId].push(ref_task_id)

            return
          }
        }
      }
    })

  return dict
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

function getDateUnix(d: Dayjs) {
  return d.hour(0).minute(0).second(0).unix()
}

/**
 * 是否插入该日程的未完成列表
 */
function shouldInsertSchedule(options: { date: string; task: IScheduleTask }) {
  const { date, task } = options

  const { startTime, endTime } = getDecentTime(task)

  const dateStartUnix = dayjs(date).unix()

  const dateEndUnix = dayjs(date).add(1, 'day').unix() - 1

  const todayDj = dayjs.unix(timeGetter.getDateRoughly())

  const todayUnix = getDateUnix(todayDj)

  const todayEndUnix = getDateUnix(todayDj.add(1, 'day')) - 1

  // 当前日期类型
  const type: DateType =
    todayUnix === dateStartUnix
      ? 'today'
      : dateStartUnix > todayUnix
      ? 'future'
      : 'history'

  // 无时间事项不进入日程/不进入历史日程
  if ((!startTime && !endTime) || type === 'history') return false

  // 未来开始事项
  const startInFuture = startTime > todayEndUnix

  // 无开始时间的未来截止事项
  const onlyEndInFuture = !startTime && endTime > todayEndUnix

  const futureTask = startInFuture || onlyEndInFuture

  // 当日日期
  if (type === 'today') {
    return !futureTask
  }

  // 日期在该事项的时间区间内
  const duringTask =
    startTime && endTime && startTime <= dateStartUnix && endTime >= dateEndUnix

  // 未来开始无截止 且在当前选中日期
  const futureStart =
    startInFuture &&
    !endTime &&
    dayjs.unix(startTime).isSame(dayjs(date), 'date')

  // 未来截止无开始 且在当前选中日期
  const futureEnd =
    onlyEndInFuture && dayjs.unix(endTime).isSame(dayjs(date), 'date')

  // 未来日期
  return duringTask || futureStart || futureEnd
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

  return result
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

const getRepeatTxt = async (task?: IScheduleTask) => {
  const _obj = {
    t_l: '',
    t_r: ''
  }

  if (!task) return _obj

  const { cycle, repeat_type, end_repeat_at } = task

  if (repeat_type) {
    _obj.t_l = `${ScheduleTaskConst.LOOP_MATTER_LABEL[repeat_type as number]}`

    if (isAlwaysRepeat(end_repeat_at || 0)) {
      _obj.t_l += '、一直循环'
    } else {
      const YYYY =
        dayjs.unix(end_repeat_at || 0).format('YYYY') !== dayjs().format('YYYY')
      const M_DD = dayjs.unix(end_repeat_at || 0).format('M月DD日')

      _obj.t_l += `、${
        YYYY ? dayjs.unix(end_repeat_at || 0).format('YYYY年') : ''
      }${M_DD}截止`
    }

    _obj.t_r = `已循环（${
      cycle || getNowRepeatData(task)?.cycle || 0
    }/${await loopStuff.getRepeatTotal(task)}）`
  }
  return _obj
}

/**
 * 获取循环已延期的次数
 */
const getRepeatDelayTotal = ({
  rawTask,
  userId
}: IGetRepeatDelayTotalParams) => {
  let total = 0

  if (rawTask) {
    if (rawTask.repeat_delay_total === undefined) {
      if (rawTask.repeat_list) {
        const today = dayjs()

        const repeatDelayList = rawTask.repeat_list.filter((item) => {
          let selfFinish = false

          // 自己是否完成
          if (item.repeat_finishes && item.repeat_finishes.length > 0) {
            const findSelf = item.repeat_finishes.find(
              (e) => e.user_id === userId
            )

            selfFinish = !!findSelf
          }

          // 自己是否延期并且未完成(结束了，但是未完成)
          return (
            !selfFinish &&
            item.end_time &&
            dayjs.unix(item.end_time).isBefore(today)
          )
        })

        total = repeatDelayList.length || 0
      }
    } else {
      total = rawTask.repeat_delay_total || 0
    }
  }

  return total
}

function isRelated(a: string[], b: string[]) {
  for (const id of a) {
    if (b.includes(id)) {
      return true
    }
  }

  return false
}

function getTaskIdsByDispatch(dispatchIds: string[]) {
  const { taskDict } = useScheduleStore.getState()

  const taskIds: string[] = []

  Object.entries(taskDict).forEach(([k, task]) => {
    if (dispatchIds.includes(task.dispatch_id) && !k.includes('-')) {
      taskIds.push(k)
    }
  })

  return taskIds
}

function handleLogout() {
  useScheduleStore.setState(initScheduleState)
}

function getInsertedFinishTasks(taskIds: string[]) {
  const { taskDict } = useScheduleStore.getState()

  return {
    taskIds: taskIds
      .map((id) => taskDict[id])
      .filter((t) => t.finish_time)
      .map((t) => t.ref_task_id)
  }
}

export {
  getKey,
  getChildrenDict,
  shouldInsertSchedule,
  getRepeatTxt,
  getRepeatDelayTotal,
  getSortedSchedule,
  isRelated,
  getDiffKeys,
  getTaskIdsByDispatch,
  handleLogout,
  getInsertedFinishTasks
}
