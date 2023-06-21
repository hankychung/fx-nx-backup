import { produce } from 'immer'
import { useScheduleStore, IState } from '../../store/useScheduleStore'
import { IScheduleTask } from '@flyele-nx/service'
import { ListHandler } from './listHandler'
import { getKey } from '.'

class TaskHandler {
  static reloadTasks(tasks: IScheduleTask[]) {
    this.updateTaskDict(tasks)
  }

  static batchModify({
    keys,
    diff,
    keysWithRepeatIds
  }: {
    keys: string[]
    diff: Partial<IScheduleTask>
    keysWithRepeatIds: string[]
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
        ListHandler.batchReopen(keysWithRepeatIds)
      }

      return
    }

    // 置顶
    if ('topmost_at' in diff) {
      ListHandler.sortListByTask(keys)
    }
  }

  static removeTasks(ids: string[]) {
    useScheduleStore.setState(
      produce((state: IState) => {
        const { schedule, finishSchedule } = state

        Object.keys(schedule).forEach((date) => {
          state.schedule[date] = schedule[date].filter(
            (id) => !ids.includes(id)
          )

          state.finishSchedule[date] = finishSchedule[date].filter((id) => {
            for (const k of ids) {
              if (id.includes(k)) {
                return false
              }
            }

            return true
          })
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
}

export { TaskHandler }
