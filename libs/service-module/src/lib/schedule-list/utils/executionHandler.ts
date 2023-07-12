import { IScheduleTask } from '@flyele-nx/service'
import { IState, useScheduleStore } from '../../store/useScheduleStore'
import { produce } from 'immer'
import { getKey } from './index'
import { uniq } from 'lodash'

/**
 * 今日执行日程的控制类
 */
class ExecutionHandler {
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

        const ids = list.map((item) => {
          return getKey(item)
        })
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
}

export { ExecutionHandler }
