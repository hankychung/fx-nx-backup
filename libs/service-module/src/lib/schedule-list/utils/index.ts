import { ILocalTask, IScheduleTask } from '@flyele-nx/types'
import { timeGetter } from '@flyele-nx/utils'
import dayjs, { Dayjs } from 'dayjs'
import { DateType } from '../typing'
import { getNowRepeatData, isAlwaysRepeat } from './loop/loopMatter'
import { loopStuff } from './loop/loopStuff'
import { useScheduleStore, zustandUtils } from '@flyele-nx/global-processor'
import { LOOP_MATTER_LABEL } from '@flyele-nx/constant'
import { I18N, isCN } from '@flyele-nx/i18n'
import { getEnFormat } from '@flyele-nx/utils'

const { resetState, getDiffKeys, getKey, getKeyOfList, getSortedSchedule } =
  zustandUtils

interface IGetRepeatDelayTotalParams {
  rawTask?: IScheduleTask
  userId: string
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
 * 中英文翻译转化
 * 截止
 */
const transitionDueOn = (dateStr: string, needSpace?: boolean) => {
  return isCN ? `${dateStr}${needSpace ? ' ' : ''}截止` : `Due on ${dateStr}`
}

const getRepeatTxt = async (task?: IScheduleTask) => {
  const _obj = {
    t_l: '',
    t_r: ''
  }

  if (!task) return _obj

  const { cycle, repeat_type, end_repeat_at } = task

  if (repeat_type) {
    _obj.t_l = `${LOOP_MATTER_LABEL[repeat_type as number]}`

    if (isAlwaysRepeat(end_repeat_at || 0)) {
      _obj.t_l += `、${I18N.common.forever}`
    } else {
      const time = dayjs.unix(end_repeat_at || 0)
      const YYYY = time.format('YYYY') !== dayjs().format('YYYY')
      const M_DD = getEnFormat(time, 'M月DD日', 'MMM D')

      const cnStr = `${YYYY ? time.format('YYYY年') : ''}${M_DD}`
      const enStr = `${M_DD}${YYYY ? time.format(', YYYY') : ''}`
      _obj.t_l += `、${transitionDueOn(isCN ? cnStr : enStr)}`
    }

    _obj.t_r = `${isCN ? '已循环' : 'Repeat:'}（${
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
  resetState()
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

function setTime(target: Dayjs, mod: Dayjs) {
  return target
    .set('hour', mod.get('hour'))
    .set('minute', mod.get('minute'))
    .set('second', mod.get('second'))
}

function setDate(target: Dayjs, mod: Dayjs) {
  return target
    .set('year', mod.year())
    .set('month', mod.month())
    .set('date', mod.date())
}

function getModifyTime(
  item: Pick<
    ILocalTask,
    'start_time' | 'end_time' | 'start_time_full_day' | 'end_time_full_day'
  >,
  date: Dayjs
): {
  start_time?: number
  end_time?: number
  start_time_full_day?: 1 | 2
  end_time_full_day?: 1 | 2
} {
  const {
    start_time = 0,
    end_time = 0,
    start_time_full_day,
    end_time_full_day
  } = item

  const sDj = dayjs.unix(start_time)
  const eDj = dayjs.unix(end_time)

  // 区间时间
  if (start_time && end_time) {
    const range = eDj.diff(sDj, 'days')
    const start_time = setTime(date, sDj).unix()
    const end_time = setTime(date, eDj).add(range, 'day').unix()

    return { start_time, end_time, start_time_full_day, end_time_full_day }
  }

  if (start_time) {
    return {
      start_time: setDate(sDj, date).unix()
    }
  }

  if (end_time) {
    return {
      end_time: setDate(eDj, date).unix()
    }
  }

  return {
    start_time: date.unix(),
    end_time: date.add(1, 'day').unix() - 1,
    start_time_full_day: 2,
    end_time_full_day: 2
  }
}

function resetRemindUnix(
  item: Pick<
    ILocalTask,
    'start_time' | 'end_time' | 'start_time_full_day' | 'end_time_full_day'
  >
): { remind_at: any } {
  const { start_time, end_time, start_time_full_day, end_time_full_day } = item

  const remind_at: any = {}

  if (start_time) {
    if (start_time_full_day === 1) {
      // 具体时间，在开始时间提醒
      remind_at.start_remind = [start_time]
    } else {
      // 全天，在开始当天9点提醒
      remind_at.start_remind = [dayjs.unix(start_time).set('hour', 9).unix()]
    }
  }

  if (end_time) {
    if (end_time_full_day === 1) {
      // 具体时间，在截止时间前15min提醒
      remind_at.end_remind = [
        dayjs.unix(end_time).subtract(15, 'minute').unix()
      ]
    } else if (!dayjs.unix(start_time!).isSame(dayjs.unix(end_time), 'date')) {
      // 全天，且结束与开始不在同一天，在截至当天9点提醒
      remind_at.end_remind = [dayjs.unix(end_time).set('hour', 9).unix()]
    }
  }

  return { remind_at }
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
  getInsertedFinishTasks,
  getKeyOfList,
  getModifyTime,
  resetRemindUnix
}
