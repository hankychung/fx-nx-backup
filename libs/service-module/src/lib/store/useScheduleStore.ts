import { create } from 'zustand'
import { ILocalTask, IScheduleTask } from '@flyele-nx/service'
import { produce } from 'immer'
import { getKey, getSortedSchedule } from '../schedule-list/utils'

export interface IState {
  // 以下所有日期共用
  todayFinishCount: number
  taskDict: { [k: string]: ILocalTask }
  childrenDict: { [k: string]: string[] }
  // 以下与日期相关, 每个日期独立维护
  schedule: { [k: string]: string[] }
  finishSchedule: { [k: string]: string[] }
  expandedDict: {
    [k: string]: {
      [k: string]: boolean
    }
  }
  todayExecution: { [date: string]: string[] }
  todayCompletedExecution: { [date: string]: string[] }
  todayExecutionCount: {
    [date: string]: { completeTotal: number; total: number }
  }
}

interface IMutation {
  updateList: (options: {
    date: string
    list: string[]
    isInit?: boolean
    isFinished?: boolean
  }) => void
  batchUpdateTask: (
    tasks: ILocalTask[],
    options?: { isFinished?: boolean }
  ) => {
    keys: string[]
  }
  updateExpandedDict: (info: {
    date: string
    taskId: string
    isExpanded: boolean
  }) => void
  updateChildDict: (info: { parentKey: string; childrenIds: string[] }) => void
  batchUpdateChildDict: (info: { [k: string]: string[] }) => void
}

const useScheduleStore = create<IState & IMutation>((set) => {
  return {
    /**
     * 日程列表字典, key为日期, value为该日期下事项列表id数组(带排序)
     */
    schedule: {},
    /**
     * 日程已完成列表字典, key为日期, value为该日期下事项列表id数组(带排序)
     */
    finishSchedule: {},
    /**
     * 子事项字典
     */
    childrenDict: {},
    /**
     * 事项字典
     * key为taskId -> 普通事项/未完成的循环事项
     * key为taskId + repeatId -> 已完成的循环事项
     */
    taskDict: {},
    /**
     * 事项展开字典, key为日期, value为该日期下的事项收合字典
     */
    expandedDict: {},
    /**
     * 今日已完成数量
     */
    todayFinishCount: 0,
    /**
     * 当日事项 未完成列表数据 仅id
     * 具体数据 通过 taskDict 拿
     */
    todayExecution: {},
    /**
     * 当日事项 已完成列表数据 仅id
     * 具体数据 通过 taskDict 拿
     */
    todayCompletedExecution: {},
    /**
     * 当天事项 统计数据（未完成/已完成）的数量
     * 从接口返回出来的
     */
    todayExecutionCount: {},
    /**
     * 初始化/更新事项列表
     */
    updateList({ date, list, isInit, isFinished }) {
      console.log('NXupdateList', { date, list, isInit, isFinished })

      set(
        produce((state: IState) => {
          const { taskDict } = state

          if (isInit) {
            if (isFinished) {
              state.finishSchedule[date] = []
            } else {
              state.schedule[date] = []
            }
          }

          if (isFinished) {
            state.finishSchedule[date] = [
              ...state.finishSchedule[date],
              ...list
            ]
            return
          }

          state.schedule[date] = getSortedSchedule({
            date,
            tasks: [...state.schedule[date], ...list].map((id) => taskDict[id])
          })
        })
      )
    },
    /**
     * 批量更新事项字典
     */
    batchUpdateTask(arr, options) {
      const keys: string[] = []

      const isFinished = options?.isFinished

      set(
        produce((state: IState) => {
          const dict: { [k: string]: ILocalTask } = {}

          arr.forEach((item) => {
            const { ref_task_id, repeat_id, finish_time } = item
            if (repeat_id) {
              const key = getKey(item)

              dict[key] = item
            }

            if (finish_time) {
              keys.push(getKey(item))
            } else {
              keys.push(item.ref_task_id)
            }

            if (isFinished && repeat_id) {
              // do nothing
              // 不写入纯ref_task_id字典
            } else {
              dict[ref_task_id] = item
            }
          })

          state.taskDict = {
            ...state.taskDict,
            ...dict
          }
        })
      )

      return { keys }
    },
    /**
     * 更新对应日期下的事项展开字典
     */
    updateExpandedDict({ date, taskId, isExpanded }) {
      set(
        produce((state: IState) => {
          if (!state.expandedDict[date]) state.expandedDict[date] = {}

          state.expandedDict[date][taskId] = isExpanded
        })
      )
    },
    /**
     * 更新直属下级事项字典
     */
    updateChildDict({ parentKey, childrenIds }) {
      set(
        produce((state: IState) => {
          state.childrenDict[parentKey] = childrenIds
        })
      )
    },
    /**
     * 批量更新直属下级事项字典
     */
    batchUpdateChildDict(info) {
      set((state) => ({
        childrenDict: {
          ...state.childrenDict,
          ...info
        }
      }))
    }
  }
})

export { useScheduleStore }
