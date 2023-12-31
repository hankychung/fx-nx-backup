import { I18N } from '@flyele-nx/i18n'
import { useMemo } from 'react'
import { useMemoizedFn } from 'ahooks'
import { IScheduleTask } from '@flyele-nx/types'
import { IAction } from '../../../../../../context-menu/types'
import { useUserInfoStore } from '@flyele-nx/global-processor'

/**
 * 取消相关hooks
 */
import { useCancelTask } from '../../../../../utils/hooks/useCancelTask'
import { useCancelTodo } from '../../../../../utils/hooks/useCancelTodo'
import { useCancelMeeting } from '../../../../../utils/hooks/useCancelMeeting'

/**
 * 退出相关hooks
 */
import { useExitTask } from '../../../../../utils/hooks/useExitTask'
import { useExitTodo } from '../../../../../utils/hooks/useExitTodo'
import { useExitMeeting } from '../../../../../utils/hooks/useExitMeeting'
import { MatterType, MatterTypeLabel } from '@flyele-nx/constant'
import { globalInfoHandler } from '@flyele-nx/zustand-handler'

export const useMenuQuit = ({
  data,
  isVipWin
}: {
  data: IScheduleTask
  isVipWin: boolean
}): IAction => {
  const userId = useUserInfoStore((state) => state.userInfo.user_id)

  const cancelTask = useCancelTask({ taskId: data.ref_task_id, isVipWin })
  const exitTask = useExitTask({ taskId: data.ref_task_id, isVipWin })
  const cancelTodo = useCancelTodo({ taskId: data.ref_task_id, isVipWin })
  const exitTodo = useExitTodo({ taskId: data.ref_task_id, isVipWin })
  const cancelMeeting = useCancelMeeting({ taskId: data.ref_task_id, isVipWin })
  const exitMeeting = useExitMeeting({ taskId: data.ref_task_id, isVipWin })

  const action = useMemoizedFn(async () => {
    const taskId = data.ref_task_id
    const isCreator = data.creator_id === userId

    switch (data.matter_type) {
      case MatterType.matter:
        isCreator ? cancelTask(taskId) : exitTask(taskId)
        break
      case MatterType.todo:
        isCreator ? cancelTodo(taskId) : exitTodo(taskId)
        break
      case MatterType.meeting:
        isCreator ? cancelMeeting(taskId) : exitMeeting(taskId)
        break
      default:
    }
  })

  const quitText = useMemo(() => {
    const isCreator = data.creator_id === userId

    const first = isCreator ? I18N.common.cancel : I18N.common.quit

    const last = MatterTypeLabel[data.matter_type]

    const blankSpace = globalInfoHandler.langIsCn() ? '' : ' '

    // 兜底不显示 undefined
    return first + blankSpace + (last ?? '')
  }, [data.creator_id, data.matter_type, userId])

  return {
    txt: quitText,
    callback: action,
    checkAction: true
  }
}
