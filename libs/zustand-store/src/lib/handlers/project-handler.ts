import { IFullViewTask } from '@flyele-nx/types'
import { IProjectState, useProjectStore } from '../useProjectStore'
import { produce } from 'immer'

export class ProjectHandler {
  // 拉取子事项
  static updateChildrenDict({
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
  static createTasks(taskIds: string[]) {
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
}
