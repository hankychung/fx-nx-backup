import { create } from 'zustand'

import { produce } from 'immer'
import { IFullViewTask } from '@flyele-nx/types'
import { getKey } from './utils/gantt'

export interface IGanState {
  taskDict: { [k: string]: IFullViewTask }
  childrenDict: { [k: string]: string[] }
  taskList: string[]
  hoverId: string
  activeCell: string
}

interface IMutation {
  updateList: (options: { list: string[]; isInit?: boolean }) => void
  batchUpdateTask: (
    tasks: IFullViewTask[],
    options?: { isFinished?: boolean }
  ) => {
    keys: string[]
  }
  // updateChildDict: (info: { parentKey: string; childrenIds: string[] }) => void
  batchUpdateChildDict: (info: { [k: string]: string[] }) => void
  batchUpdateHoverId: (id: string) => void
  batchUpdateActiveCell: (id: string) => void
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
  taskDict: {},

  //悬浮id
  hoverId: '',

  //选中标题
  activeCell: ''
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
          state.taskList = list
        })
      )
    },
    /**
     * 批量更新事项字典
     */
    batchUpdateTask(arr, options) {
      const keys: string[] = []

      set(
        produce((state: IGanState) => {
          const dict: { [k: string]: IFullViewTask } = {}
          const { taskDict } = state
          arr.forEach((item) => {
            const { repeat_id, task_id } = item
            if (repeat_id) {
              const key = getKey(item)

              if (!taskDict[key]) {
                dict[key] = item
              }
            }
            dict[task_id] = item
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
    },
    batchUpdateHoverId(id) {
      set((state) => ({
        hoverId: id
      }))
    },
    batchUpdateActiveCell(id) {
      set((state) => ({
        activeCell: id
      }))
    }
  }
})

export { useGanttStore, initGanttState }
