import { service } from '../service'
import {
  ISpaceList,
  ISpaceListParams,
  ISpaceMoveToSpaceParams,
  SpaceConfigItem,
  ISpaceCreateParams,
  IProject
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

  /**
   * 获取空间中的项目列表
   * @param workspace_id
   * @param params: {query_type:number,is_filter_archive:boolean} 请求参数
   *  query_type: 0我是谁？  1查询自己的 2查询全部项目，只有管理员能查到 3 查询收藏的项目
   *  is_filter_archive: 过滤归档
   */
  getProjectsBySpace(
    workspace_id: string,
    params?: { query_type?: 0 | 1 | 2 | 3; is_filter_archive?: boolean }
  ) {
    return service.get<IProject[]>({
      url: `${this.prefix}/${workspace_id}/projects`,
      params
    })
  }

  /**
   * 项目列表匹配接口
   * @param args {{query_type,workspace_id}}
   * query_type 1 在此空间的项目 2 非此空间的项目（没有个人项目）  3 非此空间的所有项目（个人项目）
   * workspace_id = '-1' 配合  query_type = 2 获取全部项目
   * **/
  getProjectListMatch(args: { query_type: 1 | 2 | 3; workspace_id: string }) {
    const { query_type, workspace_id } = args

    return service.get<IProject[]>({
      url: `${this.prefix}/${workspace_id}/projects/match`,
      params: { query_type }
    })
  }
}
export const workspaceApi = new Workspace()
