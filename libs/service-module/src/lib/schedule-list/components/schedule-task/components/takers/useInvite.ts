import { useCallback, useMemo, useState } from 'react'
import {
  IContactsAndStatus,
  ITakerAndStatus,
  UsercApi,
  AuthType,
  AuthConst
} from '@flyele-nx/service'
// import useOnline from '@/hooks/useOnlineAlert'
import { UserInfoUtils } from '../../../../utils/userInfoUtils'
import { createInfinite } from '@flyele-nx/utils'
// import { useAddContacts } from '@/hooks/useAddContacts'
// import { CATEGORY, INVITE_TYPE } from '@/types/task-enum'
import { useScheduleStore } from '../../../../../store/useScheduleStore'

interface IAuthWithFetched extends AuthType.IMatterAuth {
  isFetched: boolean
}

const defaultMatterAuthWithFetch: IAuthWithFetched = {
  ...AuthConst.defaultMatterAuth,
  isFetched: false
}

export const useInvite = ({
  taskId,
  userId
}: {
  taskId: string
  userId: string
}) => {
  const task = useScheduleStore((state) => state.taskDict[taskId])
  // const { isOnline_and_check_alert } = useOnline()
  const [auth, setAuth] = useState<IAuthWithFetched>(defaultMatterAuthWithFetch)
  // const { inviteMembers } = useAddContacts()

  const isCreator = useMemo(() => {
    return task.creator_id === userId
  }, [task.creator_id, userId])

  const takers = useMemo(() => {
    return task.takers || []
  }, [task.takers])

  const category = useMemo(() => {
    return task.category || 0
  }, [task.category])

  // 检查是否在事项内，否则不可修改
  const isInTask = useMemo(() => {
    if (isCreator) return true

    return !!takers.find((taker) => taker.taker_id === userId)
  }, [isCreator, takers, userId])

  /**
   * 请求权限
   * 不使用 useMatterAuth 的原因是：和全量一样
   */
  const fetchPower = useCallback(async () => {
    const {
      data: { task_equity: q, member, member_equity }
    } = await UsercApi.taskPower(taskId)
    let isVip = false
    let isTeamVip = false
    let resObj: IAuthWithFetched = {
      ...AuthConst.defaultMatterAuth,
      isFetched: true
    }

    if (member) {
      const { id, start_time, end_time, invite_code, state } = member

      isVip = UserInfoUtils.vipCheck({
        id,
        start_time,
        deadline: end_time ?? 0,
        invite_code,
        level: state ?? 0
      })
      isTeamVip = UserInfoUtils.vipTeamCheck({
        id,
        start_time,
        deadline: end_time ?? 0,
        invite_code,
        level: state ?? 0
      })
    }

    if (q) {
      resObj = {
        maxTaker: createInfinite(q.task_interact_num),
        maxTaskTag: createInfinite(q.tag_tasks_num),
        maxChildMatter: createInfinite(q.child_tasks_num),
        isVip,
        isTeamVip,
        memberId: member.id,
        maxCustomRemind: createInfinite(member_equity?.custom_remind_time || 1),
        isFetched: true
      }
      setAuth(resObj)
    }

    return resObj
  }, [taskId])

  const isCanAdd = useCallback(async () => {
    let resAuth = auth

    if (!resAuth.isFetched) {
      resAuth = await fetchPower()
    }

    if (takers.length >= resAuth.maxTaker) {
      console.log(`人数已达${resAuth.maxTaker}人上限`)
      // showMsg({
      //   msgType: '消息',
      //   content: `人数已达${resAuth.maxTaker}人上限`
      // })
      return false
    }

    if (!isInTask) {
      console.log('没参与事项不可修改')
      // showMsg({
      //   msgType: '错误',
      //   content: '没参与事项不可修改'
      // })
      return false
    }
    return true
  }, [auth, fetchPower, isInTask, takers.length])

  return useCallback(
    (
      list: (IContactsAndStatus | ITakerAndStatus)[],
      closeAddModal: () => void
    ) => {
      // 检查在线状态
      ;(async () => {
        // if (!isOnline_and_check_alert()) return
        if (!(await isCanAdd())) return
        if (list.length > 0) {
          console.log('@@@ inviteMembers', list)
          // inviteMembers({
          //   data: {
          //     takers: list,
          //     taskId,
          //     inviteType: INVITE_TYPE.task,
          //     matterType: Number(task.matter_type),
          //     isChild: category === CATEGORY.childMatter,
          //     isExternal: false
          //   },
          //   onSuccess() {
          //     // Pubjs.publish(PUB.REFRESH_SPACE_MEMBER_LIST)
          //     closeAddModal()
          //   },
          //   onError() {
          //     console.log('邀请失败')
          //   }
          // })
        } else {
          closeAddModal()
        }
      })()
    },
    [isCanAdd]
  )
}
