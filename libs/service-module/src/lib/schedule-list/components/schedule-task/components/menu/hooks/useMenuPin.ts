import { useMemo } from 'react'
import { IScheduleTask, TaskDispatchApi } from '@flyele-nx/service'
import { useMemoizedFn } from 'ahooks'
import { IAction } from '../../../../../../context-menu/types'
import { TaskHandler } from '../../../../../utils/taskHandler'
import { getKey } from '../../../../../utils'
import dayjs from 'dayjs'

export const useMenuPin = ({ data }: { data: IScheduleTask }): IAction => {
  const action = useMemoizedFn(() => {
    const dispatch = data.dispatch_id
    const topmost_at = data.topmost_at
    TaskDispatchApi.pinSchedule(dispatch).then(async () => {
      console.log(`${topmost_at ? '已取消置顶' : '已置顶'}`)
      // showMsg({
      //   msgType: '消息',
      //   content: `${topmost_at ? '已取消置顶' : '已置顶'}`,
      // })
      //
      // Pubjs.publish(sub.BOARD_TOPMOST, {
      //   ids: [dispatch],
      //   topmost: topmost_at ? 0 : await timeGetter.getDate(),
      // })

      TaskHandler.batchModify({
        keys: [data.ref_task_id],
        keysWithRepeatIds: [getKey(data)],
        diff: { topmost_at: data.topmost_at ? 0 : dayjs().unix() }
      })
    })
  })

  const menu = useMemo(
    () => (data.topmost_at ? '取消置顶' : '置顶'),
    [data.topmost_at]
  )

  const check = useMemo(() => !data.finish_time, [data.finish_time])

  return {
    txt: menu,
    callback: action,
    checkAction: check
  }
}
