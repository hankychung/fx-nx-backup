import { service } from '../service'
import {
  ISpaceList,
  ISpaceListParams,
  ISpaceMoveToSpaceParams,
  SpaceConfigItem,
  ISpaceCreateParams
} from '@flyele-nx/types'

class Workspace {
  private prefix = 'flyele/v2/workspace'
  /**
   * 获取空间列表
   */
  getSpaceList(params: ISpaceListParams) {
    return service.get<ISpaceList>({
      url: `${this.prefix}/list`,
      params
    })
  }

  /**
   * 创建空间
   */
  createSpace(data: ISpaceCreateParams) {
    return service.post({
      url: `${this.prefix}`,
      data
    })
  }

  /**
   * (项目) 移动到空间
   */
  moveToSpace(workspace_id: string, data: ISpaceMoveToSpaceParams) {
    return service.post({
      url: `${this.prefix}/${workspace_id}/import_project`,
      data
    })
  }

  /**
   * 获取空间配置列表
   * @param resource_type 配置类型 1、头像 2、背景 3、头像颜色
   */
  getSpaceConfig<T extends '1' | '2' | '3'>(resource_type: T) {
    return service.get<SpaceConfigItem<T>[]>({
      url: `${this.prefix}/resources`,
      params: { resource_type }
    })
  }

  /**
   * 删除默认空间
   */
  deleteDefaultSpace() {
    return service.post({
      url: `${this.prefix}/default/dissolve`
    })
  }
}
export const workspaceApi = new Workspace()
