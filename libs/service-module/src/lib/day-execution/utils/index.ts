import { IScheduleTask } from '@flyele-nx/service'
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

    // 区间时间
    if (start_time && end_time) {
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
    const timeA = dayjs(a.tTimeTxt, 'HH:mm')
    const timeB = dayjs(b.tTimeTxt, 'HH:mm')
    if (timeA.isBefore(timeB)) {
      return -1
    } else if (timeA.isAfter(timeB)) {
      return 1
    } else {
      return 0
    }
  })

  console.log('@@@ 看看 nx 的 temp', temp)
  return temp
}
