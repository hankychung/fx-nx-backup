import React, {
  ChangeEvent,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState
} from 'react'
import { CommonPage } from '../../../common/page'
import styles from './index.module.scss'
import { useMemoizedFn } from 'ahooks'
import { TeamContext } from '../../../../context/team'
import { projectApi, TaskApi, UsercApi, workspaceApi } from '@flyele-nx/service'
import {
  IBatchCreateParams,
  IIndustryInfo,
  IIndustryTaskGroup
} from '@flyele-nx/types'
import { FlyCircleCheckBox, FlyTheme } from '@flyele/flyele-components'
import { Input } from 'antd'
import { AddIcon } from '@flyele-nx/icon'
import {
  FlowOperateType,
  MatterType,
  QuadrantValue,
  TeamSize
} from '@flyele-nx/constant'
import dayjs from 'dayjs'

interface ITemplate extends IIndustryInfo {
  checked: 'checked' | 'normal'
}

interface IIndustryTaskGroupWithId extends IIndustryTaskGroup {
  group_id: string // 分组id
}

const _CreateProject = ({
  visible,
  goBack,
  goNext,
  onFinished
}: {
  visible: boolean
  goBack: () => void
  goNext: () => void
  onFinished: () => void
}) => {
  const {
    userId,
    activeIndustryTag,
    activeTeamSize,
    activeIndustryTagTitle,
    spaceName,
    spaceInfo,
    setSpaceId
  } = useContext(TeamContext)
  const oldIndustryId = useRef(0)

  const [loading, setLoading] = useState(false)
  const [template, setTemplate] = useState<ITemplate[]>([])
  const spaceId = useRef('')

  const onGoBack = useMemoizedFn(() => {
    goBack()
  })

  /**
   * 删除默认空间
   */
  const deleteDefaultSpace = async () => {
    try {
      await workspaceApi.deleteDefaultSpace()
    } catch (e) {
      console.log('@@@ 删除默认空间失败', e)
    }
  }

  /**
   * 创建新空间
   */
  const createSpace = async () => {
    try {
      const scale =
        TeamSize.find((size) => size.id === activeTeamSize)?.title || ''
      const params = {
        icon: spaceInfo.icon,
        icon_color: spaceInfo.icon_color,
        name: spaceName,
        level: 1,
        bg_icon: 'bg_base01', // 这个在旧代码里面是随机，现在固定算了， 旧代码 搜 useRandomConfig
        have_upload_file: false,
        user_ids: [userId],
        business: activeIndustryTagTitle,
        scale: `${scale} 人`
      }
      const { data } = await workspaceApi.createSpace(params)
      spaceId.current = data
      setSpaceId && setSpaceId(data)

      return data
    } catch (e) {
      console.log('@@@ 创建空间失败', e)
      return ''
    }
  }

  /**
   * 批量创建项目
   */
  const batchCreateProject = async (
    spaceId: string,
    dataParams: ITemplate[]
  ) => {
    const requestList = dataParams.map((project) => {
      const projectParams = {
        project_name: project.project_name,
        workspace_id: spaceId,
        group_names: project.task_group.map((group) => group.group_name)
      }
      return projectApi.createProject(projectParams)
    })

    const allResults = await Promise.all(requestList)

    if (allResults.length) {
      return allResults.map((item) => {
        return item.data
      })
    } else {
      return []
    }
  }

  /**
   * 批量创建事项
   */
  const batchCreateTask = async (params: IBatchCreateParams[]) => {
    try {
      await TaskApi.batchCreateTask({
        tasks: params
      })
    } catch (e) {
      console.log('@@@ 批量创建事项失败', e)
    }
  }

  /**
   * 根据项目id去查询底下的分组
   */
  const getGroupByProjectId = async (
    projectId: string,
    dataParams: ITemplate[]
  ) => {
    try {
      const { data } = await projectApi.getGroup(projectId)

      if (data && data.length) {
        const groupIds: IIndustryTaskGroupWithId[] = []

        dataParams.forEach((template) => {
          template.task_group.forEach((taskGroup) => {
            const group = data.find(
              (group) => group.name === taskGroup.group_name
            )

            if (group) {
              groupIds.push({
                group_id: group.id,
                group_name: taskGroup.group_name,
                tasks: taskGroup.tasks
              })
            }
          })
        })

        if (groupIds.length) {
          for (let i = 0; i < groupIds.length; i++) {
            const item = groupIds[i]
            const { tasks } = item
            if (tasks && tasks.length) {
              const allTasksParams: IBatchCreateParams[] = tasks.map(
                (task, index) => {
                  return {
                    temp_id: `task-${item.group_id}-${index}`,
                    title: task.title,
                    project_id: projectId,
                    group_id: item.group_id,
                    matter_type: MatterType.matter,
                    priority_level: QuadrantValue.no_important_no_urgent,
                    repeat_type: 0,
                    is_dispatch: 0,
                    operate_type: FlowOperateType.AND,
                    start_time_full_day: 2,
                    start_time: dayjs().startOf('day').unix(),
                    end_time: dayjs().endOf('day').unix(),
                    end_time_full_day: 2,
                    widget: {
                      execute_addr: false,
                      remind: true,
                      repeat: true,
                      time: true
                    }
                  }
                }
              )

              await batchCreateTask(allTasksParams)
            }
          }
        }
      }
    } catch (e) {
      console.log('@@@ 获取分组失败', e)
    }
  }

  const onGoNext = useMemoizedFn(async () => {
    if (loading) return
    setLoading(true)
    try {
      await deleteDefaultSpace()
      const newSpaceId = await createSpace()
      if (newSpaceId) {
        const allProjectIds = await batchCreateProject(newSpaceId, createData)

        if (allProjectIds.length) {
          for (let i = 0; i < allProjectIds.length; i++) {
            await getGroupByProjectId(allProjectIds[i].project_id, createData)
          }
        }
      }
    } finally {
      setLoading(false)
    }
    onFinished()
    goNext()
  })

  const toggleCheckbox = (index: number) => {
    const updatedTemplate = [...template]
    const item = updatedTemplate[index]
    item.checked = item.checked === 'checked' ? 'normal' : 'checked'
    setTemplate(updatedTemplate)
  }

  const makeData = (data: IIndustryInfo[]): ITemplate[] => {
    return data.map((item, index) => {
      return {
        ...item,
        checked: index > 1 ? 'normal' : 'checked'
      }
    })
  }

  const fetchTemplate = useMemoizedFn(async (industryId: number) => {
    try {
      const { data } = await UsercApi.getIndustryInfo(industryId)
      const newData = makeData(data)

      setTemplate(newData)
    } catch (e) {
      console.log('@@@ 获取模版失败', e)
    }
  })

  const createData = useMemo(() => {
    return template.filter((item) => item.checked === 'checked')
  }, [template])

  useEffect(() => {
    if (visible) {
      if (oldIndustryId.current === activeIndustryTag) return

      fetchTemplate(activeIndustryTag)
    }
  }, [visible, activeIndustryTag, fetchTemplate])

  return (
    <CommonPage
      visible={visible}
      title="团队有哪些工作项目"
      desc=""
      disableNext={!createData.length}
      loadingNext={loading}
      goBack={onGoBack}
      goNext={onGoNext}
    >
      <div className={styles.createProjectRoot}>
        {template.map((item, index) => {
          return (
            <div key={index} className={styles.projectItem}>
              <div className={styles.itemLeft}>
                <div
                  className={styles.checkBox}
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    toggleCheckbox(index)
                  }}
                >
                  <FlyCircleCheckBox
                    size={18}
                    state={item.checked}
                    theme={FlyTheme.primary}
                  />
                </div>

                <div className={styles.projectName}>
                  <Input
                    value={item.project_name}
                    placeholder="请输入项目名称"
                    maxLength={16}
                    bordered={false}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                      const updatedTemplate = [...template]
                      const item = updatedTemplate[index]
                      item.project_name = e.target.value
                      setTemplate(updatedTemplate)
                    }}
                    style={{ maxWidth: '256px', fontSize: '16px' }}
                  />
                </div>
              </div>
              {item.is_edit && (
                <div className={styles.itemRight}>
                  <div className={styles.text}>包含</div>
                  <div className={styles.groupBox}>
                    {item.task_group.map((taskGroup, index) => {
                      return (
                        <div key={index} className={styles.groupItem}>
                          {taskGroup.group_name}
                        </div>
                      )
                    })}
                    <div className={styles.addBtn}>
                      <AddIcon width={10} height={10} color="#B4B4B4" />
                    </div>
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </CommonPage>
  )
}

export const CreateProject = React.memo(_CreateProject)
