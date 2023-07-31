import { create } from 'zustand'

import { produce } from 'immer'
import { Task } from '@flyele-nx/types'
import { getKey } from './utils/gantt'

export interface IGanState {
  taskDict: { [k: string]: Task }
  childrenDict: { [k: string]: string[] }
  taskList: string[]
}

interface IMutation {
  updateList: (options: { list: string[]; isInit?: boolean }) => void
  batchUpdateTask: (
    tasks: Task[],
    options?: { isFinished?: boolean }
  ) => {
    keys: string[]
  }
  // updateChildDict: (info: { parentKey: string; childrenIds: string[] }) => void
  batchUpdateChildDict: (info: { [k: string]: string[] }) => void
}

const initGanttState: IGanState = {
  /**
   * 数据
   */
  taskList: [],
  /**
   * 子事项字典
   */
  childrenDict: {},
  /**
   * 事项字典
   * key为taskId -> 普通事项/未完成的循环事项
   * key为taskId + repeatId -> 已完成的循环事项
   */
  taskDict: {}
}

const useGanttStore = create<IGanState & IMutation>((set) => {
  return {
    ...initGanttState,
    /**
     * 初始化/更新事项列表
     */
    updateList({ list, isInit }) {
      set(
        produce((state: IGanState) => {
          state.taskList = []
        })
      )
    },
    /**
     * 批量更新事项字典
     */
    batchUpdateTask(arr, options) {
      const keys: string[] = []

      // const isFinished = options?.isFinished

      set(
        produce((state: IGanState) => {
          const dict: { [k: string]: Task } = {}

          arr.forEach((item) => {
            const { repeat_id } = item
            if (repeat_id) {
              const key = getKey(item)

              dict[key] = item
            }

            keys.push(getKey(item))
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
     * 更新直属下级事项字典
     */
    // updateChildDict({ parentKey, childrenIds }) {
    //   set(
    //     produce((state: IGanState) => {
    //       state.childrenDict[parentKey] = childrenIds
    //     })
    //   )
    // },
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

export { useGanttStore, initGanttState }
