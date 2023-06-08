import { produce } from 'immer'
import { IScheduleTask } from '@flyele-nx/service'
import { IState, useScheduleStore } from './useScheduleStore'
import dayjs from 'dayjs'
import { shouldInsertSchedule } from '.'

class ListHandler {
  static insertTask(task: IScheduleTask) {
    const { schedule, finishSchedule } = useScheduleStore.getState()

    const { finish_time: finishTime } = task

    // 插入进完成列表
    if (finishTime) {
      const date = dayjs.unix(finishTime).format('YYYY-MM-DD')

      if (finishSchedule[date]) {
        // 存在该日期, 插入
        useScheduleStore.setState(
          produce((state: IState) => {
            state.finishSchedule[date].push(task.ref_task_id)
          })
        )
      }

      return
    }

    // 插入进未完成列表
    const insertDates = Object.keys(schedule).filter((date) =>
      shouldInsertSchedule({ date, task })
    )

    console.log('insertDates', insertDates)
  }
}

export { ListHandler }
