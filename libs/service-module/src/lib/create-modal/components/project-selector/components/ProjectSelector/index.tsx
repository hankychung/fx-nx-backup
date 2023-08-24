/**
 author: william   email:362661044@qq.com
 create_at:2022/8/10 16:36
 **/

import React, {
  FC,
  PropsWithChildren,
  ReactNode,
  useCallback,
  useMemo,
  useState
} from 'react'
import { FlyBasePopper, FlyBasePopperCtrl } from '@flyele/flyele-components'
import styles from './index.module.scss'
import { IBaseProjectInfo, IProject } from '@flyele-nx/types'
import { PositioningStrategy } from '@popperjs/core/lib/types'
import { Placement } from '@popperjs/core/lib/enums'
import { CheckBoxState, SPACE_LEVEL, SPACE_TYPE } from '@flyele-nx/constant'
import { PROJECT_UNSET, useProjectList } from '../../hooks/useProjectList'
import { useUserInfoStore } from '@flyele-nx/zustand-store'
import { projectApi } from '@flyele-nx/service'
import { globalNxController } from '@flyele-nx/global-processor'
import { useCheckVip } from '@flyele-nx/utils'
import { ProjectSelectorItem } from '../ProjectSelectorItem'

/**
 * 所有项目列表必须我已加入并且不是外部成员
 * move ：
 *   不放入项目： 非团队空间才显示，
 *   项目列表： 团队空间-> 当前团队空间项目 & 非当前空间项目 ， 非团队空间 -> 所有项目列表
 * create ：
 *   不放入项目：永远显示
 *   项目列表： 所有项目列表
 * **/
type IType = 'move' | 'create'

/**
 *  ps：！！！
 *  使用情况 通常配合使用，故意不耦合该业务，编写的小伙伴也别耦合
 *  useOnSelProjectConfirm
 *
 * **/
/**
 * 这是个容器，内容看 content
 * @param spaceId 如果带了空间id是直接获取该空间你参与的所以项目
 * @param selectedProjectId 你选中的项目id
 * @param onConfirm 点击确定回调, 如果为 null 则不加入任何项目
 * **/
export type IProjectSelectorProps = {
  project?: IBaseProjectInfo
  onConfirm?: (data: IBaseProjectInfo) => void
  strategy?: PositioningStrategy
  onVisibleChange?: (visible: boolean) => void
  ctrl?: FlyBasePopperCtrl
  renderItem?: (data: IProject, state?: CheckBoxState) => ReactNode
  type: IType // 类型
  disable?: boolean // 禁止选择
  trigger?: 'click'
  needInheritSize?: boolean
  popperDistance?: number
  placement?: Placement
  mountNode?: (() => HTMLElement | null) | 'currentNode'
  useMask?: boolean
  /** 是否禁用检查不同空间的项目选择 */
  disbleCheckDifferentProject?: boolean
}

function _ProjectSelector(props: PropsWithChildren<IProjectSelectorProps>) {
  const {
    children,
    strategy = 'fixed',
    onVisibleChange,
    ctrl,
    disable,
    trigger,
    needInheritSize,
    popperDistance,
    placement = 'bottom',
    mountNode,
    useMask = true
    // disbleCheckDifferentProject = false, // 这个 ...props 传给 Content 了
  } = props

  const controller = useMemo(() => {
    return ctrl ?? new FlyBasePopperCtrl()
  }, [ctrl])

  return (
    <FlyBasePopper
      useMask={useMask}
      mountNode={mountNode}
      popperDistance={popperDistance}
      disable={disable}
      trigger={trigger}
      onVisibleChange={onVisibleChange}
      strategy={strategy}
      showArrow={false}
      placement={placement}
      controller={controller}
      content={<Content ctrl={controller} {...props} />}
      clickOnHide
      needInheritSize={needInheritSize}
    >
      {children}
    </FlyBasePopper>
  )
}
export const ProjectSelector = React.memo(_ProjectSelector)

/***
 * 整体内容
 * @param spaceId 如果带了空间id是直接获取该空间你参与的所有项目
 * @param selectedProjectId 你选中的项目id
 * @param onConfirm 点击确定回调
 * **/

type IContent = Omit<IProjectSelectorProps, 'strategy' | 'onVisibleChange'> & {
  ctrl: FlyBasePopperCtrl
}

const Content: FC<React.PropsWithChildren<IContent>> = (props) => {
  const {
    ctrl,
    onConfirm,
    renderItem,
    project,
    type,
    disbleCheckDifferentProject
  } = props

  /**
   * 个人空间没有不放入项目
   * 是否可以使用   不放入项目
   * **/
  const unsetProjectable = useMemo(() => {
    switch (type) {
      case 'move':
        if (project) {
          return project.ws_type === SPACE_TYPE.private
        }
        return true
      case 'create':
        return true

      default:
        return true
    }
  }, [project, type])

  // 空间id
  const spaceId = useMemo(() => {
    switch (type) {
      case 'move':
        return project?.ws_type === SPACE_TYPE.team
          ? project?.workspace_id
          : undefined
      case 'create':
        return undefined

      default:
        return undefined
    }
  }, [project?.workspace_id, project?.ws_type, type])

  const { projectList } = useProjectList({
    spaceId
  })

  // 这是选中的 project id
  const [projectId, setProjectId] = useState(project?.project_id ?? '')

  // 不能移动
  const isItemDisable = useCallback(
    (item: IBaseProjectInfo): boolean => {
      if (disbleCheckDifferentProject) {
        return false
      }
      // 如果有团队空间id
      if (spaceId) {
        return type === 'move' && spaceId !== item.workspace_id
      }

      // 没有团队空间id
      return false
    },
    [spaceId, type, disbleCheckDifferentProject]
  )

  const userId = useUserInfoStore((state) => state.userInfo.user_id)

  const checkExternal = useCallback(async (item: IBaseProjectInfo) => {
    const res = await projectApi.getMemberInProject(item.project_id)
    const memberList = res.data

    if (memberList) {
      //TODO:JC.......
      // return isProjectExternalMember({ members: memberList, userId })
    }
    return false
  }, [])

  // 选择项目, 做验证
  const onSelect = async (item: IBaseProjectInfo) => {
    /**
     * 如果是移动操作，改事项团队空间项目里面只能选择团队空间项目
     * **/
    if (type === 'move' && item.project_id !== PROJECT_UNSET) {
      if (isItemDisable(item)) {
        globalNxController.showMsg({
          msgType: '错误',
          content: '空间内事项不支持移动至其他空间'
        })
        return
      }

      const bool = await checkExternal(item)

      if (bool) {
        globalNxController.showMsg({
          msgType: '错误',
          content: '外部成员不可进行该操作'
        })
        return
      }
    }

    // 如果存在团队空间，但是选择个人事项
    if (spaceId && item.project_id === PROJECT_UNSET) {
      globalNxController.showMsg({
        msgType: '错误',
        content: '空间内事项不支持移动至其他空间'
      })
      return
    }

    // 正常流程
    onConfirm && onConfirm(item)
    setProjectId(item.project_id)
    // 延迟关闭，不然外部获取不了dom
    setTimeout(() => {
      ctrl.hide()
    }, 100)
  }

  const itemState = useCallback(
    (item: IBaseProjectInfo): CheckBoxState => {
      if (item.project_id === projectId) return CheckBoxState.checked
      if (isItemDisable(item)) return CheckBoxState.disable
      return CheckBoxState.unset
    },
    [isItemDisable, projectId]
  )
  //不是团队会员提醒续费才能使用专业空间的项目
  const { isTeamVip } = useCheckVip()
  const _projectList = useMemo(() => {
    if (!isTeamVip) {
      return projectList.filter(
        (item) => item.workspace_level === SPACE_LEVEL.basic
      )
    }
    return projectList
  }, [projectList, isTeamVip])
  const no_vip_projectList = useMemo(() => {
    return projectList.filter(
      (item) => item.workspace_level === SPACE_LEVEL.vip
    )
  }, [projectList])

  return (
    <div className={styles.wrap}>
      <h1>选择项目</h1>
      <div className={styles.content}>
        {_projectList.map((item) => {
          if (renderItem) {
            let state = itemState(item)

            if (
              !item.project_id &&
              !unsetProjectable &&
              !disbleCheckDifferentProject
            ) {
              state = CheckBoxState.disable
            }
            return (
              <React.Fragment key={item.project_id}>
                {renderItem(item, state)}
              </React.Fragment>
            )
          }
          return (
            <ProjectSelectorItem
              key={item.project_id}
              onSelect={onSelect}
              state={itemState(item)}
              item={item}
            />
          )
        })}

        {/* {!isTeamVip && (
          <>
            <NoVipSelectTip type="project" style={{ fontSize: '12px' }} />

            {no_vip_projectList.map((item) => {
              if (renderItem && isTeamVip) {
                const state = CheckBoxState.disable

                return (
                  <div
                    onClick={(e) => {
                      e.stopPropagation()
                    }}
                  >
                    <React.Fragment key={item.project_id}>
                      {renderItem(item, state)}
                    </React.Fragment>
                  </div>
                )
              }
              return (
                <ProjectSelectorItem
                  key={item.project_id}
                  onSelect={onSelect}
                  state={CheckBoxState.disable}
                  item={item}
                />
              )
            })}
          </>
        )} */}
      </div>
    </div>
  )
}
