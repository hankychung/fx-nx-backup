import { IScheduleTask, ScheduleTaskConst } from '@flyele-nx/service'
import dayjs from 'dayjs'
import { DateType } from '../typing'
import { getNowRepeatData, getRepeatTotal, isAlwaysRepeat } from './loopMatter'

interface IGetRepeatDelayTotalParams {
  rawTask?: IScheduleTask
  userId: string
}

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
    }/${await getRepeatTotal(task)}）`
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

export {
  getKey,
  getChildrenDict,
  shouldInsertSchedule,
  getRepeatTxt,
  getRepeatDelayTotal
}
