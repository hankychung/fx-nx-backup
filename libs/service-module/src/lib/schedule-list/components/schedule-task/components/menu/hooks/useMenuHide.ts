import { useHide } from '../../../../../utils/hooks/useHide'
import { useMemoizedFn } from 'ahooks'
import { IScheduleTask } from '@flyele-nx/types'
import { IAction } from '../../../../../../context-menu/types'
import { TaskHandler } from '../../../../../utils/taskHandler'
import { globalNxController } from '@flyele-nx/global-processor'

export const useMenuHide = ({ data }: { data: IScheduleTask }): IAction => {
  const { hideOrShow } = useHide()

  const action = useMemoizedFn(() => {
    const taskId = data.ref_task_id
    const isHide = data.hide || data.schedule_hide
    const dispatch = data.dispatch_id
    const finishTime = data.finish_time || 0

    if (!dispatch) return

    hideOrShow({
      dispatch,
      id: taskId,
      finish: finishTime.toString(),
      child: data.has_child ? 'true' : '',
      show: isHide
    }).then(() => {
      !data.has_child &&
        globalNxController.showMsg({
          msgType: '消息',
          content: `已在日程中${isHide ? '显示' : '隐藏'}`
        })

      TaskHandler.removeTasks([taskId])
    })
  })

  return {
    txt: '日程隐藏',
    callback: action,
    checkAction: true
  }
}
