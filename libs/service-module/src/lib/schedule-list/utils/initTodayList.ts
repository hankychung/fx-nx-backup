import { QueryType } from '@flyele-nx/sql-store'
import {
  globalNxController,
  useScheduleStore
} from '@flyele-nx/global-processor'
import { ILocalTask } from '@flyele-nx/types'

export interface IInitTodayList {
  tasks?: ILocalTask[]
  finishTasks?: ILocalTask[]
  date: string
}

export const initTodayList = async (params: IInitTodayList) => {
  const { batchUpdateTask, updateList } = useScheduleStore.getState()

  const { date } = params

  const tasks =
    params?.tasks ||
    (
      await globalNxController.getDayView({
        day: date,
        queryType: QueryType.participate
      })
    ).data.list ||
    []

  const { keys } = batchUpdateTask(tasks, { isFinished: false })

  updateList({
    date,
    list: keys,
    isInit: true,
    isFinished: false
  })

  const finishTasks =
    params?.finishTasks ||
    (
      await globalNxController.getDayView({
        day: date,
        queryType: QueryType.completed
      })
    ).data.list ||
    []

  const { keys: finishKeys } = batchUpdateTask(finishTasks, {
    isFinished: true
  })

  updateList({
    date,
    list: finishKeys,
    isInit: true,
    isFinished: true
  })

  useScheduleStore.setState({
    todayFinishCount: finishTasks.length || 0
  })

  return { today: { tasks, finishTasks } }
}
