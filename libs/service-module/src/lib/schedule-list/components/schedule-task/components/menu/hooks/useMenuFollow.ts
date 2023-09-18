import { I18N } from '@flyele-nx/i18n'
import { useMemo } from 'react'
import { useMemoizedFn } from 'ahooks'
import { IAction } from '../../../../../../context-menu/types'
import { TaskApi } from '@flyele-nx/service'
import { IScheduleTask } from '@flyele-nx/types'
import { TaskHandler } from '../../../../../utils/taskHandler'
import { getDiffKeys } from '../../../../../utils'
import { globalNxController } from '@flyele-nx/global-processor'
import { Pub } from '@flyele-nx/constant'

export const useMenuFollow = ({ data }: { data: IScheduleTask }): IAction => {
  const getTxt = useMemo(() => {
    return data.has_follow ? I18N.common.cancelFollow : I18N.common.focus
  }, [data.has_follow])

  // 要改变至新状态
  const getChangeTo = useMemoizedFn(
    (
      isFollow: boolean
    ): {
      action: 'unfollowTask' | 'followTask'
      msg: string
      follow: boolean
    } => {
      if (isFollow) {
        return {
          action: 'unfollowTask',
          msg: I18N.common.cancelledFollowing,
          follow: !isFollow
        }
      }

      return {
        action: 'followTask',
        msg: I18N.common.followed,
        follow: !isFollow
      }
    }
  )

  const action = useMemoizedFn(() => {
    const isFollow = data.has_follow || false

    const changeTo = getChangeTo(isFollow)

    // 先发请求
    TaskApi[changeTo.action](data.ref_task_id).then(() => {
      TaskHandler.batchModify({
        diff: {
          has_follow: !isFollow
        },
        ...getDiffKeys([data])
      })
    })

    // 然后弹提示
    globalNxController.showMsg({ msgType: '消息', content: changeTo.msg })
    // 最后发通知
    globalNxController.pubJsPublish(Pub.FOLLOW_TASK, {
      id: data.ref_task_id,
      follow: changeTo.follow
    })
  })

  return {
    txt: getTxt,
    callback: action,
    checkAction: true
  }
}
