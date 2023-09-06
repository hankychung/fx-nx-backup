import { I18N } from '@flyele-nx/i18n'
import { useMemoizedFn } from 'ahooks'
import { IAction } from '../../../../../../context-menu/types'
import { IScheduleTask } from '@flyele-nx/types'
import {
  useUserInfoStore,
  globalNxController
} from '@flyele-nx/global-processor'
import { MatterType, MatterTypeLabel } from '@flyele-nx/constant'
import { timeGetter } from '@flyele-nx/utils'

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
      matterType === MatterType.meeting &&
      data.start_time &&
      (await timeGetter.getDate()) >= data.start_time
    ) {
      globalNxController.showMsg({
        msgType,
        content: I18N.common.meetingCanNotEditOnHasStarted
      })
      return
    }

    // 如果已完成
    if (data.finish_time) {
      let content = ''

      if (matterType === MatterType.meeting) {
        content =
          I18N.template?.(I18N.common.canNotEditOnEnd, {
            val1: MatterTypeLabel[matterType]
          }) || ''
      } else {
        content =
          I18N.template?.(I18N.common.canNotEditOnFinished, {
            val1: MatterTypeLabel[matterType]
          }) || ''
      }

      globalNxController.showMsg({
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
    txt: I18N.common.adjustingTheTime,
    callback: action,
    checkAction: true
  }
}
