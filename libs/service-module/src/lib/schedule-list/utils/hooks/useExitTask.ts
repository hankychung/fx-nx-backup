import { I18N } from '@flyele-nx/i18n'
import { useMemoizedFn } from 'ahooks'
import {
  useScheduleStore,
  globalNxController
} from '@flyele-nx/global-processor'
import { TaskApi, TaskDispatchApi } from '@flyele-nx/service'
import { AlertWithOkAndCancel } from '@flyele-nx/ui'
import { TaskHandler } from '../taskHandler'
import { Pub, SIZE_TYPE_KEY } from '@flyele-nx/constant'

export const useExitTask = ({
  taskId,
  isVipWin
}: {
  taskId: string
  isVipWin: boolean
}) => {
  const data = useScheduleStore((state) => state.taskDict[taskId])

  const getDispatchId = useMemoizedFn(() => {
    return data?.dispatch_id || ''
  })

  // 检查是否为挂件
  const forVipSmallWin = () => {
    if (isVipWin) {
      globalNxController.ipcRendererInvoke('vipSmallToolsWin-siszable-reset')
    }
  }

  async function doActionExitTask(taskId: string) {
    // 获得所有需要取消掉的事项id
    const taskIds = (
      await TaskApi.getScheduleTree({
        taskId: taskId,
        queryType: 1
      })
    ).data
      .map((task) => task.ref_task_id)
      .concat(taskId)

    const dispatch_id = getDispatchId()

    try {
      await TaskDispatchApi.exitTask(dispatch_id)
      // 删除该事项相关的卡片和事项列表数据
      globalNxController.pubJsPublish(Pub.DELETE_MATTER_ITEM, taskIds)

      // 关闭子窗口
      globalNxController.ipcRendererSend(
        'close_small_tools_window_by_rid',
        taskId
      )

      globalNxController.showMsg({
        content: I18N.common.exitSuccessfully,
        msgType: '消息',
        duration: 1.5
      })

      TaskHandler.removeTasks(taskIds)
    } catch (e) {
      console.log('退出错误', e)
    }
  }

  // 外部调用的是这个方法，触发弹窗
  return async function showConfirm(taskId: string) {
    try {
      const {
        data: {
          gadget_meeting_total: meeting = 0,
          gadget_notice_total: notice = 0,
          gadget_time_collect_total: timeCollect = 0,
          gadget_todo_total: todo = 0
        }
      } = await TaskApi.getChildrenProcessRelation(taskId)

      const total = meeting + notice + timeCollect + todo

      let message = ''

      if (total > 0) {
        message =
          I18N.template?.(I18N.common.afterExitingTheMatter2, {
            val1: total
          }) || ''
      } else {
        message = I18N.common.afterExitingTheMatter
      }

      if (isVipWin) {
        globalNxController.ipcRendererInvoke('vipSmallToolsWin-siszable', {
          sizeType: SIZE_TYPE_KEY.确认弹窗
        })
      }

      AlertWithOkAndCancel.alert({
        message,
        confirmTxt: I18N.common.stillWantToExit,
        cancelTxt: I18N.common.doNotExit,
        color: 'red',
        // 小窗需要执行一些东西，老代码
        onCancel: () => {
          forVipSmallWin()
        },
        onOk: () => {
          // 执行退出逻辑
          doActionExitTask(taskId)
          forVipSmallWin()
        }
      })
    } catch (_) {
      console.error('exist', _)

      globalNxController.showMsg({
        content: I18N.common.theNetworkIsTemporarilyUnavailable,
        msgType: '错误',
        duration: 1.5
      })
    }
  }
}
