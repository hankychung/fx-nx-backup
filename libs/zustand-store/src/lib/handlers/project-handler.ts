import { IFullViewTask } from '@flyele-nx/types'
import { IProjectState, useProjectStore } from '../useProjectStore'
import { produce } from 'immer'

export class ProjectHandler {
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
  }
}
