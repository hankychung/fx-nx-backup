/**
 author: william   email:362661044@qq.com
 create_at:2022/9/1 17:31
 **/

import React, {
  PropsWithChildren,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState
} from 'react'
import {
  FlyBasePopper,
  FlyBasePopperCtrl,
  useController,
  useDisplayEffect
} from '@flyele/flyele-components'
import style from './index.module.scss'
import { IBaseProjectInfo } from '@flyele-nx/types'
import { useUserInfoStore } from '@flyele-nx/zustand-store'
import { useSpaceProjectList } from '../../hooks/useSpaceProjectList'
import { CheckBoxState, SPACE_TYPE } from '@flyele-nx/constant'
import { useUpdateEffect } from 'ahooks'
import { ProjectSelectorItem } from '../ProjectSelectorItem'
import { EmptyProjectList } from '../EmptyProjectList'
// import CreateProjectContainer from '../CreateProjectContainer'

type IProps = {
  project?: IBaseProjectInfo
  onVisibleChange?: (visible: boolean) => void
  needInheritSize?: boolean
  onConfirm: (data: IBaseProjectInfo) => void
  disableFirstPopover?: boolean
}

// 空项目
export const emptyProject: IBaseProjectInfo = {
  project_id: '', // 项目id
  project_name: '不放入项目（个人事项)', // 项目名称
  workspace_id: '',
  ws_type: SPACE_TYPE.private
}

export interface CreateProjectContainerRef {
  create: () => Promise<boolean> // 通过传入的项目数量进行创建
}

/**
 * 空间创建事项，项目选择器
 * 注意是空间创建事项，创建
 * **/
function _SpaceProjectSelector(props: PropsWithChildren<IProps>) {
  const { needInheritSize, children, onVisibleChange, disableFirstPopover } =
    props

  const ctrl = useController(new FlyBasePopperCtrl())

  const [dom, setDom] = useState<HTMLElement | null>(null)

  // 元素第一次被看见的时候自动弹出
  useDisplayEffect(() => {
    if (!disableFirstPopover)
      setTimeout(() => {
        ctrl.addClickAlwaysHide().show()
      }, 666)
    return () => {
      ctrl.hide()
    }
  }, dom)

  return (
    <FlyBasePopper
      controller={ctrl}
      mountNode="currentNode"
      onVisibleChange={onVisibleChange}
      trigger="click"
      showArrow={false}
      strategy="fixed"
      placement="bottom"
      content={<Content ctrl={ctrl} {...props} />}
      clickOnHide
      needInheritSize={needInheritSize}
      zIndex={9999}
    >
      <div style={{ display: 'inline-block', height: 'inherit' }} ref={setDom}>
        {children}
      </div>
    </FlyBasePopper>
  )
}
type IContentProps = IProps & {
  ctrl: FlyBasePopperCtrl
}
const Content = (props: IContentProps) => {
  const { ctrl, project, onConfirm } = props

  const spaceId = useMemo(() => {
    return project?.workspace_id ?? ''
  }, [project?.workspace_id])

  const userId = useUserInfoStore((state) => state.userInfo.user_id)

  const { projectList, run } = useSpaceProjectList({ spaceId })

  const [selectedProject, setSelectedProject] = useState<IBaseProjectInfo>(
    project ?? emptyProject
  )

  const createProjectRef = useRef<CreateProjectContainerRef>(null)

  useEffect(() => {
    // 没有选择项目的情况下 默认勾选一个
    if (!selectedProject?.project_id) {
      // 没有项目
      if (projectList.length > 0) {
        setSelectedProject(projectList[0])
      }
    }
  }, [projectList, selectedProject])

  // 回调事件
  useUpdateEffect(() => {
    if (selectedProject) {
      onConfirm && onConfirm({ ...selectedProject, ws_type: SPACE_TYPE.team })
    }
  }, [selectedProject])

  // 选择项目
  const onSelect = async (item: IBaseProjectInfo) => {
    setSelectedProject(item)
    // 延迟关闭，不然外部获取不了dom
    setTimeout(() => {
      ctrl.hide()
    }, 100)
  }

  const itemState = useCallback(
    (item: IBaseProjectInfo): CheckBoxState => {
      if (item.project_id === selectedProject?.project_id) {
        return CheckBoxState.checked
      }
      return CheckBoxState.unset
    },
    [selectedProject]
  )

  const onCreateProject = useCallback(() => {
    createProjectRef.current?.create()
    ctrl.removeClickAlwaysHide()
  }, [ctrl])

  // const inviteAfterPub = useCallback(() => {
  //   //TODO:刚刚迁移过来，先注释，后续补上
  //   // 邀请人邀请自己 pub
  //   // Pubjs.publish(sub.PROJECT_53_TAKER_ADD, {
  //   //   socketData: { rid: spaceId, o: userId },
  //   // })

  //   // Pubjs.publish(sub.REFRESH_SPACE_MEMBER_LIST)

  //   run()
  //   ctrl.addClickAlwaysHide()
  // }, [spaceId, userId])

  return (
    <>
      <div className={style.wrap}>
        <h1>选择项目</h1>
        <div className={style.content}>
          {projectList.length > 0 ? (
            projectList.map((item) => {
              return (
                <ProjectSelectorItem
                  key={item.project_id}
                  onSelect={onSelect}
                  state={itemState(item)}
                  item={item}
                />
              )
            })
          ) : (
            <EmptyProjectList onClick={onCreateProject} />
          )}
        </div>
      </div>

      {/* <CreateProjectContainer
        ref={createProjectRef}
        from="workspace"
        workspace_id={spaceId}
        onCreateSuccess={inviteAfterPub}
      /> */}
    </>
  )
}

export const SpaceProjectSelector = React.memo(_SpaceProjectSelector)
