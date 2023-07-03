import { produce } from 'immer'
import { useScheduleStore, IState } from '../../store/useScheduleStore'
import { IScheduleTask } from '@flyele-nx/service'
import { ListHandler } from './listHandler'
import { getKey, isRelated } from '.'
import { useUserInfoStore } from '../../store/useUserInfoStore'

interface IReloadTasksParams {
  task: IScheduleTask[]
  id: string[]
}

type IGetBingoTasks = (task: IScheduleTask) => boolean

type ITaskModifier = (task: IScheduleTask) => IScheduleTask

function isTasks(a: any): a is IReloadTasksParams['task'] {
  return typeof a[0] !== 'string'
}

class TaskHandler {
  static reloadTasks<T extends keyof IReloadTasksParams>(
    type: T,
    val: IReloadTasksParams[T]
  ) {
    if (isTasks(val)) {
      this.updateTaskDict(val)
    }

    const { schedule } = useScheduleStore.getState()

    const taskIds = isTasks(val)
      ? val.map((t) => t.ref_task_id)
      : (val as IReloadTasksParams['id'])

    // 从所有未完成列表移除事项
    useScheduleStore.setState(
      produce((state: IState) => {
        Object.entries(schedule).forEach(([date, keys]) => {
          if (isRelated(keys, taskIds)) {
            state.schedule[date] = keys.filter((k) => !taskIds.includes(k))
          }
        })
      })
    )

    ListHandler.insertTasks(taskIds)
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
    diff: Partial<IScheduleTask>
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
  private static updateTaskDict(tasks: IScheduleTask[]) {
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

  // 创建新事项
  static createTasks(tasks: IScheduleTask[]) {
    this.updateTaskDict(tasks)
    ListHandler.insertTasks(tasks.map((t) => t.ref_task_id))
  }

  // 获取符合条件的所有事项
  private static getTasksByCondition(handler: IGetBingoTasks) {
    const { taskDict } = useScheduleStore.getState()

    const bingoTasks: IScheduleTask[] = []

    Object.entries(taskDict).forEach(([, task]) => {
      if (handler(task)) {
        bingoTasks.push(task)
      }
    })

    return { bingoTasks }
  }

  // 删除符合条件的所有事项
  static removeTasksByConditions(handler: IGetBingoTasks) {
    const { bingoTasks } = this.getTasksByCondition(handler)

    ListHandler.removeTasks(bingoTasks.map((t) => t.ref_task_id))
  }
}

export { TaskHandler }
