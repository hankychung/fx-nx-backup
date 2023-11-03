import { IBffTaskDetail, IZustandDetail } from '@flyele-nx/types'
import { useTaskDetailStore } from '@flyele-nx/zustand-store'
import { produce } from 'immer'

class TaskDetailHandler {
  addTask(data: IBffTaskDetail) {
    useTaskDetailStore.setState(
      produce((state: IZustandDetail) => {
        state.cacheIds.push(data.task.task_id)
      })
    )
  }
}
