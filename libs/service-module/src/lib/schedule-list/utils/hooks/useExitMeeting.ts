import { AlertWithOkAndCancel, useMessage } from '@flyele-nx/ui'
import { useScheduleStore } from '../../../store/useScheduleStore'
import { TaskDispatchApi } from '@flyele-nx/service'
import { TaskHandler } from '../taskHandler'

export const useExitMeeting = ({ taskId }: { taskId: string }) => {
  const data = useScheduleStore((state) => state.taskDict[taskId])

  // 检查是否为挂件
  // const isVipWin = document.getElementById('vipSmallToolsWinNow')
  // const forVipSmallWin = () => {
  //   if (isVipWin) {
  //     ipcRenderer.invoke('vipSmallToolsWin-siszable-reset')
  //   }
  // }
  const [showMsg] = useMessage()

  async function doActionExitMeeting(taskId: string) {
    const dispatch_id = data.dispatch_id || ''

    try {
      await TaskDispatchApi.exitTask(dispatch_id)
      // 删除该事项相关的卡片和事项列表数据
      // Pubjs.publish(PUB.DELETE_MATTER_ITEM, [taskId])

      showMsg({
        content: '退出成功',
        msgType: '消息',
        duration: 1.5
      })

      // 关闭子窗口
      // ipcRenderer.send('close_small_tools_window_by_rid', taskId)
      TaskHandler.removeTasks([taskId])
    } catch (_) {
      // 老代码，不知道什么作用
      // window.smallWinLock = false
    }
  }

  return function showConfirm(taskId: string) {
    // if (isVipWin) {
    //   ipcRenderer.invoke('vipSmallToolsWin-siszable', {
    //     sizeType: SIZE_TYPE_KEY.确认弹窗,
    //   })
    // }

    AlertWithOkAndCancel.alert({
      message: '退出事项后将不再参与该会议',
      confirmTxt: '仍要退出',
      cancelTxt: '不退出',
      color: 'red',
      // 小窗需要执行一些东西，老代码
      onCancel: () => {
        // forVipSmallWin()
      },
      onOk: () => {
        // 执行退出逻辑
        doActionExitMeeting(taskId)
        // forVipSmallWin()
      }
    })
  }
}
