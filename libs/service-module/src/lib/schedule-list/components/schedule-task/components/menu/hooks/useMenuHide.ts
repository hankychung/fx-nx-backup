import { I18N } from '@flyele-nx/i18n'
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
          content: I18N.template?.(I18N.common.alreadyOnSchedule, {
            val1: isHide ? I18N.common.show : I18N.common.hide
          })
        })

      TaskHandler.removeTasks([taskId])
    })
  })

  return {
    txt: I18N.common.hide,
    callback: action,
    checkAction: true
  }
}
