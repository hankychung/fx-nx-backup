import { TaskApi } from '@flyele-nx/service'
import { useMemoizedFn } from 'ahooks'
import { globalNxController } from '../../../global/nxController'
import PUB from '../../../global/types/pubsub'
import dayjs from 'dayjs'

interface IParams {
  dispatch: string
  id: string
  finish?: string
  child?: string
  rect?: DOMRect
  show?: boolean
}

// 隐藏接口
export const hide = async (
  dispatchIds: string[],
  taskIds: string[],
  show?: boolean
) => {
  await TaskApi.hide(dispatchIds)
  globalNxController.pubJsPublish(PUB.HIDE_SCHEDULE, { ids: taskIds, show })
  ;(taskIds || []).forEach((taskId) => {
    globalNxController.pubJsPublish(PUB.DB_INCREASE_01_READUX_AND_SQLITEDB, {
      task_id: taskId,
      diffObj: {
        task_dispatch: {
          // 加入
          delete_at: show ? 0 : dayjs().unix()
        }
      }
    })
  })
}

export const useHide = () => {
  // const { show: showModal } = useTreeModal()
  // const [showMsg] = useMessage()

  const hideOrShow = useMemoizedFn(
    async ({ dispatch, id, finish, child, show }: IParams) => {
      if (finish || !child || !show) {
        await hide([dispatch], [id], !show)
        return
      }

      // 获取子事项列表
      const { data } = await TaskApi.getScheduleTree({
        taskId: id
      })

      if (!data.length) {
        await hide([dispatch], [id])
      } else {
        // showModal(
        //   data,
        //   rect,
        //   () => {
        //     hide([dispatch], [id]).then(() => {
        //       showMsg({
        //         msgType: '消息',
        //         content: '已在日程中隐藏'
        //       })
        //     })
        //   },
        //   () => {
        //     hide(
        //       [dispatch, ...data.map((item) => item.dispatch_id)],
        //       [id, ...data.map((item) => item.ref_task_id || item.task_id)]
        //     ).then(() => {
        //       showMsg({
        //         msgType: '消息',
        //         content: '已在日程中隐藏'
        //       })
        //     })
        //   }
        // )
      }
    }
  )

  return { hideOrShow }
}
