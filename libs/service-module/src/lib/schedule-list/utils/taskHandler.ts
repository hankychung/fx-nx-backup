import { produce } from 'immer'
import { useScheduleStore, IState } from './useScheduleStore'
import { IScheduleTask } from '@flyele-nx/service'
import { ListHandler } from './listHandler'

class TaskHandler {
  static batchModify({
    keys,
    diff
  }: {
    keys: string[]
    diff: Partial<IScheduleTask>
    keysWithRepeatIds: string[]
  }) {
    useScheduleStore.setState(
      produce((state: IState) => {
        keys.forEach((key) => {
          const task = state.taskDict[key]

          state.taskDict[key] = {
            ...task,
            ...diff
          }
        })
      })
    )

    if ('finish_time' in diff) {
      if (diff.finish_time) {
        // 完成事项
        ListHandler.batchComplete(keys)
      } else {
        // 重启事项
      }
    }
  }
}

export { TaskHandler }
