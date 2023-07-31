import { service } from '../service'
import { ISpaceList } from '@flyele-nx/types'

export interface SpaceListParams {
  workspace_id?: string
  keyword?: string
  query_external?: boolean
}

/**
 * (项目) 移动到空间请求参数
 */
export interface MoveToSpaceParams {
  project_id: string
  current_workspace_id: string
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

  /**
   * (项目) 移动到空间
   */
  moveToSpace(workspace_id: string, data: MoveToSpaceParams) {
    return service.post({
      url: `${this.prefix}/${workspace_id}/import_project`,
      data
    })
  }
}
export const workspaceApi = new Workspace()
