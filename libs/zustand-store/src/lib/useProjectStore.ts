import { create } from 'zustand'
import { produce } from 'immer'
import { IFullViewTask } from '@flyele-nx/types'

export interface IProjectState {
  taskDict: { [k: string]: IFullViewTask }
  childrenDict: { [k: string]: string[] }
  taskList: string[]
  hoverId: string
  activeCell: string
  expandDict: { [k: string]: boolean }
}

interface IMutation {
  updateList: (options: { list: string[]; isInit?: boolean }) => void
  batchUpdateTask: (
    tasks: IFullViewTask[],
    options?: { isInit?: boolean }
  ) => {
    keys: string[]
  }
  // updateChildDict: (info: { parentKey: string; childrenIds: string[] }) => void
  batchUpdateChildDict: (info: { [k: string]: string[] }) => void
  batchUpdateHoverId: (id: string) => void
  batchUpdateActiveCell: (id: string) => void
}

const initGanttState: IProjectState = {
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
  activeCell: '',

  // 展开的事项字典
  expandDict: {}
}

const useProjectStore = create<IProjectState & IMutation>((set) => {
  return {
    ...initGanttState,
    /**
     * 初始化/更新事项列表
     */
    updateList({ list, isInit }) {
      set(
        produce((state: IProjectState) => {
          if (isInit) {
            state.taskList = list
          } else {
            state.taskList = [...state.taskList, ...list]
          }
        })
      )
    },
    /**
     * 批量更新事项字典
     * 循环事项只会出现一张卡片, 字典中不带repeat_id
     */
    batchUpdateTask(arr, options) {
      const keys: string[] = []

      set(
        produce((state: IProjectState) => {
          const dict: { [k: string]: IFullViewTask } = {}
          const taskDict = options?.isInit ? {} : state.taskDict

          arr.forEach((item) => {
            const { task_id } = item
            dict[task_id] = item
            keys.push(task_id)
          })

          state.taskDict = {
            ...taskDict,
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
    //     produce((state: IProjectState) => {
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

export { useProjectStore, initGanttState }
