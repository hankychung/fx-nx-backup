import { I18N } from '@flyele-nx/i18n'
import { AlertWithOkAndCancel } from '@flyele-nx/ui'
import {
  useScheduleStore,
  globalNxController
} from '@flyele-nx/global-processor'
import { useMemoizedFn } from 'ahooks'
import { cancelTask } from './utils'
import { TaskHandler } from '../taskHandler'
import { Pub, SIZE_TYPE_KEY } from '@flyele-nx/constant'
import { CANCEL_TASK_STATE } from '@flyele-nx/constant'

/**
 * 用于退出代办的hook，外部给taskId，其余逻辑在这里完成
 *
 * 确认框提示信息
 * 确认按钮文案
 * 取消按钮文案
 * 执行回调
 * 这些东西目前不需要，需要的时候可以随时扩展
 */
export const useCancelMeeting = ({
  taskId,
  isVipWin
}: {
  taskId: string
  isVipWin: boolean
}) => {
  const data = useScheduleStore((state) => state.taskDict[taskId])

  // 检查是否为挂件
  const forVipSmallWin = () => {
    if (isVipWin) {
      globalNxController.ipcRendererInvoke('vipSmallToolsWin-siszable-reset')
    }
  }

  /**
   * 执行取消操作，这是内部方法，弹窗在下面
   */
  const doActionCancelMeeting = useMemoizedFn(async (taskId: string) => {
    const dispatch_id = data?.dispatch_id

    const result = await cancelTask({
      dispatch_id,
      state: CANCEL_TASK_STATE.CANCEL_MEETING
    })
    if (result) {
      globalNxController.pubJsPublish(Pub.DELETE_MATTER_ITEM, [taskId])

      globalNxController.pubJsPublish(Pub.DB_INCREASE_01_READUX_AND_SQLITEDB, {
        task_id: taskId, // ↓ 需要更新的部分差量数据
        diffObj: {
          task_dispatch: {
            state: CANCEL_TASK_STATE.CANCEL_MEETING
          }
        }
      })
      globalNxController.showMsg({
        content: I18N.common.canceledSuccessfully,
        msgType: '成功',
        duration: 1.5
      })
      globalNxController.ipcRendererSend(
        'close_small_tools_window_by_rid',
        taskId
      )
      TaskHandler.removeTasks([taskId])
    } else {
      globalNxController.pubJsPublish(Pub.DB_INCREASE_02_UPDATE_FORCE, taskId)
      globalNxController.showMsg({
        content: I18N.common.cancelFailed,
        msgType: '错误',
        duration: 1.5
      })
    }
  })

  return function showConfirm(taskId: string) {
    isVipWin &&
      globalNxController.ipcRendererInvoke('vipSmallToolsWin-siszable', {
        sizeType: SIZE_TYPE_KEY.确认弹窗
      })

    AlertWithOkAndCancel.alert({
      // 这些文案如果需要可配置，加上useState，放到hook参数里
      message: I18N.common.unableToCancelMeeting,
      confirmTxt: I18N.common.cancelMeeting,
      cancelTxt: I18N.common.doNotCancel,
      color: 'red',
      // 小窗需要执行一些东西，老代码
      onCancel: () => {
        forVipSmallWin()
      },
      onOk: () => {
        forVipSmallWin()
        // 执行删除逻辑
        doActionCancelMeeting(taskId)
      }
    })
  }
}
