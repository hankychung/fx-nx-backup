import { produce } from 'immer'
import { useScheduleStore, IState } from '../../store/useScheduleStore'
import { ListHandler } from './listHandler'
import { getKey } from '.'
import { useUserInfoStore } from '../../store/useUserInfoStore'
import { ILocalTask } from '@flyele-nx/service'

interface IReloadTasksParams {
  task: ILocalTask[]
  id: string[]
}

type IGetBingoTasks = (task: ILocalTask) => boolean

type ITaskModifier = (task: ILocalTask) => ILocalTask

function isTasks(a: any): a is IReloadTasksParams['task'] {
  return typeof a[0] !== 'string'
}

class TaskHandler {
  static reloadTasks<T extends keyof IReloadTasksParams>(
    type: T,
    val: IReloadTasksParams[T]
  ) {
    // 传入类型是ILocalTask, 先更新事项字典
    if (isTasks(val)) {
      this.updateTaskDict(val)
    }

    const taskIds = isTasks(val)
      ? val.map((t) => t.ref_task_id)
      : (val as IReloadTasksParams['id'])

    // 从所有未完成/完成列表移除事项
    ListHandler.removeTasks(taskIds)

    // 重新插入事项
    ListHandler.insertTasksByConds(taskIds)
  }

  static allTasksModifier(handler: ITaskModifier) {
    const { taskDict } = useScheduleStore.getState()

    this.tasksModifier(Object.keys(taskDict), handler)
  }

  static tasksModifier(taskIds: string[], handler: ITaskModifier) {
    const { taskDict } = useScheduleStore.getState()

    console.log('NX inner modifier', taskIds, taskDict)

    // TODO: 循环事项的更新需要考虑
    useScheduleStore.setState(
      produce((state: IState) => {
        taskIds.forEach((k) => {
          console.log('NX inner taker result', handler(taskDict[k]))
          state.taskDict[k] = handler(taskDict[k])
        })
      })
    )

    console.log('NX inner modifier end', useScheduleStore.getState().taskDict)
  }

  static batchModify({
    keys,
    diff,
    keysWithRepeatIds
  }: {
    keys: string[]
    diff: Partial<ILocalTask>
    keysWithRepeatIds?: string[]
  }) {
    const { taskDict } = useScheduleStore.getState()

    const newTasks = keys.map((key) => {
      const task = taskDict[key]

      return {
        ...task,
        ...diff
      }
    })

    this.updateTaskDict(newTasks)

    // 完成/重启事项
    if ('finish_time' in diff) {
      if (diff.finish_time) {
        // 完成事项
        ListHandler.batchComplete(keys)
      } else {
        // 重启事项
        keysWithRepeatIds && ListHandler.batchReopen(keysWithRepeatIds)
      }

      return
    }

    // 置顶
    if ('topmost_at' in diff) {
      ListHandler.sortListByTask(keys)
      return
    }

    // 修改时间, 重载数据
    if ('start_time' in diff || 'end_time' in diff || 'execute_at' in diff) {
      TaskHandler.reloadTasks('id', keys)
    }
  }

  static removeTakers({
    taskIds,
    takerIds
  }: {
    takerIds: string[]
    taskIds: string[]
  }) {
    const { user_id } = useUserInfoStore.getState().userInfo

    if (takerIds.includes(user_id)) {
      this.removeTasks(taskIds)

      return
    }

    useScheduleStore.setState(
      produce((state: IState) => {
        const { taskDict } = state

        taskIds.forEach((id) => {
          const takers = taskDict[id].takers || []

          taskDict[id].takers = takers.filter(
            (t) => !takerIds.includes(t.taker_id)
          )
        })
      })
    )
  }

  static removeTasks(ids: string[]) {
    useScheduleStore.setState(
      produce((state: IState) => {
        const { schedule, finishSchedule } = state

        Object.keys(schedule).forEach((date) => {
          if (state.schedule[date]) {
            state.schedule[date] = schedule[date].filter(
              (id) => !ids.includes(id)
            )
          }

          if (state.finishSchedule[date]) {
            state.finishSchedule[date] = finishSchedule[date].filter((id) => {
              for (const k of ids) {
                if (id.includes(k)) {
                  return false
                }
              }

              return true
            })
          }
        })
      })
    )
  }

  // TODO: 循环事项共享数据更新
  private static updateTaskDict(tasks: ILocalTask[]) {
    useScheduleStore.setState(
      produce((state: IState) => {
        tasks.forEach((task) => {
          const { ref_task_id, repeat_id } = task

          state.taskDict[ref_task_id] = task

          if (repeat_id) {
            state.taskDict[getKey(task)] = task
          }
        })
      })
    )
  }

  /**
   * 用于 今日执行 同步事项数据
   * same_day 的接口
   */
  static updateTaskDictByExecution(tasks: ILocalTask[]) {
    this.updateTaskDict(tasks)
  }

  // 创建新事项
  static createTasks(tasks: ILocalTask[]) {
    this.updateTaskDict(tasks)
    ListHandler.insertOngoingTasks(tasks.map((t) => t.ref_task_id))
  }

  // 获取符合条件的所有事项
  static getTasksByCondition(handler: IGetBingoTasks) {
    const { taskDict } = useScheduleStore.getState()

    const bingoTasks: ILocalTask[] = []

    Object.entries(taskDict).forEach(([, task]) => {
      if (handler(task)) {
        bingoTasks.push(task)
      }
    })

    return { bingoTasks }
  }

  // 删除符合条件的所有事项
  static removeTasksByCondition(handler: IGetBingoTasks) {
    const { bingoTasks } = this.getTasksByCondition(handler)

    ListHandler.removeTasks(bingoTasks.map((t) => t.ref_task_id))
  }

  // 获取事项信息
  static getTask({ taskId, repeatId }: { taskId: string; repeatId?: string }) {
    const { taskDict } = useScheduleStore.getState()

    return taskDict[getKey({ ref_task_id: taskId, repeat_id: repeatId })]
  }

  // 获取所有事项
  static getTaskDict() {
    return useScheduleStore.getState().taskDict
  }
}

export { TaskHandler }
