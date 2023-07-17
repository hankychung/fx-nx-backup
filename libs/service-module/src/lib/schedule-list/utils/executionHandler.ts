import { ILocalTask, IScheduleTask } from '@flyele-nx/service'
import { IState, useScheduleStore } from '../../store/useScheduleStore'
import { produce } from 'immer'
import { getKeyOfList } from './index'
import { uniq } from 'lodash'
import { globalNxController } from '../../global/nxController'
import { QueryType, TabType } from '@flyele-nx/sql-store'
import { getDateOfToday } from './tools'
import { isUpdateList } from '../../day-execution/utils'

/**
 * 今日执行日程的控制类
 */
class ExecutionHandler {
  static day = ''

  /**
   * 更新列表
   */
  static updateList({
    date,
    list,
    isInit,
    isFinished
  }: {
    date: string
    list: IScheduleTask[]
    isInit?: boolean
    isFinished?: boolean
  }) {
    useScheduleStore.setState(
      produce((state: IState) => {
        if (isInit) {
          if (isFinished) {
            state.todayCompletedExecution[date] = []
          } else {
            state.todayExecution[date] = []
          }
        }

        const ids = list.map(getKeyOfList)

        if (isFinished) {
          state.todayCompletedExecution[date] = uniq([
            ...state.todayCompletedExecution[date],
            ...ids
          ])
        } else {
          state.todayExecution[date] = uniq([
            ...state.todayExecution[date],
            ...ids
          ])
        }
      })
    )
  }

  /**
   * 更新统计数量
   */
  static updateCount({
    date,
    data,
    isFinished
  }: {
    date: string
    isFinished: boolean
    data: number
  }) {
    useScheduleStore.setState(
      produce((state: IState) => {
        if (!state.todayExecutionCount[date]) {
          state.todayExecutionCount[date] = {
            completeTotal: 0,
            total: 0
          }
        }
        if (isFinished) {
          state.todayExecutionCount[date].completeTotal = data
        } else {
          state.todayExecutionCount[date].total = data
        }
      })
    )
  }

  /**
   * 请求列表
   */
  static async getList({ isFinished = false }: { isFinished?: boolean }) {
    const {
      data: { list, total }
    } = await globalNxController.getDayView({
      day: ExecutionHandler.day,
      queryType: isFinished ? QueryType.completed : QueryType.participate,
      tabType: TabType.TODAY
    })

    ExecutionHandler.updateList({
      date: ExecutionHandler.day,
      list: list,
      isInit: true,
      isFinished: isFinished
    })
    ExecutionHandler.updateCount({
      date: ExecutionHandler.day,
      isFinished: isFinished,
      data: total || 0
    })

    return { list, total }
  }

  /**
   * 重新加载列表
   * 未完成 和 已完成
   */
  static async reloadList() {
    await ExecutionHandler.getList({ isFinished: false })
    await ExecutionHandler.getList({ isFinished: true })
  }

  /**
   * 创建新事项
   */
  static createTasks(tasks: ILocalTask[]) {
    const updateList = isUpdateList(tasks)
    if (updateList.length) {
      ExecutionHandler.updateList({
        date: ExecutionHandler.day,
        list: updateList,
        isInit: false,
        isFinished: false
      })
      useScheduleStore.setState(
        produce((state: IState) => {
          state.todayExecutionCount[ExecutionHandler.day].total =
            state.todayExecutionCount[ExecutionHandler.day].total +
            updateList.length
        })
      )
    }
  }

  /**
   * 移除事项
   * 从所有未完成/完成列表移除事项
   */
  static removeTasks(
    ids: string[],
    options?: {
      type?: 'todayExecution' | 'todayCompletedExecution'
    }
  ) {
    const type = options?.type

    if (!type) {
      this.removeTasks(ids, { type: 'todayCompletedExecution' })
      this.removeTasks(ids, { type: 'todayExecution' })
      return
    }

    const { todayExecution, todayCompletedExecution } =
      useScheduleStore.getState()
    const l =
      type === 'todayCompletedExecution'
        ? todayCompletedExecution
        : todayExecution

    useScheduleStore.setState(
      produce((state: IState) => {
        Object.entries(l).forEach(([date, list]) => {
          const updatedList = list.filter((i) => !ids.includes(i))

          state[type][date] = updatedList

          if (date === getDateOfToday()) {
            const len = updatedList.length
            if (type === 'todayCompletedExecution') {
              state.todayExecutionCount[date].completeTotal = len
            } else {
              state.todayExecutionCount[date].total = len
            }
          }
        })
      })
    )
  }
}

export { ExecutionHandler }
