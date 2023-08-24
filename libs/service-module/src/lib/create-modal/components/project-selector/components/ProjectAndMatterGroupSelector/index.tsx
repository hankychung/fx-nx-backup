/**
 author: william   email:362661044@qq.com
 create_at:2022/8/12 12:55
 **/

import React, {
  PropsWithChildren,
  useMemo,
  MouseEvent,
  useEffect,
  useState,
  useRef
} from 'react'
import {
  FlyBasePopperCtrl,
  FlyTextTooltip,
  useController
} from '@flyele/flyele-components'
import { useMemoizedFn } from 'ahooks'
import css from './index.module.scss'
import { IBaseProjectInfo, IProjectGroup } from '@flyele-nx/types'
import {
  IMatterGroupSelector,
  MatterGroupSelector
} from '../MatterGroupSelector'
import { useUserInfoStore } from '@flyele-nx/zustand-store'
import { CheckBoxState, SPACE_TYPE } from '@flyele-nx/constant'
import { globalNxController } from '@flyele-nx/global-processor'
import { ProjectSelectorItem } from '../ProjectSelectorItem'
import { ProjectSelector } from '../ProjectSelector'

export type IProjectAndMatterGroupProps = {
  project?: IBaseProjectInfo
  onConfirm: IConfirm // 选中的分组
  onNotProject: (v: IBaseProjectInfo) => void // 不放入项目
  ctrl: FlyBasePopperCtrl
  disable?: boolean // 禁用状态
  onVisibleChange?: (v: boolean) => void
  wrapClassName?: string
  /** 是否禁用检查不同空间的项目选择 */
  disbleCheckDifferentProject?: boolean
} & Pick<IMatterGroupSelector, 'groupId'>

type IConfirm = (value: IBaseProjectInfo & IProjectGroup) => void

export function ProjectAndMatterGroupSelector(
  props: PropsWithChildren<IProjectAndMatterGroupProps>
) {
  const {
    onConfirm,
    onNotProject,
    ctrl,
    project,
    disable,
    onVisibleChange,
    wrapClassName,
    disbleCheckDifferentProject = false
  } = props
  const userId = useUserInfoStore((state) => state.userInfo.user_id)

  const check = useMemoizedFn(async (v: IBaseProjectInfo): Promise<boolean> => {
    if (
      !disbleCheckDifferentProject &&
      project &&
      project.ws_type === SPACE_TYPE.team &&
      project.workspace_id !== v.workspace_id
    ) {
      globalNxController.showMsg({
        msgType: '错误',
        content: '空间内事项不支持移动至其他空间'
      })
      return false
    }

    // 如果存在应用
    // if (appInfo) {
    //   ctrl.hide()
    //   // 如果存在选择的项目存在该应用
    //   const bool = await verifyAndMove({
    //     appInfo,
    //     project: v,
    //     curProject: project,
    //   })
    //
    //   if (!bool) return false
    // }

    return true
  })

  const _onConfirm = async (v: IBaseProjectInfo & IProjectGroup) => {
    const bool = await check(v)

    if (bool) {
      // 正常逻辑
      onConfirm(v)
    }
  }

  const _onNotProject = async (v: IBaseProjectInfo) => {
    const bool = await check(v)

    if (bool) {
      // 正常逻辑
      onNotProject(v)
    }
  }

  const wrapRef = useRef(null)

  return (
    <div ref={wrapRef} className={wrapClassName}>
      <ProjectSelector
        disbleCheckDifferentProject
        mountNode={() => wrapRef.current}
        disable={disable}
        project={project}
        ctrl={ctrl}
        onVisibleChange={onVisibleChange}
        type="move"
        strategy="fixed"
        renderItem={(item, state) => {
          if (!item.project_id) {
            return (
              <ProjectSelectorItem
                onSelect={_onNotProject}
                item={item}
                state={state}
              />
            )
          }

          return (
            <BuildItem
              mountNode={() => wrapRef.current}
              {...props}
              projectCtrl={ctrl}
              state={state}
              disableCreate={userId !== item.creator_id}
              item={item}
              onConfirm={_onConfirm}
            />
          )
        }}
      >
        {props.children}
      </ProjectSelector>
    </div>
  )
}

/**
 * 每一行
 * **/
type IBuildItem = {
  projectCtrl?: FlyBasePopperCtrl
  item: IBaseProjectInfo
  onConfirm: IConfirm
  state?: CheckBoxState
} & Omit<IMatterGroupSelector, 'projectId' | 'onUpdateCb'>

const BuildItem = (props: IBuildItem) => {
  const {
    item,
    groupId,
    onConfirm,
    disableCreate,
    state,
    mountNode,
    projectCtrl
  } = props

  const isDisable = useMemo(() => {
    return state === CheckBoxState.disable
  }, [state])

  const [isCheck, setIsCheck] = useState(false)

  const isChecked = useMemo(() => {
    return state === CheckBoxState.checked
  }, [state])

  const groupCtrl = useController(new FlyBasePopperCtrl())

  useEffect(() => {
    groupCtrl.addListener((event) => {
      const show = event === 'show'

      if (projectCtrl && event === 'show') {
        projectCtrl.removeClickAlwaysHide()
      }
      setIsCheck(show)
    })
  }, [groupCtrl, projectCtrl])

  // 选择中弹出
  useEffect(() => {
    if (isChecked) {
      setTimeout(() => {
        groupCtrl.addClickAlwaysHide().show()
        groupCtrl.wrapDom?.scrollIntoView({
          behavior: 'smooth',
          block: 'center'
        })
      }, 300)
    }
  }, [groupCtrl, isChecked])

  const onClick = (event: MouseEvent): void => {
    if (isDisable) {
      event.stopPropagation()
      globalNxController.showMsg({
        msgType: '错误',
        content: '空间内事项不支持移动至其他空间'
      })
    } else {
      groupCtrl.addClickAlwaysHide().show()
    }
  }

  return (
    <div
      id={`project-and-group-${item.project_id}`}
      onClickCapture={onClick}
      style={{ backgroundColor: isCheck ? '#f8f8f8' : undefined }}
    >
      <MatterGroupSelector
        ctrl={groupCtrl}
        projectId={item.project_id}
        placement="right"
        groupId={groupId}
        onUpdateCb={(value: IProjectGroup) => {
          onConfirm({ ...item, ...value })
        }}
        popperDistance={8}
        disableCreate={disableCreate}
        mountNode={mountNode}
      >
        <div
          className={css.item}
          style={{ color: isDisable ? '#bebebe' : undefined }}
        >
          <div className={css.title}>
            <FlyTextTooltip
              strategy="fixed"
              placement="top"
              text={item.project_name}
            />
          </div>
          <i className="iconfont icon-right-arrow" />
        </div>
      </MatterGroupSelector>
    </div>
  )
}
