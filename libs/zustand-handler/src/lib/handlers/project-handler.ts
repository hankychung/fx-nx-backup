import { IFullViewTask } from '@flyele-nx/types'
import {
  IProjectState,
  useProjectStore,
  zustandUtils
} from '@flyele-nx/zustand-store'
import { produce } from 'immer'
import { projectApi } from '@flyele-nx/service'
type ITaskModifier = (task: IFullViewTask) => IFullViewTask
export class ProjectHandler {
  private projectId = ''

  private updateTimer: NodeJS.Timeout | null = null

  private updateList: string[] = []

  updateProjectId(id: string) {
    this.projectId = id
  }

  getProjectId() {
    return this.projectId
  }

  updateTaskDict(tasks: IFullViewTask[]) {
    useProjectStore.setState(
      produce((state: IProjectState) => {
        tasks.forEach((task) => {
          state.taskDict[zustandUtils.getProjectKey(task)] = {
            ...state.taskDict[zustandUtils.getProjectKey(task)],
            ...task
          }
        })
      })
    )
  }

  // 拉取子事项
  updateChildrenDict({
    parentId,
    children
  }: {
    parentId: string
    children: IFullViewTask[]
  }) {
    // 写入事项字典
    useProjectStore.getState().batchUpdateTask(children)
    // 更新子事项字典
    useProjectStore.setState(
      produce((state: IProjectState) => {
        state.childrenDict[parentId] = children.map((i) =>
          zustandUtils.getProjectKey(i)
        )
      })
    )

    console.log('[projectStore]: updateChildren', useProjectStore.getState())
  }

  // 插入事项
  async createTasks(taskIds: string[]) {
    await this.updateTasksByApi(taskIds)

    console.log('[projectStore]: createTasks', useProjectStore.getState())
  }

  // 修改事项
  batchModify({
    keys,
    diff
  }: {
    keys: string[]
    diff: Partial<IFullViewTask>
  }) {
    const { taskDict, batchUpdateTask } = useProjectStore.getState()

    const newTasks = keys.reduce<IFullViewTask[]>((list, key) => {
      const task = taskDict[key]

      if (task) {
        list.push({
          ...task,
          ...diff
        })
      }

      return list
    }, [])

    batchUpdateTask(newTasks)

    console.log('[projectStore]: batchModify', useProjectStore.getState())
  }

  // 删除事项
  removeTasks(taskIds: string[]) {
    const { taskDict, taskList } = useProjectStore.getState()

    const tasks = taskIds.map((id) => taskDict[id]).filter(Boolean)

    const parentTaskIds = [
      ...new Set(
        tasks.reduce<string[]>((pre, cur) => {
          const { parent_id } = cur

          if (parent_id) {
            pre.push(...parent_id.split(','))
          }

          return pre
        }, [])
      )
    ]

    useProjectStore.setState(
      produce<IProjectState>((state) => {
        // 从事项列表移除
        state.taskList = taskList.filter((id) => !taskIds.includes(id))

        // 从子事项列表移除
        if (parentTaskIds.length) {
          parentTaskIds.forEach((id) => {
            if (state.childrenDict[id]) {
              state.childrenDict[id] = state.childrenDict[id].filter(
                (id) => !taskIds.includes(id)
              )
            }
          })

          // state.childrenDict = childrenDict
        }
      })
    )

    console.log('[projectStore]: removeTasks', useProjectStore.getState())
  }

  // 移除协作人
  removeTakers({
    taskIds,
    takerIds
  }: {
    takerIds: string[]
    taskIds: string[]
  }) {
    useProjectStore.setState(
      produce<IProjectState>((state) => {
        const { taskDict } = state

        taskIds.forEach((id) => {
          const takers = taskDict[id].takers || []

          taskDict[id].takers = takers.filter(
            (t) => !takerIds.includes(t.taker_id)
          )
        })
      })
    )
  }

  tasksModifier(taskIds: string[], handler: ITaskModifier) {
    const { taskDict } = useProjectStore.getState()

    console.log('NX inner modifier', taskIds, taskDict)

    // TODO: 循环事项的更新需要考虑
    useProjectStore.setState(
      produce((state: IProjectState) => {
        taskIds.forEach((k) => {
          console.log('NX inner taker result', handler(taskDict[k]))
          if (state.taskDict[k]) {
            state.taskDict[k] = handler(taskDict[k])
          }
        })
      })
    )

    console.log(
      'NX inner modifier end project',
      useProjectStore.getState().taskDict
    )
  }

  // 更新事项
  async updateTasksByApi(taskIds: string[]) {
    if (this.updateTimer) {
      clearTimeout(this.updateTimer)
    }

    this.updateList.push(...taskIds)

    this.updateTimer = setTimeout(async () => {
      const { taskList } = useProjectStore.getState()

      const decentIds = [...new Set(this.updateList)]

      console.log('[updateByApi-ids]', decentIds)

      const { data } = await projectApi.getTaskListOfProject({
        projectId: this.projectId,
        tasks_id: decentIds.join(','),
        show_mode: 2,
        page_number: 1,
        page_record: 20
      })

      useProjectStore.setState(
        produce<IProjectState>((state) => {
          data.forEach((task) => {
            const { parent_id, task_id } = task
            const key = zustandUtils.getProjectKey(task)
            // 顶级事项
            if (!parent_id) {
              state.taskDict[key] = task

              // 当前列表不存在在插入至顶部
              if (!taskList.includes(key)) {
                state.taskList = [...new Set([key, ...taskList])]
              }

              return
            }
            console.log(state.expandDict, parent_id)
            state.expandDict[task_id] = false
            // 子孙事项 - 重置其父事项收合状态
            parent_id.split(',').forEach((id) => {
              state.expandDict[id] = false
            })
          })
        })
      )

      this.updateList = []

      console.log('[updateByApi-result]', useProjectStore.getState())
    }, 500)
  }

  // 收合
  expand(taskIds: string[], expand: boolean) {
    useProjectStore.setState(
      produce<IProjectState>((state) => {
        taskIds.forEach((id) => {
          state.expandDict[id] = expand
        })
      })
    )
  }
}
