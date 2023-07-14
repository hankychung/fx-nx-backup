import { service } from '../service'
import { IProjectInfo } from '../typings/project'

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
}
export const projectApi = new Project()
