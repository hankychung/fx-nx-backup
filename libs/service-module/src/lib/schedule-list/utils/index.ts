import { IScheduleTask } from '@flyele-nx/service'
import dayjs from 'dayjs'
import { DateType } from '../typing'

function getKey(i: Pick<IScheduleTask, 'ref_task_id' | 'repeat_id'>) {
  return `${i.ref_task_id}-${i.repeat_id || ''}`
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

/**
 * 是否插入该日程的未完成列表
 */
function shouldInsertSchedule(options: { date: string; task: IScheduleTask }) {
  const { date, task } = options

  const { startTime, endTime } = getDecentTime(task)

  const dateStartUnix = dayjs(date).unix()

  const dateEndUnix = dayjs(date).add(1, 'day').unix() - 1

  const todayUnix = dayjs().unix()

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
  const startInFuture = startTime > dateEndUnix

  // 无开始时间的未来截止事项
  const onlyEndInFuture = !startTime && endTime > dateEndUnix

  const futureTask = startInFuture || onlyEndInFuture

  // 当日日期
  if (type === 'today') {
    return !futureTask
  }

  // 日期在该事项的时间区间内
  const duringTask =
    startTime &&
    endTime &&
    (startTime <= dateStartUnix || endTime >= dateEndUnix)

  // 未来日期
  return duringTask || futureTask
}

export { getKey, getChildrenDict, shouldInsertSchedule }
