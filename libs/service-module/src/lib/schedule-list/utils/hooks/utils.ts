import { ScheduleTaskConst, TaskDispatchApi } from '@flyele-nx/service'

/**
 * 取消事项 / 会议 / 代办
 */
export const cancelTask = async ({
  dispatch_id,
  state = ScheduleTaskConst.CANCEL_TASK_STATE.DEFAULT
}: {
  dispatch_id: string
  state?: ScheduleTaskConst.CANCEL_TASK_STATE
}) => {
  try {
    await TaskDispatchApi.setFinishedState({
      dispatch_id,
      state
    })
    return true
  } catch (err) {
    return false
  }
}
