import { IFullViewTask } from '@flyele-nx/types'
import {
  IProjectState,
  useProjectStore,
  useUserInfoStore
} from '@flyele-nx/zustand-store'
import { produce } from 'immer'
import { projectApi } from '@flyele-nx/service'

export class ProjectHandler {
  constructor(private projectId: string) {}

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
        state.childrenDict[parentId] = children.map((i) => i.task_id)
      })
    )

    console.log('[projectStore]: updateChildren', useProjectStore.getState())
  }

  // 插入事项
  createTasks(taskIds: string[]) {
    // TODO: 写入事项字典 调用接口更新

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
    const { taskDict, taskList, childrenDict } = useProjectStore.getState()

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
            if (childrenDict[id]) {
              childrenDict[id] = childrenDict[id].filter(
                (id) => !taskIds.includes(id)
              )
            }
          })

          state.childrenDict = childrenDict
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
    const { user_id } = useUserInfoStore.getState().userInfo

    if (takerIds.includes(user_id)) {
      this.removeTasks(taskIds)

      return
    }

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

  // 更新事项
  updateTasksByApi(taskIds: string[]) {
    // do something
  }
}
