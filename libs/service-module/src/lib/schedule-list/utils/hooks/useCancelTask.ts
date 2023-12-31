import { I18N } from '@flyele-nx/i18n'
import { AlertWithOkAndCancel } from '@flyele-nx/ui'
import {
  useScheduleStore,
  globalNxController
} from '@flyele-nx/global-processor'
import { TaskApi } from '@flyele-nx/service'
import { useMemoizedFn } from 'ahooks'
import { cancelTask } from './utils'
import { TaskHandler } from '../taskHandler'
import { CANCEL_TASK_STATE, Pub, SIZE_TYPE_KEY } from '@flyele-nx/constant'

/**
 * 用于退出事项的hook，外部给taskId，其余逻辑在这里完成
 *
 * 确认框提示信息
 * 确认按钮文案
 * 取消按钮文案
 * 执行回调
 * 这些东西目前不需要，需要的时候可以随时扩展
 */
export const useCancelTask = ({
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
  const doActionCancelTask = useMemoizedFn(async (taskId: string) => {
    const dispatch_id = data?.dispatch_id
    const identity = data?.identity

    // 获得所有需要取消掉的事项id
    const taskIds = (
      await TaskApi.getScheduleTree({ taskId: taskId, queryType: 1 })
    ).data
      .map((task) => task.ref_task_id)
      .concat(taskId)

    console.log('获得所有需要取消掉的事项id', taskIds)

    const result = await cancelTask({
      dispatch_id,
      state:
        identity === 10801
          ? CANCEL_TASK_STATE.CANCEL_DISPATCH
          : CANCEL_TASK_STATE.CANCEL_JOIN
    })
    if (result) {
      // 删除该事项相关的卡片和事项列表数据
      globalNxController.pubJsPublish(Pub.DELETE_MATTER_ITEM, taskIds)
      globalNxController.showMsg({
        content: I18N.common.canceledSuccessfully,
        msgType: '成功',
        duration: 1.5
      })
      // 若事项被取消，事项详情小窗体需要被关闭，应该是这个意思
      globalNxController.ipcRendererSend(
        'close_small_tools_window_by_rid',
        taskId
      )
      TaskHandler.removeTasks(taskIds)
      TaskHandler.removeTasksByCondition((task) =>
        taskIds.includes(task?.parent_id || '')
      )
    } else {
      globalNxController.showMsg({
        content: I18N.common.cancelFailed,
        msgType: '错误',
        duration: 1.5
      })
    }
  })

  // 外部调用的是这个方法，触发弹窗
  return function showConfirm(taskId: string) {
    isVipWin &&
      globalNxController.ipcRendererInvoke('vipSmallToolsWin-siszable', {
        sizeType: SIZE_TYPE_KEY.确认弹窗
      })

    AlertWithOkAndCancel.alert({
      // 这些文案如果需要可配置，加上useState，放到hook参数里
      message: I18N.common.afterCancelingTheMatter,
      confirmTxt: I18N.common.continueToCancel,
      cancelTxt: I18N.common.abortOperation,
      cancelStyle: {
        border: 'none',
        color: 'rgba(0,0,0,0.3)'
      },
      color: 'red',
      // 小窗需要执行一些东西，老代码
      onCancel: () => {
        forVipSmallWin()
      },
      onOk: () => {
        forVipSmallWin()
        // 执行删除逻辑
        doActionCancelTask(taskId)
      }
    })
  }
}
