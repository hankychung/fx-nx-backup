import { service } from '../service'
import { FullViewParams, FullViewTask, IProjectInfo } from '@flyele-nx/types'
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
  getTaskListOfProject(params: FullViewParams & { projectId?: string }) {
    const { projectId } = params

    delete params.projectId

    return service.get<FullViewTask[]>({
      url: `${this.prefix}/${projectId}/task_view/list`,
      params: { ...params }
    })
  }
}
export const projectApi = new Project()
