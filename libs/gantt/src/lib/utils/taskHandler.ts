import { produce } from 'immer'
import { IGanState, useGanttStore } from '@flyele-nx/global-processor'
// import { ListHandler } from './listHandler'

import { IFullViewTask } from '@flyele-nx/types'
import { getKey } from '..'
// import { ExecutionHandler } from './executionHandler'

interface IReloadTasksParams {
  task: IFullViewTask[]
  id: string[]
}

type IGetBingoTasks = (task: IFullViewTask) => boolean

type ITaskModifier = (task: IFullViewTask) => IFullViewTask

function isTasks(a: any): a is IReloadTasksParams['task'] {
  return typeof a[0] !== 'string'
}

class TaskHandler {
  static reloadTasks<T extends keyof IReloadTasksParams>(
    type: T,
    val: IReloadTasksParams[T]
  ) {
    // 传入类型是ILocalTask, 先更新事项字典
    // if (isTasks(val)) {
    //   this.updateTaskDict(val)
    // }
    // const taskIds = isTasks(val)
    //   ? val.map((t) => t.ref_task_id)
    //   : (val as IReloadTasksParams['id'])
    // 从所有未完成/完成列表移除事项
    // ListHandler.removeTasks(taskIds)
    // 重新插入事项
    // ListHandler.insertTasksByConds(taskIds)
  }

  static allTasksModifier(handler: ITaskModifier) {
    const { taskDict } = useGanttStore.getState()

    this.tasksModifier(Object.keys(taskDict), handler)
  }

  static tasksModifier(taskIds: string[], handler: ITaskModifier) {
    const { taskDict } = useGanttStore.getState()

    console.log('NX inner modifier', taskIds, taskDict)

    // TODO: 循环事项的更新需要考虑
    useGanttStore.setState(
      produce((state: IGanState) => {
        taskIds.forEach((k) => {
          console.log('NX inner taker result', handler(taskDict[k]))
          if (state.taskDict[k]) {
            state.taskDict[k] = handler(taskDict[k])
          }
        })
      })
    )

    console.log('NX inner modifier end', useGanttStore.getState().taskDict)
  }

  static batchModify({
    keys,
    diff,
    keysWithRepeatIds
  }: {
    keys: string[]
    diff: Partial<IFullViewTask>
    keysWithRepeatIds?: string[]
  }) {
    const { taskDict } = useGanttStore.getState()

    const newTasks = keys.reduce<IFullViewTask[]>((list, key) => {
      const task = taskDict[key]

      if (task) {
        list.push({
          ...task,
          ...diff
        })
      }

      return list
    }, [])

    this.updateTaskDict(newTasks)

    // 完成/重启事项
    if ('finish_time' in diff) {
      if (diff.finish_time) {
        // 完成事项
        // ListHandler.batchComplete(keys)
      } else {
        // 重启事项
        // keysWithRepeatIds && ListHandler.batchReopen(keysWithRepeatIds)
      }

      return
    }

    // 修改时间, 重载数据
    if ('start_time' in diff || 'end_time' in diff || 'execute_at' in diff) {
      TaskHandler.reloadTasks('id', keys)
    }
  }

  // TODO: 循环事项共享数据更新
  private static updateTaskDict(tasks: IFullViewTask[]) {
    useGanttStore.setState(
      produce((state: IGanState) => {
        tasks.forEach((task) => {
          const { task_id, repeat_id } = task

          state.taskDict[task_id] = task

          if (repeat_id) {
            state.taskDict[getKey(task)] = task
          }
        })
      })
    )
  }

  //   /**
  //    * 用于 今日执行 同步事项数据
  //    * same_day 的接口
  //    */
  //   static updateTaskDictByExecution(tasks: ILocalTask[]) {
  //     this.updateTaskDict(tasks)
  //   }

  //   // 创建新事项
  //   static createTasks(tasks: ILocalTask[]) {
  //     this.updateTaskDict(tasks)
  //     ListHandler.insertOngoingTasks(tasks.map((t) => t.ref_task_id))
  //   }

  // 获取符合条件的所有事项
  static getTasksByCondition(handler: IGetBingoTasks) {
    const { taskDict } = useGanttStore.getState()

    const bingoTasks: IFullViewTask[] = []

    Object.entries(taskDict).forEach(([, task]) => {
      if (handler(task)) {
        bingoTasks.push(task)
      }
    })

    return { bingoTasks }
  }
}

export { TaskHandler }
