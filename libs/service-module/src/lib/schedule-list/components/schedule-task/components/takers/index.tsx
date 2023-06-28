import React, { useState, useEffect, MouseEvent, useMemo } from 'react'
import cs from 'classnames'
import {
  FlyAvatarGroup,
  FlyBasePopperCtrl,
  useController
} from '@flyele/flyele-components'
import { UserInfoUtils } from '../../../../utils/userInfoUtils'
import { createInfinite } from '@flyele-nx/utils'
import { useMessage } from '@flyele-nx/ui'
import { AddTakerIcon } from '@flyele-nx/icon'
import { getOperationStatus } from '../../../../utils/workflowOperation'
import { ISimpleMember } from '../../../../../simple-member-list'
import { RemoveSimpleMemberListPopper } from '../../../../../remove-simple-member-list-popper'
import { getAvatarsFromTakers } from '../../../../utils/task'
import parentStyle from '../../index.module.scss'
import styles from './index.module.scss'
import { useScheduleStore } from '../../../../../store/useScheduleStore'
import {
  AuthType,
  UsercApi,
  ScheduleTaskConst,
  AuthConst,
  ProjectType,
  Taker
} from '@flyele-nx/service'
import { useContactStore } from '../../../../../store/useContactStore'
import { useUserInfoStore } from '../../../../../store/useUserInfoStore'
import { globalNxController } from '../../../../../global/nxController'
import { SIZE_TYPE_KEY } from '../../../../../global/types/channel/SIZE_TYPE'
import { useMemoizedFn } from 'ahooks'
import { contextMenuTool } from '../../../../../../index'

const creatorIdentityCodes = [10801, 10802, 10804, 10810, 10811]

interface IPROPTakers {
  /**
   * 查该事项的参与者
   */
  taskId: string
  listKey: string
  /**
   * 最多显示多少头像
   */
  max?: number
  isDarkMode?: boolean
  isVipWin?: boolean
  isBoard?: boolean
}

interface ICUSTOMAvatar {
  userId: string
  src: string
  border?: boolean
  borderColor?: string
}

interface IAuthWithFetched extends AuthType.IMatterAuth {
  isFetched: boolean
}

const defaultMatterAuthWithFetch: IAuthWithFetched = {
  ...AuthConst.defaultMatterAuth,
  isFetched: false
}

export const Takers: React.FC<IPROPTakers> = (props) => {
  const {
    taskId,
    listKey,
    isDarkMode = false,
    isVipWin = false,
    isBoard = false
  } = props
  const task = useScheduleStore((state) => state.taskDict[taskId])
  const userId = useUserInfoStore((state) => state.userInfo.user_id)
  const { contactDict } = useContactStore()
  const [auth, setAuth] = useState<IAuthWithFetched>(defaultMatterAuthWithFetch)
  const [showMsg] = useMessage()
  const [takers, setTakers] = useState<Taker[]>([])
  const [avatars, setAvatars] = useState<ICUSTOMAvatar[]>([])

  const isSmallTool = useMemo(() => {
    return task.category === ScheduleTaskConst.CATEGORY.smallTool
  }, [task.category])

  const isCreator = useMemo(() => {
    return (
      task.creator_id === userId ||
      (task.identity && creatorIdentityCodes.includes(task.identity))
    )
  }, [task.creator_id, task.identity, userId])

  const projectId = useMemo(() => {
    return task.project_id || ''
  }, [task.project_id])

  const workspaceId = useMemo(() => {
    return task.workspace_id || ''
  }, [task.workspace_id])

  // 项目详细
  const projectInfo = useMemo<ProjectType.IBaseProjectInfo>(() => {
    return {
      project_id: projectId,
      workspace_id: workspaceId,
      ws_type: task.ws_type,
      project_name: task.project_name ?? ''
    }
  }, [projectId, task.project_name, task.ws_type, workspaceId])

  const notATask = useMemo(
    () =>
      [
        ScheduleTaskConst.MatterType.timeCollect,
        ScheduleTaskConst.MatterType.calendar
      ].includes(task.matter_type),
    [task.matter_type]
  )

  const popCtrl = useController(new FlyBasePopperCtrl())

  // 获取权限
  const fetchPower = useMemoizedFn(async () => {
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
  })

  // 是否在事项里面
  const isInTask = useMemo(() => {
    if (isCreator) return true

    return !!takers.find((taker) => taker.taker_id === userId)
  }, [isCreator, takers, userId])

  // 是否可以添加
  const isCanAdd = useMemoizedFn(async () => {
    let resAuth = auth

    if (!resAuth.isFetched) {
      resAuth = await fetchPower()
    }

    if (takers.length >= resAuth.maxTaker) {
      showMsg({
        msgType: '消息',
        content: `人数已达${resAuth.maxTaker}人上限`
      })
      return false
    }

    if (!isInTask) {
      showMsg({
        msgType: '错误',
        content: '没参与事项不可修改'
      })
      return false
    }
    return true
  })

  /**
   * 通知外部打开协作人邀请弹窗
   */
  const showAddModal = useMemoizedFn(() => {
    const defaultNoSel = simpleMemberList.map((taker) => taker.userId)
    const params = {
      defaultTakers: defaultNoSel,
      matterType: task.matter_type,
      task: {
        id: taskId,
        title: task.title,
        parentId: task.parent_id,
        project: projectInfo
      },
      sensor: null,
      conditionModel: {
        modelName: 'MatterConditionModel',
        params: {
          type: 'globalMatterCondition'
        }
      },
      isSmallTool
    }
    globalNxController.onHandlerTaskAddTaker(params, listKey)
  })

  // 协作人弹窗
  const onClickAddModal = useMemoizedFn(async () => {
    if (await isCanAdd()) {
      // 打开协作人弹窗
      // 小挂件的骚操作（修改尺寸）
      if (isVipWin) {
        globalNxController.ipcRendererInvoke('vipSmallToolsWin-siszable', {
          sizeType: SIZE_TYPE_KEY.邀请协作人
        })
      }

      showAddModal()
    }
  })

  // 进入编辑状态，因为父级组件监听了鼠标右键，需要阻止冒泡
  const editTakers = useMemoizedFn(async (e: MouseEvent) => {
    e.stopPropagation()

    /**
     * 如果存在右键菜单，先把菜单关闭了，因为上面阻止冒泡了，所以触发不了关闭右键菜单
     */
    const contextMenuVisible = contextMenuTool.getVisible()
    if (contextMenuVisible) {
      contextMenuTool.close()
      return
    }

    const status = getOperationStatus(task, userId)

    if (status === 'complete') {
      showMsg({ content: '已完成的工作流事项不支持添加人' })
      return
    }

    if (await isCanAdd()) {
      popCtrl.addClickAlwaysHide().show()
    }
  })

  // 检测，获取，写入takers信息
  useEffect(() => {
    // 获取takers
    if (notATask || !task) {
      return
    }

    // 过滤非我执行事项/非我参与会议
    // 当创建人不参与时 state 为 10301
    const takers =
      (task.takers
        ?.map((taker) => {
          // 过滤掉创建非参与人
          if (
            task.identity === ScheduleTaskConst.IDENTITY.matterDistribute &&
            taker.taker_id === userId
          ) {
            return null
          }
          return (
            {
              ...taker,
              ...contactDict[taker.taker_id]
            } || null
          )
        })
        .filter(
          (i) => i && ![10406, 10608, 10301].includes((i as any).state)
        ) as Taker[]) || []

    // 写入takers
    setTakers(takers)
  }, [contactDict, notATask, task, userId])

  // 设置头像
  useEffect(() => {
    const decentTakers = takers.map((taker) => {
      const id = taker.taker_id

      if (!id) return taker

      return {
        ...taker,
        pinyin: contactDict[id]?.pinyin || '',
        finish_time: taker?.finish_time || 0,
        is_view: taker?.is_view || 0,
        taker_id: id,
        isVip: contactDict[id]?.isVip,
        isTeamVip: contactDict[id]?.isTeamVip
      }
    })

    const list = getAvatarsFromTakers(
      decentTakers as Array<Taker & { isTeamVip: boolean; isVip: boolean }>
    )

    list.forEach((item) => {
      item.overlayClassName = cs(
        item.is_view ? '' : styles.isView,
        item.isTeamVip
          ? 'global-style-team-vip-min'
          : item.isVip
          ? 'global-style-person-vip-min'
          : ''
      )
    })
    setAvatars(list)
  }, [contactDict, takers])

  const avatarBoxJsx = useMemo(() => {
    return (
      <div className={styles.avatarBox} onClick={editTakers}>
        {avatars.length ? (
          <FlyAvatarGroup
            list={avatars}
            avatarSize={16}
            shiftingWidth={3}
            max={3}
            min={3}
            moreBtnClass={styles.moreBtn}
          />
        ) : (
          <AddTakerIcon width={17} height={17} />
        )}
      </div>
    )
  }, [avatars, editTakers])

  // 成员列表
  const simpleMemberList = useMemo<ISimpleMember[]>(() => {
    return (takers ?? []).map((item) => {
      return {
        userId: item.taker_id,
        dispatchId: item.dispatch_id || '',
        isView: true,
        isFinished: false,
        isCreator: Boolean(item.taker_id === task.creator_id)
      }
    })
  }, [task.creator_id, takers])

  // 如果是时间征集和日历导入，不渲染
  if (notATask) {
    return null
  }

  return (
    <div
      onClick={(e) => {
        e.stopPropagation()
      }}
    >
      {
        <div
          className={cs(styles.takers, {
            [styles.darkMode]: isDarkMode,
            [parentStyle.needLine]: isBoard || isVipWin
          })}
        >
          <RemoveSimpleMemberListPopper
            ctrl={popCtrl}
            memberList={simpleMemberList}
            onClickAdd={onClickAddModal}
            taskId={taskId}
          >
            {avatarBoxJsx}
          </RemoveSimpleMemberListPopper>
        </div>
      }
    </div>
  )
}
