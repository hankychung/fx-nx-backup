import { create } from 'zustand'
import { IScheduleTask } from '@flyele-nx/service'
import { produce } from 'immer'

interface IState {
  // 以下所有日期共用
  taskDict: { [k: string]: IScheduleTask }
  childrenDict: { [k: string]: string[] }
  // 以下与日期相关, 每个日期独立维护
  schedule: { [k: string]: string[] }
  expandedDict: {
    [k: string]: {
      [k: string]: boolean
    }
  }
}

interface IMutation {
  initList: (options: { date: string; list: string[] }) => void
  updateTask: (info: { key: string; task: IScheduleTask }) => void
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
     * 子事项字典
     */
    childrenDict: {},
    /**
     * 事项字典, key为事项id或事项id+repeadId, value为事项信息
     */
    taskDict: {},
    /**
     * 事项展开字典, key为日期, value为该日期下的事项收合字典
     */
    expandedDict: {},
    /**
     * 初始化/重置事项列表
     */
    initList({ date, list }) {
      set(
        produce((state: IState) => {
          state.schedule[date] = list
        })
      )
    },
    /**
     * 更新事项
     */
    updateTask({ key, task }) {
      set(
        produce((state: IState) => {
          state.taskDict[key] = task
        })
      )
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
