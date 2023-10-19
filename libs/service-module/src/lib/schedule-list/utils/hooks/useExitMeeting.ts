import { I18N } from '@flyele-nx/i18n'
import { AlertWithOkAndCancel } from '@flyele-nx/ui'
import {
  useScheduleStore,
  globalNxController
} from '@flyele-nx/global-processor'
import { TaskDispatchApi } from '@flyele-nx/service'
import { TaskHandler } from '../taskHandler'
import { Pub, SIZE_TYPE_KEY } from '@flyele-nx/constant'

export const useExitMeeting = ({
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

  async function doActionExitMeeting(taskId: string) {
    const dispatch_id = data.dispatch_id || ''

    try {
      await TaskDispatchApi.exitTask(dispatch_id)
      // 删除该事项相关的卡片和事项列表数据
      globalNxController.pubJsPublish(Pub.DELETE_MATTER_ITEM, [taskId])

      globalNxController.showMsg({
        content: I18N.common.exitSuccessfully,
        msgType: '消息',
        duration: 1.5
      })

      // 关闭子窗口
      globalNxController.ipcRendererSend(
        'close_small_tools_window_by_rid',
        taskId
      )
      TaskHandler.removeTasks([taskId])
    } catch (_) {
      // 老代码，不知道什么作用
      // window.smallWinLock = false
    }
  }

  return function showConfirm(taskId: string) {
    if (isVipWin) {
      globalNxController.ipcRendererInvoke('vipSmallToolsWin-siszable', {
        sizeType: SIZE_TYPE_KEY.确认弹窗
      })
    }

    AlertWithOkAndCancel.alert({
      message: I18N.common.afterExitingTheMeeting,
      confirmTxt: I18N.common.stillWantToExit,
      cancelTxt: I18N.common.doNotExit,
      color: 'red',
      // 小窗需要执行一些东西，老代码
      onCancel: () => {
        forVipSmallWin()
      },
      onOk: () => {
        // 执行退出逻辑
        doActionExitMeeting(taskId)
        forVipSmallWin()
      }
    })
  }
}
