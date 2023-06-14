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

    // 完成事项
    if (diff.finish_time) {
      ListHandler.batchComplete(keys)
    }
  }
}

export { TaskHandler }
