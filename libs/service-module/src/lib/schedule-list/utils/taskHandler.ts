import { produce } from 'immer'
import { useScheduleStore, IState } from './useScheduleStore'
import { IScheduleTask } from '@flyele-nx/service'
import { ListHandler } from './listHandler'
import { getKey } from '.'

class TaskHandler {
  static batchModify({
    keys,
    diff
  }: {
    keys: string[]
    diff: Partial<IScheduleTask>
  }) {
    const taskRepeatIds: string[] = []
    const taskIds: string[] = []

    useScheduleStore.setState(
      produce((state: IState) => {
        keys.forEach((key) => {
          const task = state.taskDict[key]

          state.taskDict[key] = {
            ...task,
            ...diff
          }

          taskRepeatIds.push(task.repeat_id ? getKey(task) : task.ref_task_id)

          taskIds.push(task.ref_task_id)
        })
      })
    )

    // 完成事项
    if (diff.finish_time) {
      ListHandler.batchComplete({ taskIds: keys, taskRepeatIds })
    }
  }
}

export { TaskHandler }
