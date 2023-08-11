import { IDashboardItem } from '@flyele-nx/types'
import { useUserInfoStore } from '@flyele-nx/zustand-store'

const convertToTask = (task: IDashboardItem) => {
  return {
    ...task,
    ref_task_id: task.task_id,
    state:
      task.takers.find(
        (i) => i.taker_id === useUserInfoStore.getState().userInfo.user_id
      )?.state || 0
  }
}

export { convertToTask }
