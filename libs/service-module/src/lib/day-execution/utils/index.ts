import { ILocalTask, IScheduleTask } from '@flyele-nx/service'
import dayjs from 'dayjs'

export interface IScheduleTaskTime {
  tTime: number
  tTimeTxt: string
  taskItems: IScheduleTask[]
}

/**
 * todayArr 根据原数据生成的按日期排序的数组
 * toDayList当日数据源
 * _t1全天
 * _t2 启动时间
 * _t3 仅开始时间
 * _t4 仅截止时间
 * _t5 区间时间
 * 跨天的时间，如果是开始时间是今天 以开始时间
 * 如果开始时间不是今天的话，且 结束时间不是今日的话 取为 全天
 * 结束时间是今日的话，取结束时间
 * **/
export const disposalTodayList = (todayList: IScheduleTask[]) => {
  const temp: IScheduleTaskTime[] = []
  const updateArr = ({
    time,
    timeTxt,
    task
  }: {
    time: number
    timeTxt: string
    task: IScheduleTask
  }) => {
    const hasTimeIndex = temp.findIndex((item) => item.tTime === time)
    if (hasTimeIndex === -1) {
      temp.push({
        tTime: time,
        tTimeTxt: timeTxt,
        taskItems: [task]
      })
    } else {
      temp[hasTimeIndex].taskItems.push(task)
    }
  }

  todayList.forEach((e) => {
    const {
      start_time_full_day,
      end_time_full_day,
      start_time,
      end_time,
      execute_at,
      flow_step_id,
      create_at
    } = e

    // 如果是工作流
    if (flow_step_id && !e.start_time && !e.end_time) {
      updateArr({
        time: create_at,
        timeTxt: dayjs.unix(create_at).format('HH:mm'),
        task: e
      })
      return
    }

    // 全天
    if (start_time_full_day === 2 && end_time_full_day === 2) {
      updateArr({
        time: 0,
        timeTxt: '全天',
        task: e
      })
      return
    }

    // 启动时间
    if (execute_at) {
      updateArr({
        time: execute_at,
        timeTxt: dayjs.unix(execute_at).format('HH:mm'),
        task: e
      })
      return
    }

    // 仅开始时间
    if (start_time && !end_time) {
      updateArr({
        time: start_time,
        timeTxt: dayjs.unix(start_time).format('HH:mm'),
        task: e
      })
      return
    }

    // 仅截止时间
    if (!start_time && end_time) {
      updateArr({
        time: end_time,
        timeTxt: dayjs.unix(end_time).format('HH:mm'),
        task: e
      })
      return
    }

    if (start_time && end_time) {
      // 跨天事项
      if (!dayjs.unix(start_time).isSame(dayjs.unix(end_time), 'day')) {
        const startDay = dayjs.unix(start_time).startOf('day')
        const endDay = dayjs.unix(end_time).startOf('day')
        // 开始时间是今天
        if (startDay.isSame(dayjs().startOf('day'))) {
          updateArr({
            time: start_time,
            timeTxt: dayjs.unix(start_time).format('HH:mm'),
            task: e
          })
          return
        }
        // 开始时间不是今天且结束时间不是今天
        if (
          !startDay.isSame(dayjs().startOf('day')) &&
          !endDay.isSame(dayjs().startOf('day'))
        ) {
          updateArr({
            time: 0,
            timeTxt: '全天',
            task: e
          })
          return
        }
        // 结束时间是今天
        if (endDay.isSame(dayjs().startOf('day'))) {
          updateArr({
            time: end_time,
            timeTxt: dayjs.unix(end_time).format('HH:mm'),
            task: e
          })
          return
        }
      }

      // 区间时间
      updateArr({
        time: start_time,
        timeTxt: dayjs.unix(start_time).format('HH:mm'),
        task: e
      })
      return
    }
  })

  /**
   * 根据时间timeTxt排序
   * 全天排最后
   */
  temp.sort((a, b) => {
    if (a.tTimeTxt === '全天' && b.tTimeTxt !== '全天') {
      return 1
    }
    if (a.tTimeTxt !== '全天' && b.tTimeTxt === '全天') {
      return -1
    }
    if (a.tTimeTxt === '全天' && b.tTimeTxt === '全天') {
      return 0
    }
    const timeA = a.tTimeTxt.split(':')
    const timeB = b.tTimeTxt.split(':')
    const hourA = parseInt(timeA[0])
    const minuteA = parseInt(timeA[1])
    const hourB = parseInt(timeB[0])
    const minuteB = parseInt(timeB[1])
    if (hourA < hourB) {
      return -1
    } else if (hourA > hourB) {
      return 1
    } else {
      if (minuteA < minuteB) {
        return -1
      } else if (minuteA > minuteB) {
        return 1
      } else {
        return 0
      }
    }
  })

  return temp
}

/**
 * 判断是否要更新
 */
export const isUpdateList = (tasks: ILocalTask[]) => {
  const result: ILocalTask[] = []

  tasks.forEach((item) => {
    const { start_time, end_time, execute_at, flow_step_id, create_at } = item

    //如果是工作流
    const flowIsToday =
      !start_time && !end_time && dayjs().isSame(dayjs.unix(create_at), 'day')

    const startTimeToday = start_time
      ? dayjs().isSame(dayjs.unix(start_time), 'day')
      : false
    const endTimeToday = end_time
      ? dayjs().isSame(dayjs.unix(end_time), 'day')
      : false
    const executeAtToday = execute_at
      ? dayjs().isSame(dayjs.unix(execute_at), 'day')
      : false
    // 跨天
    const isCoverDay =
      start_time && end_time
        ? !dayjs.unix(start_time).isSame(dayjs.unix(end_time), 'day')
        : false

    /**
     * 事项是否需要更新
     * 是否今日
     * 是否跨天
     */
    const isUpdate = flow_step_id
      ? flowIsToday
      : startTimeToday || endTimeToday || executeAtToday || isCoverDay

    if (isUpdate) {
      result.push(item)
    }
  })

  return result
}
