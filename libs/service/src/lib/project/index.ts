import { service } from '../service'
import { IFullViewParams, IFullViewTask, IProjectInfo } from '@flyele-nx/types'
class Project {
  private prefix = 'flyele/v2/project'
  /**
   * 获取项目详情
   */
  getDetail(params: { projectId: string }) {
    return service.get<IProjectInfo>({
      url: `${this.prefix}/${params.projectId}`
    })
  }

  // 获取项目事项列表
  getTaskListOfProject(params: IFullViewParams & { projectId?: string }) {
    const { projectId } = params

    delete params.projectId

    return service.get<IFullViewTask[]>({
      url: `${this.prefix}/${projectId}/task_view/list`,
      params: { ...params, page_number: params.page_number || 1 }
    })
  }
}
export const projectApi = new Project()
