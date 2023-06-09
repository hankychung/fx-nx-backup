import { produce } from 'immer'
import { IScheduleTask } from '@flyele-nx/service'
import { IState, useScheduleStore } from './useScheduleStore'
import dayjs from 'dayjs'
import { getKey, shouldInsertSchedule } from '.'

class ListHandler {
  private static insertTask(task: IScheduleTask) {
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

  static batchComplete(taskIds: string[]) {
    // 从未完成列表移除已完成事项
    this.removeTasks(taskIds)

    // 重置已完成事项的上下级关系
    const { needResetChildren, clearChildrenIds } = this.resetRelation(taskIds)

    this.resetSuper(needResetChildren)

    this.clearChildren(clearChildrenIds)

    // 将已完成事项插入完成列表
    this.insertCompleteTasks(taskIds)
  }

  private static resetRelation(taskIds: string[]) {
    const { childrenDict } = useScheduleStore.getState()
    const needResetChildren: string[] = []
    const clearChildrenIds: string[] = []

    useScheduleStore.setState(
      produce((state: IState) => {
        taskIds.forEach((taskId) => {
          // 找到该事项所属父事项字典, 脱离关系
          Object.entries(childrenDict).forEach(([key, children]) => {
            if (children.includes(taskId)) {
              state.childrenDict[key] = children.filter((i) => i !== taskId)

              // 清除后无子事项需要更新父事项的收合状态
              if (!state.childrenDict[key].length) {
                delete state.childrenDict[key]
                clearChildrenIds.push(key)
              }
            }
          })

          if (childrenDict[taskId]) {
            // 记录该事项下的子事项, 用于重新分配其上级
            needResetChildren.push(...childrenDict[taskId])
            // 删除该事项下的子事项关系
            delete state.childrenDict[taskId]
          }
        })
      })
    )

    return { needResetChildren, clearChildrenIds }
  }

  // 父事项下的子事项已经全部不在, 更新父事项的has_child以及清除收合状态
  private static clearChildren(ids: string[]) {
    if (!ids.length) return

    useScheduleStore.setState(
      produce((state: IState) => {
        ids.forEach((key) => {
          state.taskDict[key].has_child = false

          Object.entries(state.expandedDict).forEach(([date, dict]) => {
            if (dict[key]) {
              delete state.expandedDict[date][key]
            }
          })
        })
      })
    )
  }

  // 从未完成列表批量移除事项
  private static removeTasks(taskIds: string[]) {
    const { schedule } = useScheduleStore.getState()

    useScheduleStore.setState(
      produce((state: IState) => {
        Object.entries(schedule).forEach(([date, list]) => {
          state.schedule[date] = list.filter((i) => !taskIds.includes(i))
        })
      })
    )
  }

  // 批量将事项插入已完成列表
  private static insertCompleteTasks(ids: string[]) {
    const finishDate = dayjs().format('YYYY-MM-DD')

    const { finishSchedule, taskDict } = useScheduleStore.getState()

    const insertKeys = ids.map((id) => {
      const task = taskDict[id]

      return task.repeat_id ? getKey(task) : task.ref_task_id
    })

    useScheduleStore.setState(
      produce((state: IState) => {
        if (finishSchedule[finishDate]) {
          state.finishSchedule[finishDate].push(...insertKeys)
        }
      })
    )
  }

  // 重新分配子事项的直属上级
  private static resetSuper(ids: string[]) {
    const { childrenDict, taskDict } = useScheduleStore.getState()

    const children = ids.map((k) => taskDict[k])

    useScheduleStore.setState(
      produce((state: IState) => {
        children.forEach(({ parent_id, ref_task_id }) => {
          if (!parent_id) return

          // 沿子事项的parentId逐级向上找
          for (const parent of parent_id.split(',').reverse()) {
            if (childrenDict[parent]) {
              state.childrenDict[parent].push(ref_task_id)

              return
            }
          }
        })
      })
    )
  }
}

export { ListHandler }
