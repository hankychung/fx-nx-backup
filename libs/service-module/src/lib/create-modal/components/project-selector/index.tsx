import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState
} from 'react'
import { GragArrow, ProjectIcon } from '@flyele-nx/icon'
import { FlyBasePopperCtrl, useController } from '@flyele/flyele-components'
import { pick } from 'lodash'
import cs from 'classnames'
import style from './index.module.scss'
import { IBaseProjectInfo, IProject, IProjectGroup } from '@flyele-nx/types'
import { useUserInfoStore } from '@flyele-nx/zustand-store'
import { unsetProject } from './hooks/useProjectList'
import { projectApi, workspaceApi } from '@flyele-nx/service'
import { SpaceProjectSelector } from './components/SpaceProjectSelector'
import { BuildBtn } from './components/BuildBtn/BuildBtn'
import { ProjectAndMatterGroupSelector } from './components/ProjectAndMatterGroupSelector'
import { MatterCreateCell } from '@flyele-nx/ui'
import { MatterGroupSelector } from './components/MatterGroupSelector'

interface IProps {
  /** 是否会议 */
  isMeeting?: boolean
  project?: IBaseProjectInfo
  showProjectSelector?: boolean
  onChangeProject?: (data: IBaseProjectInfo) => void
  onChangeProjectAndGrounp: (project: IBaseProjectInfo, groupId: string) => void
  groupId?: string
  setShowProjectSelector?: React.Dispatch<React.SetStateAction<boolean>>
}

const defaultProjectGroup = {
  project_id: '',
  project_name: '',
  group_id: '',
  group_name: ''
}

const pickBaseProjectInfo = <T extends IBaseProjectInfo>(
  obj: T
): IBaseProjectInfo =>
  pick(obj, [
    'ws_levle',
    'project_id',
    'project_name',
    'workspace_name',
    'workspace_id',
    'ws_type'
  ])

export const ProjectSelector: React.FC<IProps> = (props) => {
  const {
    isMeeting,
    project,
    onChangeProjectAndGrounp,
    onChangeProject,
    showProjectSelector = false,
    groupId,
    setShowProjectSelector
  } = props

  const spaceId = project?.workspace_id ?? undefined

  const userId = useUserInfoStore((state) => state.userInfo.user_id)

  const [projectList, setProjectList] = useState<IProject[]>([unsetProject])

  useLayoutEffect(() => {
    const fetchProject = async () => {
      if (spaceId) {
        const { data } = await workspaceApi.getProjectsBySpace(spaceId)

        setProjectList([...data, unsetProject])
      } else {
        const { data } = await workspaceApi.getProjectListMatch({
          workspace_id: '10000',
          query_type: 3
        })

        setProjectList([...data, unsetProject])
      }
    }

    fetchProject()
  }, [spaceId])

  /** 项目状态 **/
  const projectAndMatterCtrl = useController(new FlyBasePopperCtrl())
  const groupCtrl = useController(new FlyBasePopperCtrl())
  // 项目箭头按钮
  const [projectVisible, setProjectVisible] = useState(false)

  const disable = false
  const hideGroup = false

  const [selProjectAndGroup, setSelProjectAndGroup] =
    useState(defaultProjectGroup)

  // 根据 传进来的 redux 的 project 来初始化选项
  useEffect(() => {
    const initSelProjectAndGroup = async (project?: IBaseProjectInfo) => {
      if (!project || !project.project_id) {
        setSelProjectAndGroup(defaultProjectGroup)
        return
      }

      // 每次新的 project 来都重新那一次新的 这个空间的 项目列表，因为如果是新建的项目，旧的项目列表会找不到
      const { data: groupList } = await projectApi.getGroup(project.project_id)
      let group = groupList[0]

      if (groupId) {
        const item = groupList.find((i) => i.id === groupId)

        if (item) group = { ...item }
      }
      console.log(
        project,
        'setSelProjectAndGroupsetSelProjectAndGroupsetSelProjectAndGroup'
      )

      setSelProjectAndGroup({
        project_id: project.project_id,
        project_name: project.project_name,
        group_id:
          selProjectAndGroup.group_id &&
          selProjectAndGroup.project_id === project.project_id
            ? selProjectAndGroup.group_id
            : group.id,
        group_name:
          selProjectAndGroup.group_name &&
          selProjectAndGroup.project_id === project.project_id
            ? selProjectAndGroup.group_name
            : group.name
      })
    }

    initSelProjectAndGroup(project)
  }, [project, groupId, selProjectAndGroup])

  const selProject = useMemo(() => {
    console.log('project', project)
    if (!project) {
      return unsetProject
    }
    console.log('projectList', projectList)
    const found = projectList.find((i) => i.project_id === project.project_id)

    return found ?? unsetProject
  }, [projectList, project])

  const isProjectCreator =
    selProject.project_id === '' ? true : userId === selProject.creator_id

  const onShowProject = useCallback(() => {
    projectAndMatterCtrl.addClickAlwaysHide().show()
  }, [projectAndMatterCtrl])

  const onProjectVisibleChange = useCallback((v: boolean) => {
    setProjectVisible(v)
  }, [])

  /** 分组状态 **/
  const [groupVisible, setGroupVisible] = useState(false)

  const onGroupVisibleChange = useCallback((v: boolean) => {
    setGroupVisible(v)
  }, [])

  // 单单修改分组
  const onGroup = async (value: IProjectGroup) => {
    const newProjectAndGroupObj = {
      ...selProjectAndGroup,
      group_id: value.id,
      group_name: value.name
    }

    setSelProjectAndGroup(newProjectAndGroupObj)

    const newBaseProjectInfo = pickBaseProjectInfo(selProject)

    onChangeProjectAndGrounp(newBaseProjectInfo, value.id)
  }

  // 选择了项目和分组
  const onConfirm = (value: IBaseProjectInfo & IProjectGroup) => {
    const newProjectAndGroupObj = {
      project_id: value.project_id,
      project_name: value.project_name,
      group_id: value.id,
      group_name: value.name
    }

    setSelProjectAndGroup(newProjectAndGroupObj)

    const newBaseProjectInfo: IBaseProjectInfo = pickBaseProjectInfo(value)

    onHideProject()

    onChangeProjectAndGrounp(newBaseProjectInfo, value.id)
  }

  // 隐藏
  const onHideProject = useCallback(() => {
    setTimeout(() => projectAndMatterCtrl.hide(), 300)
  }, [projectAndMatterCtrl])

  // 不放入项目
  const onNotProject = (_v: IBaseProjectInfo) => {
    setSelProjectAndGroup(defaultProjectGroup)
    onHideProject()

    const emptyProject = projectList.find((i) => i.project_id === '')!
    const newBaseProjectInfo = pickBaseProjectInfo(emptyProject)

    onChangeProjectAndGrounp(newBaseProjectInfo, '')
  }

  useEffect(() => {
    projectAndMatterCtrl.addListener((event) => {
      if (event) {
        const bool = { hide: false, show: true }[event]

        setProjectVisible(bool)
      }
    })
  }, [projectAndMatterCtrl])

  return (
    <MatterCreateCell
      img={() => <ProjectIcon />}
      cellCla={style.matter_cell_cla}
      cellContentCla={cs(
        isMeeting ? style.meeting_content : style.matter__cell_content_cla
      )}
    >
      {showProjectSelector ? (
        <div className={style.wrap}>
          <SpaceProjectSelector
            project={project}
            onConfirm={(data) => {
              onChangeProject?.(data)
            }}
            disableFirstPopover={false}
          >
            <BuildBtn
              disable={false}
              visible={showProjectSelector}
              text={selProject.project_name || ''}
              className={style.btn}
            >
              <GragArrow />
            </BuildBtn>
          </SpaceProjectSelector>
        </div>
      ) : (
        <div className={style.wrap}>
          {/** 项目 **/}
          <ProjectAndMatterGroupSelector
            disbleCheckDifferentProject
            disable={disable}
            project={selProject}
            ctrl={projectAndMatterCtrl}
            onConfirm={onConfirm}
            onNotProject={onNotProject}
            groupId={selProjectAndGroup.group_id}
            onVisibleChange={onProjectVisibleChange}
            // wrapClassName={style.wrap_bar}
          >
            <BuildBtn
              disable={disable}
              visible={projectVisible}
              text={
                selProject.project_id === ''
                  ? '个人事项'
                  : selProject.project_name
              }
              className={style.btn}
            >
              <div onClick={onShowProject} className={style.arrow}>
                <GragArrow />
              </div>
            </BuildBtn>
          </ProjectAndMatterGroupSelector>
          {selProject.project_id && !hideGroup && (
            <div className={style.arrow}>{'>'}</div>
          )}

          {/** 分组 **/}
          {selProjectAndGroup.project_id && !hideGroup && (
            <MatterGroupSelector
              trigger="click"
              strategy="fixed"
              ctrl={groupCtrl}
              disableCreate={!isProjectCreator}
              disable={disable}
              groupId={selProjectAndGroup.group_id}
              projectId={selProjectAndGroup.project_id}
              onUpdateCb={onGroup}
              onVisibleChange={onGroupVisibleChange}
            >
              <BuildBtn
                disable={disable}
                visible={groupVisible}
                text={selProjectAndGroup.group_name}
                className={style.btn}
              >
                <div
                  onClick={() => {
                    groupCtrl.addClickAlwaysHide().show()
                  }}
                >
                  <GragArrow />
                </div>
              </BuildBtn>
            </MatterGroupSelector>
          )}
        </div>
      )}
    </MatterCreateCell>
  )
}
