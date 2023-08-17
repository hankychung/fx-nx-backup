import React, {
  ChangeEvent,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useState
} from 'react'
import { CommonPage } from '../../../common/page'
import styles from './index.module.scss'
import { useMemoizedFn, useUpdateEffect } from 'ahooks'
import { TeamContext } from '../../../../context/team'
import { projectApi, TaskApi, UsercApi, workspaceApi } from '@flyele-nx/service'
import {
  IBatchCreateParams,
  IIndustryInfo,
  IIndustryTemplate,
  IIndustryTaskGroupWithId,
  IIndustryTask
} from '@flyele-nx/types'
import { FlyCircleCheckBox, FlyTheme } from '@flyele/flyele-components'
import { Input, InputRef } from 'antd'
import { AddIcon } from '@flyele-nx/icon'
import {
  FlowOperateType,
  LOOP_MATTER,
  MatterType,
  QuadrantValue,
  TeamSize
} from '@flyele-nx/constant'
import dayjs from 'dayjs'
import cs from 'classnames'
import { globalNxController } from '@flyele-nx/global-processor'
import { GroupInput } from './components/group-input'
import type { IGroupInputRef } from './components/group-input'

type State = {
  [key: number]: string
}

type Action = {
  type: string
  index: number
  value: string
}

const _CreateProject = ({
  visible,
  goBack,
  goNext,
  onFinished
}: {
  visible: boolean
  goBack: () => void
  goNext: (params?: { createData?: IIndustryTemplate[] }) => void
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
  const [forceFocused, setForceFocused] = useState(-1)
  const [template, setTemplate] = useState<IIndustryTemplate[]>([])
  const [updateInfo, setUpdateInfo] = useState<{
    isUpdate: boolean
    index: number
  }>({
    isUpdate: false,
    index: 0
  })
  const spaceId = useRef('')
  const oldProjectName = useRef('') // 缓存下当前修改的input值
  const [inputValues, dispatch] = useReducer((state: State, action: Action) => {
    switch (action.type) {
      case 'set':
        return { ...state, [action.index]: action.value }
      default:
        throw new Error()
    }
  }, {})

  const projectInputRefs = useRef<InputRef[]>([])
  const groupInputRefs = useRef<IGroupInputRef[][]>([])

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
      globalNxController.showMsg({
        msgType: '错误',
        content: '创建空间失败'
      })
      return ''
    }
  }

  /**
   * 批量创建项目
   */
  const batchCreateProject = async (
    spaceId: string,
    dataParams: IIndustryTemplate[]
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
   * 根据数据设置时间
   */
  const setTaskTimeByParams = (task_time: IIndustryTask['task_time']) => {
    const time: {
      start_time_full_day?: 1 | 2 // 开始时间全天事项，1->否，2->是
      end_time_full_day?: 1 | 2 // 截止时间全天事项，1->否，2->是
      start_time?: number
      end_time?: number
    } = {}

    if (task_time && task_time.date) {
      let date
      if (/^下个月\d+号$/.test(task_time.date)) {
        const matchResult = task_time.date?.match(/\d+/)
        if (matchResult) {
          const dayOfMonth = parseInt(matchResult[0])
          date = dayjs().add(1, 'month').date(dayOfMonth)
        }
      } else if (/^周[一二三四五六日]$/.test(task_time.date)) {
        const weekMap: { [key: string]: number } = {
          一: 1,
          二: 2,
          三: 3,
          四: 4,
          五: 5,
          六: 6,
          日: 0
        }
        const dayOfWeek = weekMap[task_time.date[1]]
        date = dayjs().day(
          dayOfWeek >= dayjs().day() ? dayOfWeek : dayOfWeek + 7
        )
      } else {
        switch (task_time.date) {
          case '今天':
            date = dayjs()
            break
          case '明天':
            date = dayjs().add(1, 'day')
            break
          default:
            date = dayjs().date(parseInt(task_time.date))
            break
        }
      }
      if (date) {
        time.start_time = date
          .hour(parseInt(task_time.start_time.split(':')[0]))
          .minute(parseInt(task_time.start_time.split(':')[1]))
          .second(0)
          .unix()
        time.end_time = date
          .hour(parseInt(task_time.end_time.split(':')[0]))
          .minute(parseInt(task_time.end_time.split(':')[1]))
          .second(0)
          .unix()
        time.start_time_full_day = 1
        time.end_time_full_day = 1
      }
    }

    return time
  }

  /**
   * 根据项目id去查询底下的分组
   */
  const getGroupByProjectId = async (
    projectId: string,
    dataParams: IIndustryTemplate[]
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
                  const time = setTaskTimeByParams(task.task_time)

                  return {
                    temp_id: `task-${item.group_id}-${index}`,
                    title: task.title,
                    project_id: projectId,
                    group_id: item.group_id,
                    matter_type: MatterType.matter,
                    priority_level: QuadrantValue.no_important_no_urgent,
                    is_dispatch: 0,
                    operate_type: FlowOperateType.AND,
                    detail: task.detail,
                    repeat_type: task.repeat_type
                      ? task.repeat_type
                      : LOOP_MATTER.noLoop,
                    repeat_config: task.repeat_config,
                    end_repeat_at: task.end_repeat_at,
                    widget: {
                      execute_addr: false,
                      remind: true,
                      repeat: true,
                      time: true
                    },
                    ...time
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

  /**
   * 1、 删除默认空间
   * 2、 创建新空间
   * 3、 根据新空间id，批量创建项目，同时把分组也创建好
   * 4、 循环：根据新项目id，找到底下的分组列表，通过名字匹配找到 分组id
   * 5、 循环：找到对应的分组id后，如果底下有事项，需要批量创建事项
   * 6、 结束上面循环后，完成所有事情后，告诉后端新手引导已完成，跳转页面
   */
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

        onFinished()
        goNext({
          createData
        })
      }
    } finally {
      setLoading(false)
    }
  })

  const toggleCheckbox = (index: number) => {
    const updatedTemplate = [...template]
    const item = updatedTemplate[index]
    item.checked = item.checked === 'checked' ? 'normal' : 'checked'
    setTemplate(updatedTemplate)
  }

  const makeData = (data: IIndustryInfo[]): IIndustryTemplate[] => {
    return data.map((item, index) => {
      const taskGroup = item.task_group
      return {
        ...item,
        task_group: taskGroup.map((group) => {
          // 对于name的特殊处理
          let name = group.group_name
          if (group.add_month) {
            name = dayjs().add(group.add_month, 'month').format('MM月')
          }

          return {
            ...group,
            group_name: name,
            group_id: `${Math.random()}`
          }
        }),
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

  const onChangeGroupName = useMemoizedFn(
    (value: string, groupIndex: number, itemIndex: number) => {
      const updatedTemplate = [...template]
      const item = updatedTemplate[itemIndex].task_group
      const updatedGroup = item[groupIndex]
      if (value === '') {
        item.splice(groupIndex, 1)
      } else {
        updatedGroup.group_name = value
      }
      setTemplate(updatedTemplate)
    }
  )

  const onAddGroup = useMemoizedFn((index: number) => {
    const newGroup = {
      group_name: '',
      group_id: `${Math.random()}`
    }
    const updatedTemplate = [...template]
    const item = updatedTemplate[index].task_group
    item.push(newGroup)
    setTemplate(updatedTemplate)
    setUpdateInfo({ isUpdate: true, index: index })
  })

  useEffect(() => {
    if (updateInfo && updateInfo.isUpdate) {
      const { index } = updateInfo
      const item = template[index].task_group
      // 获取对应的GroupInput组件的ref对象
      const groupIndex = item.length - 1
      const groupInputRef = groupInputRefs.current[index][groupIndex]

      // 调用changeInEdit方法将其设置为true，进入编辑状态
      if (groupInputRef) {
        groupInputRef.changeInEdit(true)
      }

      setUpdateInfo({ isUpdate: false, index: 0 })
    }
  }, [updateInfo, template])

  const onAddProject = useMemoizedFn(() => {
    if (template.length >= 20) {
      globalNxController.showMsg({
        msgType: '错误',
        content: '最多创建20个项目'
      })
      return
    }
    const newProject: IIndustryTemplate = {
      display_mode: 2,
      group_display: 'default',
      is_edit: true,
      project_name: '未命名项目',
      task_group: [
        { group_name: '待处理', group_id: `${Math.random()}` },
        { group_name: '进行中', group_id: `${Math.random()}` },
        { group_name: '已完成', group_id: `${Math.random()}` }
      ],
      checked: 'checked'
    }
    const updatedTemplate = [...template]
    updatedTemplate.push(newProject)
    const length = updatedTemplate.length
    setTemplate(updatedTemplate)
    setForceFocused(length - 1)
  })

  const createData = useMemo(() => {
    return template.filter(
      (item) => item.checked === 'checked' && item.project_name !== ''
    )
  }, [template])

  useEffect(() => {
    if (visible) {
      if (oldIndustryId.current === activeIndustryTag) return

      setTemplate([])
      fetchTemplate(activeIndustryTag)
    }
  }, [visible, activeIndustryTag, fetchTemplate])

  useUpdateEffect(() => {
    if (forceFocused > 0) {
      projectInputRefs.current[forceFocused]?.focus()
      setForceFocused(-1)
    }
  }, [forceFocused])

  return (
    <CommonPage
      visible={visible}
      title="团队有哪些工作项目"
      desc=""
      disableNext={false}
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
                    ref={(ref) =>
                      ref && (projectInputRefs.current[index] = ref)
                    }
                    defaultValue={item.project_name}
                    value={inputValues[index]}
                    placeholder="请输入项目名称"
                    maxLength={16}
                    bordered={false}
                    style={{ maxWidth: '256px', fontSize: '16px' }}
                    onFocus={(e) => {
                      oldProjectName.current = e.target.value
                    }}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                      dispatch({ type: 'set', index, value: e.target.value })
                    }}
                    onBlur={(e: ChangeEvent<HTMLInputElement>) => {
                      if (inputValues[index] === '') {
                        dispatch({
                          type: 'set',
                          index,
                          value: oldProjectName.current
                        })
                      }

                      if (!e.target.value) return

                      const updatedTemplate = [...template]
                      const item = updatedTemplate[index]
                      item.project_name = e.target.value
                      setTemplate(updatedTemplate)
                    }}
                  />
                </div>
              </div>
              {item.is_edit && (
                <div className={styles.itemRight}>
                  <div className={styles.text}>包含</div>
                  <div className={styles.groupBox}>
                    {item.task_group.map((taskGroup, groupIndex) => {
                      if (!groupInputRefs.current[index]) {
                        groupInputRefs.current[index] = []
                      }
                      return (
                        <GroupInput
                          key={taskGroup.group_id}
                          ref={(ref) =>
                            ref &&
                            (groupInputRefs.current[index][groupIndex] = ref)
                          }
                          value={taskGroup.group_name}
                          groupIndex={groupIndex}
                          index={index}
                          onChange={onChangeGroupName}
                        />
                      )
                    })}
                    {item.task_group && item.task_group.length < 12 && (
                      <div
                        className={styles.addBtn}
                        onClick={() => onAddGroup(index)}
                      >
                        <AddIcon width={10} height={10} color="#B4B4B4" />
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )
        })}
        <div
          className={cs(styles.projectItem, styles.moreBtn)}
          onClick={onAddProject}
        >
          <div className={styles.addBtn}>
            <AddIcon width={10} height={10} color="#B4B4B4" />
          </div>
          自定义
        </div>
      </div>
    </CommonPage>
  )
}

export const CreateProject = React.memo(_CreateProject)
