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
        parent_id: parentId
      })
    ).data

    ProjectHandler.updateChildrenDict({ parentId, children: res })

    return res
  }
}

export { ApiHandler }
