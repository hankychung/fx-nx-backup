import { I18N } from '@flyele-nx/i18n'
import React, { useState, useEffect, useMemo, useRef } from 'react'
import cs from 'classnames'
import { FlyAvatarGroup } from '@flyele/flyele-components'
import { createInfinite, UserInfoUtils } from '@flyele-nx/utils'
import { AddTakerIcon } from '@flyele-nx/icon'
import { getOperationStatus } from '../../../../utils/workflowOperation'
import { ISimpleMember } from '../../../../../simple-member-list'
import {
  IHandleMethods,
  RemoveSimpleMemberListPopper
} from '../../../../../remove-simple-member-list-popper'
import { getAvatarsFromTakers } from '../../../../utils/task'
import parentStyle from '../../index.module.scss'
import styles from './index.module.scss'
import {
  useScheduleStore,
  useContactStore,
  useUserInfoStore,
  globalNxController,
  nxControllerRegister
} from '@flyele-nx/global-processor'
import { AuthType, UsercApi, AuthConst } from '@flyele-nx/service'
import { IBaseProjectInfo, Taker } from '@flyele-nx/types'
import { useMemoizedFn } from 'ahooks'
import { contextMenuTool, inviteModal } from '../../../../../../index'
import {
  MatterType,
  CATEGORY,
  IDENTITY,
  SIZE_TYPE_KEY
} from '@flyele-nx/constant'

const creatorIdentityCodes = [10801, 10802, 10804, 10810, 10811]

interface IPROPTakers {
  /**
   * 查该事项的参与者
   */
  taskId: string
  /**
   * 最多显示多少头像
   */
  max?: number
  isDarkMode?: boolean
  isVipWin?: boolean
  isBoard?: boolean
  opacity?: boolean
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
    isDarkMode = false,
    isVipWin = false,
    isBoard = false,
    opacity = false
  } = props
  const task = useScheduleStore((state) => state.taskDict[taskId])
  const userId = useUserInfoStore((state) => state.userInfo.user_id)
  const { contactDict } = useContactStore()
  const [auth, setAuth] = useState<IAuthWithFetched>(defaultMatterAuthWithFetch)
  const [takers, setTakers] = useState<Taker[]>([])
  const [avatars, setAvatars] = useState<ICUSTOMAvatar[]>([])
  const removeRef = useRef<IHandleMethods | null>(null)

  const isSmallTool = useMemo(() => {
    return task.category === CATEGORY.smallTool
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
  const projectInfo = useMemo<IBaseProjectInfo>(() => {
    return {
      project_id: projectId,
      workspace_id: workspaceId,
      ws_type: task.ws_type,
      project_name: task.project_name ?? ''
    }
  }, [projectId, task.project_name, task.ws_type, workspaceId])

  const notATask = useMemo(
    () =>
      [MatterType.timeCollect, MatterType.calendar].includes(task.matter_type),
    [task.matter_type]
  )

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
      globalNxController.showMsg({
        msgType: '消息',
        content: I18N.template?.(I18N.common.overNumTakerInTask, {
          val1: resAuth.maxTaker
        })
      })
      return false
    }

    if (!isInTask) {
      globalNxController.showMsg({
        msgType: '错误',
        content: I18N.common.notInvolvedInMatters
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
    if (nxControllerRegister.ipcRenderer) {
      globalNxController.onHandlerTaskAddTaker(params)
    } else {
      inviteModal.open({
        inviteParams: {
          taskId: taskId,
          title: task.title,
          matterType: task.matter_type,
          projectId: projectInfo?.project_id,
          spaceId: projectInfo?.workspace_id
        }
      })
    }
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

  const editTakers = useMemoizedFn(async () => {
    /**
     * 如果存在右键菜单，先把菜单关闭了
     */
    const contextMenuVisible = contextMenuTool.getVisible()
    if (contextMenuVisible) {
      contextMenuTool.close()
      return false
    }
    /**
     * 如果存在其他协作人列表菜单，先把其他关闭了
     * 通过模拟点击 body 实现触发popover的 clickAway
     */
    const otherMenuVisible = document.getElementById('removeSimpleMemberList')
    if (otherMenuVisible) {
      document.body.click()
      return false
    }

    const status = getOperationStatus(task, userId)

    if (status === 'complete' && task.flow_step_id) {
      globalNxController.showMsg({ content: I18N.common.completedWork })
      return false
    }

    return await isCanAdd()
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
            task.identity === IDENTITY.matterDistribute &&
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

      const { isTeamVip, isVip } = UserInfoUtils.checkVipType(contactDict[id])

      return {
        ...taker,
        pinyin: contactDict[id]?.pinyin || '',
        finish_time: taker?.finish_time || 0,
        is_view: taker?.is_view || 0,
        taker_id: id,
        isVip,
        isTeamVip
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
      <div
        className={cs(styles.takers, {
          [styles.darkMode]: isDarkMode && !opacity,
          [styles.darkOpacityMode]: isDarkMode && opacity,
          [styles.whiteOpacityMode]: !isDarkMode && opacity,
          [parentStyle.needLine]: isBoard || isVipWin
        })}
      >
        <RemoveSimpleMemberListPopper
          ref={removeRef}
          memberList={simpleMemberList}
          onClickAdd={onClickAddModal}
          taskId={taskId}
          canShow={editTakers}
        >
          <div className={styles.avatarBox}>
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
        </RemoveSimpleMemberListPopper>
      </div>
    </div>
  )
}
