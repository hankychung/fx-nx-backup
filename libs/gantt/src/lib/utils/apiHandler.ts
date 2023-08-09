import { projectApi } from '@flyele-nx/service'
import { ProjectHandler } from '@flyele-nx/zustand-handler'

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

    ProjectHandler.updateChildrenDict({ parentId: parent_id, children: res })

    return res
  }
}

export { ApiHandler }
