import { AlertWithOkAndCancel } from '@flyele-nx/ui'
import { useScheduleStore } from '../useScheduleStore'
import { useMemoizedFn } from 'ahooks'
import { cancelTask } from './utils'
import { ScheduleTaskConst } from '@flyele-nx/service'
import { TaskHandler } from '../taskHandler'

/**
 * 用于退出代办的hook，外部给taskId，其余逻辑在这里完成
 *
 * 确认框提示信息
 * 确认按钮文案
 * 取消按钮文案
 * 执行回调
 * 这些东西目前不需要，需要的时候可以随时扩展
 */
export const useCancelMeeting = ({ taskId }: { taskId: string }) => {
  const data = useScheduleStore((state) => state.taskDict[taskId])

  // 检查是否为挂件
  // const isVipWin = document.getElementById('vipSmallToolsWinNow')
  // const forVipSmallWin = () => {
  //   if (isVipWin) {
  //     ipcRenderer.invoke('vipSmallToolsWin-siszable-reset')
  //   }
  // }
  // 检测网络状态
  // 消息提示
  // const [showMsg] = useMessage()

  /**
   * 执行取消操作，这是内部方法，弹窗在下面
   */
  const doActionCancelMeeting = useMemoizedFn(async (taskId: string) => {
    const dispatch_id = data?.dispatch_id

    const result = await cancelTask({
      dispatch_id,
      state: ScheduleTaskConst.CANCEL_TASK_STATE.CANCEL_MEETING
    })
    if (result) {
      // Pubjs.publish(SUB.DELETE_MATTER_ITEM, [taskId])
      //
      // // TODO: 调取增量接口
      // Pubjs.publish(SUB.DB_INCREASE_01_READUX_AND_SQLITEDB, {
      //   task_id: taskId, // ↓ 需要更新的部分差量数据
      //   diffObj: { task_dispatch: { state } },
      // })
      // 取消成功
      // showMsg({
      //   content: '取消成功',
      //   msgType: '成功',
      //   duration: 1.5,
      // })
      // ipcRenderer.send('close_small_tools_window_by_rid', taskId)
      TaskHandler.removeTasks([taskId])
    } else {
      // Pubjs.publish(SUB.DB_INCREASE_02_UPDATE_FORCE, taskId)
      // showMsg({
      //   content: '取消失败',
      //   msgType: '错误',
      //   duration: 1.5,
      // })
    }
  })

  return function showConfirm(taskId: string) {
    // isVipWin &&
    //   ipcRenderer.invoke('vipSmallToolsWin-siszable', {
    //     sizeType: SIZE_TYPE_KEY.确认弹窗,
    //   })

    AlertWithOkAndCancel.alert({
      // 这些文案如果需要可配置，加上useState，放到hook参数里
      message: '取消后无法恢复，并在会议列表中移除，是否取消会议？',
      confirmTxt: '取消会议',
      cancelTxt: '不取消',
      color: 'red',
      // 小窗需要执行一些东西，老代码
      onCancel: () => {
        // forVipSmallWin()
      },
      onOk: () => {
        // forVipSmallWin()
        // 执行删除逻辑
        doActionCancelMeeting(taskId)
      }
    })
  }
}
