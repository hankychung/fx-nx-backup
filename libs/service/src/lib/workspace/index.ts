import { service } from '../service'
import { ISpaceList } from '../typings/space'

export interface SpaceListParams {
  workspace_id?: string
  keyword?: string
  query_external?: boolean
}

class Workspace {
  private prefix = 'flyele/v2/workspace'
  /**
   * 获取空间列表
   */
  getSpaceList(params: SpaceListParams) {
    return service.get<ISpaceList>({
      url: `${this.prefix}/list`,
      params
    })
  }
}
export const workspaceApi = new Workspace()
