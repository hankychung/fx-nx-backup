import { produce } from 'immer'
import { useScheduleStore, IState } from './useScheduleStore'
import { IScheduleTask } from '@flyele-nx/service'

class TaskHandler {
  static modify({ key, diff }: { key: string; diff: Partial<IScheduleTask> }) {
    useScheduleStore.setState(
      produce((state: IState) => {
        state.taskDict[key] = {
          ...state.taskDict[key],
          ...diff
        }
      })
    )
  }
}

export { TaskHandler }
