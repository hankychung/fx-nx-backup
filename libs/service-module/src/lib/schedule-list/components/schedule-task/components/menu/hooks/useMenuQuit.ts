import { useMemo } from 'react'
import { useMemoizedFn } from 'ahooks'
import { IScheduleTask, ScheduleTaskConst } from '@flyele-nx/service'
import { IAction } from '../../../../../../context-menu/types'

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

export const useMenuQuit = ({
  data,
  userId
}: {
  data: IScheduleTask
  userId: string
}): IAction => {
  const cancelTask = useCancelTask({ taskId: data.ref_task_id })
  const exitTask = useExitTask({ taskId: data.ref_task_id })
  const cancelTodo = useCancelTodo({ taskId: data.ref_task_id })
  const exitTodo = useExitTodo({ taskId: data.ref_task_id })
  const cancelMeeting = useCancelMeeting({ taskId: data.ref_task_id })
  const exitMeeting = useExitMeeting({ taskId: data.ref_task_id })

  const action = useMemoizedFn(async () => {
    const taskId = data.ref_task_id
    const isCreator = data.creator_id === userId

    switch (data.matter_type) {
      case ScheduleTaskConst.MatterType.matter:
        isCreator ? cancelTask(taskId) : exitTask(taskId)
        break
      case ScheduleTaskConst.MatterType.todo:
        isCreator ? cancelTodo(taskId) : exitTodo(taskId)
        break
      case ScheduleTaskConst.MatterType.meeting:
        isCreator ? cancelMeeting(taskId) : exitMeeting(taskId)
        break
      default:
    }
  })

  const quitText = useMemo(() => {
    const isCreator = data.creator_id === userId

    const first = isCreator ? '取消' : '退出'

    const last = ScheduleTaskConst.MatterTypeLabel[data.matter_type]

    // 兜底不显示 undefined
    return first + (last ?? '')
  }, [data.creator_id, data.matter_type, userId])

  return {
    txt: quitText,
    callback: action,
    checkAction: true
  }
}
