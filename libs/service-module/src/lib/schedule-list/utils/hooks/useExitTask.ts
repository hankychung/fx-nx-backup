import { useMemoizedFn } from 'ahooks'
import { useScheduleStore } from '../../../store/useScheduleStore'
import { TaskApi, TaskDispatchApi } from '@flyele-nx/service'
import { AlertWithOkAndCancel } from '@flyele-nx/ui'
import { TaskHandler } from '../taskHandler'

export const useExitTask = ({ taskId }: { taskId: string }) => {
  const data = useScheduleStore((state) => state.taskDict[taskId])

  const getDispatchId = useMemoizedFn(() => {
    return data?.dispatch_id || ''
  })

  // 检查是否为挂件
  // const isVipWin = document.getElementById('vipSmallToolsWinNow')
  // const forVipSmallWin = () => {
  //   if (isVipWin) {
  //     ipcRenderer.invoke('vipSmallToolsWin-siszable-reset')
  //   }
  // }

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
      console.log('删除该事项相关的卡片和事项列表数据', taskIds)
      // 删除该事项相关的卡片和事项列表数据
      // Pubjs.publish(PUB.DELETE_MATTER_ITEM, taskIds)

      // 关闭子窗口
      // ipcRenderer.send('close_small_tools_window_by_rid', taskId)

      // showMsg({
      //   content: '退出成功',
      //   msgType: '消息',
      //   duration: 1.5
      // })

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
          data: {
            gadget_meeting_total: meeting = 0,
            gadget_notice_total: notice = 0,
            gadget_time_collect_total: timeCollect = 0,
            gadget_todo_total: todo = 0
          }
        }
      } = await TaskApi.getChildrenProcessRelation(taskId)

      const total = meeting + notice + timeCollect + todo

      let message = ''

      if (total > 0) {
        message = `退出事项后也将退出该事项的${total}个小工具`
      } else {
        message = '退出事项后将不再参与该事项'
      }

      // if (isVipWin) {
      //   ipcRenderer.invoke('vipSmallToolsWin-siszable', {
      //     sizeType: SIZE_TYPE_KEY.确认弹窗
      //   })
      // }

      AlertWithOkAndCancel.alert({
        message,
        confirmTxt: '仍要退出',
        cancelTxt: '不退出',
        color: 'red',
        // 小窗需要执行一些东西，老代码
        onCancel: () => {
          // forVipSmallWin()
        },
        onOk: () => {
          // 执行退出逻辑
          doActionExitTask(taskId)
          // forVipSmallWin()
        }
      })
    } catch (_) {
      // showMsg({
      //   content: '网络暂时不可用',
      //   msgType: '错误',
      //   duration: 1.5
      // })
    }
  }
}
