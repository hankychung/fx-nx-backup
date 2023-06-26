import { useMemoizedFn } from 'ahooks'
import { IAction } from '../../../../../../context-menu/types'
import { IScheduleTask, ScheduleTaskConst } from '@flyele-nx/service'
import { useUserInfoStore } from '../../../../../../store/useUserInfoStore'
import { showMsg } from '@flyele-nx/ui'
import { globalNxController } from '../../../../../../global/nxController'
import timeGetter from '../../../../../../global/timeGetter'

export const useMenuSelectTime = ({
  data
}: {
  data: IScheduleTask
}): IAction => {
  const userId = useUserInfoStore((state) => state.userInfo.user_id)

  const action = useMemoizedFn(async () => {
    const taskId = data.ref_task_id

    const msgType = '消息'
    const isCreator = data.creator_id === userId
    const matterType = data.matter_type
    const repeatType = data.repeat_type || 0

    // 如果是已经开始的会议
    if (
      matterType === ScheduleTaskConst.MatterType.meeting &&
      data.start_time &&
      (await timeGetter.getDate()) >= data.start_time
    ) {
      showMsg({
        msgType,
        content: '会议已开始，无法修改'
      })
      return
    }

    // 如果已完成
    if (data.finish_time) {
      let content = ''

      if (matterType === ScheduleTaskConst.MatterType.meeting) {
        content = `${ScheduleTaskConst.MatterType[matterType]}已结束，无法修改`
      } else {
        content = `${ScheduleTaskConst.MatterType[matterType]}已完成，无法修改`
      }

      showMsg({
        msgType,
        content
      })
      return
    }

    globalNxController.openEditTaskTime({
      taskId,
      task: data,
      isCreator,
      repeatType,
      matterType,
      remindAt: {
        ...data.remind_at,
        start_remind: data.remind_at?.start_remind
      }
    })
  })

  return {
    txt: '调整时间',
    callback: action,
    checkAction: true
  }
}
