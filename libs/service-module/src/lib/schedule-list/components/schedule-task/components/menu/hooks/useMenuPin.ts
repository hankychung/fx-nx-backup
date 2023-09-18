import { I18N } from '@flyele-nx/i18n'
import { useMemo } from 'react'
import { TaskDispatchApi } from '@flyele-nx/service'
import { IScheduleTask } from '@flyele-nx/types'
import { useMemoizedFn } from 'ahooks'
import { IAction } from '../../../../../../context-menu/types'
import { TaskHandler } from '../../../../../utils/taskHandler'
import { getDiffKeys } from '../../../../../utils'
import dayjs from 'dayjs'
import { globalNxController } from '@flyele-nx/global-processor'
import { Pub } from '@flyele-nx/constant'
import { timeGetter } from '@flyele-nx/utils'

export const useMenuPin = ({ data }: { data: IScheduleTask }): IAction => {
  const action = useMemoizedFn(() => {
    const dispatch = data.dispatch_id
    const topmost_at = data.topmost_at
    TaskDispatchApi.pinSchedule(dispatch).then(async () => {
      globalNxController.showMsg({
        msgType: '消息',
        content: `${
          topmost_at ? I18N.common.onCancelTopping : I18N.common.onTopping
        }`
      })

      globalNxController.pubJsPublish(Pub.BOARD_TOPMOST, {
        ids: [dispatch],
        topmost: topmost_at ? 0 : await timeGetter.getDate()
      })

      TaskHandler.batchModify({
        ...getDiffKeys([data]),
        diff: { topmost_at: data.topmost_at ? 0 : dayjs().unix() }
      })
    })
  })

  const menu = useMemo(
    () => (data.topmost_at ? I18N.common.cancelTopping : I18N.common.topping),
    [data.topmost_at]
  )

  const check = useMemo(() => !data.finish_time, [data.finish_time])

  return {
    txt: menu,
    callback: action,
    checkAction: check
  }
}
