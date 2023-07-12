import { AlertWithOkAndCancel } from '@flyele-nx/ui'
import { useScheduleStore } from '../../../store/useScheduleStore'
import { TaskDispatchApi } from '@flyele-nx/service'
import { TaskHandler } from '../taskHandler'
import { globalNxController } from '../../../global/nxController'
import PUB from '../../../global/types/pubsub'
import { SIZE_TYPE_KEY } from '../../../global/types/channel/SIZE_TYPE'

export const useExitTodo = ({
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

  async function doActionExitTodo() {
    const dispatch_id = data?.dispatch_id || ''

    try {
      await TaskDispatchApi.exitTask(dispatch_id)
      // 删除该事项相关的卡片和事项列表数据
      globalNxController.pubJsPublish(PUB.DELETE_MATTER_ITEM, [taskId])

      globalNxController.showMsg({
        content: '退出成功',
        msgType: '消息',
        duration: 1.5
      })

      // 关闭子窗口
      globalNxController.ipcRendererSend(
        'close_small_tools_window_by_rid',
        taskId
      )

      TaskHandler.removeTasks([taskId])
    } catch (e) {
      console.log('退出失败', e)
    }
  }

  return function showConfirm(taskId: string) {
    if (isVipWin) {
      globalNxController.ipcRendererInvoke('vipSmallToolsWin-siszable', {
        sizeType: SIZE_TYPE_KEY.确认弹窗
      })
    }

    AlertWithOkAndCancel.alert({
      message: '退出事项后将不再参与该待办',
      confirmTxt: '仍要退出',
      cancelTxt: '不退出',
      color: 'red',
      // 小窗需要执行一些东西，老代码
      onCancel: () => {
        forVipSmallWin()
      },
      onOk: () => {
        forVipSmallWin()
        // 执行退出逻辑
        doActionExitTodo()
      }
    })
  }
}
