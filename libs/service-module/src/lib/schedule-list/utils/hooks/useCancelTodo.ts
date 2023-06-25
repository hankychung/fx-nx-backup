import { AlertWithOkAndCancel, useMessage } from '@flyele-nx/ui'
import { useScheduleStore } from '../../../store/useScheduleStore'
import { useMemoizedFn } from 'ahooks'
import { cancelTask } from './utils'
import { ScheduleTaskConst } from '@flyele-nx/service'
import { TaskHandler } from '../taskHandler'

/**
 * 用于退出事项的hook，外部给taskId，其余逻辑在这里完成
 *
 * 确认框提示信息
 * 确认按钮文案
 * 取消按钮文案
 * 执行回调
 * 这些东西目前不需要，需要的时候可以随时扩展
 */
export const useCancelTodo = ({ taskId }: { taskId: string }) => {
  const data = useScheduleStore((state) => state.taskDict[taskId])

  // 检查是否为挂件
  // const isVipWin = document.getElementById('vipSmallToolsWinNow')
  // const forVipSmallWin = () => {
  //   if (isVipWin) {
  //     ipcRenderer.invoke('vipSmallToolsWin-siszable-reset')
  //   }
  // }
  // 消息提示
  const [showMsg] = useMessage()

  /**
   * 执行取消操作，这是内部方法，弹窗在下面
   */
  const doActionCancelTodo = useMemoizedFn(async (taskId: string) => {
    const dispatch_id = data?.dispatch_id
    const identity = data?.identity

    const result = await cancelTask({
      dispatch_id,
      state:
        identity === 10801
          ? ScheduleTaskConst.CANCEL_TASK_STATE.CANCEL_DISPATCH
          : ScheduleTaskConst.CANCEL_TASK_STATE.CANCEL_JOIN
    })
    if (result) {
      // 删除该事项相关的卡片和事项列表数据
      // Pubjs.publish(PUB.DELETE_MATTER_ITEM, [taskId])
      showMsg({
        content: '取消成功',
        msgType: '成功',
        duration: 1.5
      })
      // ipcRenderer.send('close_small_tools_window_by_rid', taskId)
      TaskHandler.removeTasks([taskId])
    } else {
      showMsg({
        content: '取消失败',
        msgType: '错误',
        duration: 1.5
      })
    }
  })

  // 外部调用的是这个方法，触发弹窗
  return function showConfirm(taskId: string) {
    // isVipWin &&
    //   ipcRenderer.invoke('vipSmallToolsWin-siszable', {
    //     sizeType: SIZE_TYPE_KEY.确认弹窗,
    //   })

    AlertWithOkAndCancel.alert({
      // 这些文案如果需要可配置，加上useState，放到hook参数里
      message: '取消后无法恢复，是否取消待办？',
      confirmTxt: '仍要取消',
      cancelTxt: '不取消',
      color: 'red',
      // 小窗需要执行一些东西，老代码
      onCancel: () => {
        // forVipSmallWin()
      },
      onOk: () => {
        // forVipSmallWin()
        // 执行删除逻辑
        doActionCancelTodo(taskId)
      }
    })
  }
}
