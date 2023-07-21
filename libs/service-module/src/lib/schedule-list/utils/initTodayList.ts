import { QueryType } from '@flyele-nx/sql-store'
import { globalNxController } from '../../global/nxController'
import { useScheduleStore } from '../../store/useScheduleStore'
import timeGetter from '../../global/timeGetter'
import dayjs from 'dayjs'
import { ILocalTask } from '@flyele-nx/service'

export interface IInitTodayList {
  list: ILocalTask[]
  finishedList: ILocalTask[]
}

export const initTodayList = async (params?: IInitTodayList) => {
  const { batchUpdateTask, updateList } = useScheduleStore.getState()

  const date = dayjs.unix(timeGetter.getDateRoughly()).format('YYYY-MM-DD')

  const tasks =
    params?.list ||
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
    params?.finishedList ||
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
}
