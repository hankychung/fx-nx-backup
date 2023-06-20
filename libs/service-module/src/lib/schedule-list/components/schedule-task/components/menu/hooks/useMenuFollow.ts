import { useMemo } from 'react'
import { useMemoizedFn } from 'ahooks'
import { IAction } from '../../../../../../context-menu'
import { IScheduleTask, TaskApi } from '@flyele-nx/service'

export const useMenuFollow = ({ data }: { data: IScheduleTask }): IAction => {
  const getTxt = useMemo(() => {
    return data.has_follow ? '取消关注' : '关注'
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
          msg: '已取消关注',
          follow: !isFollow
        }
      }

      return {
        action: 'followTask',
        msg: '已关注',
        follow: !isFollow
      }
    }
  )

  const action = useMemoizedFn(() => {
    const isFollow = data.has_follow || false

    const changeTo = getChangeTo(isFollow)

    // 先发请求
    TaskApi[changeTo.action](data.ref_task_id)

    // 然后弹提示
    // showMsg({ msgType: '消息', content: changeTo.msg })
    // 最后发通知
    // Pubjs.publish(sub.FOLLOW_TASK, {
    //   id: taskId,
    //   follow: changeTo.follow,
    // })
  })

  return {
    txt: getTxt,
    callback: action,
    checkAction: true
  }
}
