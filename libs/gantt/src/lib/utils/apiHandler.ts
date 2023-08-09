import { projectApi } from '@flyele-nx/service'
import { GanttHandler } from './ganttHandler'
import { IFullViewTask } from '@flyele-nx/types'

class ApiHandler {
  private static projectId = ''

  static updateProjectId(id: string) {
    this.projectId = id
  }

  static async getChildren(parentId: string) {
    const res = (
      await projectApi.getTaskListOfProject({
        projectId: this.projectId,
        page_number: 1,
        parent_id: parentId,
        show_mode: 2
      })
    ).data
    const parent_id = parentId.split(',')[1]
      ? parentId.split(',')[1]
      : parentId.split(',')[0]

    const data = res?.map((i: IFullViewTask) => ({
      ...i,
      start: i.start_time ? new Date(i.start_time * 1000) : new Date(),
      end: i.end_time ? new Date(i.end_time * 1000) : new Date(),
      name: i.title,
      id: i.task_id,
      type: 'task',
      hideChildren: false,
      displayOrder: 1
    }))

    GanttHandler.updateChildrenDict({ parentId: parent_id, children: data })

    return res
  }
}

export { ApiHandler }
