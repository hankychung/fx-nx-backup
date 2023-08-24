import { ImportEnterPath } from '@flyele-nx/constant'
import { service } from '../service'
import {
  CommonResponse,
  IFullViewParams,
  IFullViewTask,
  IProjectCreateParams,
  IProjectGroup,
  IProjectInfo,
  IProjectMember,
  IResponse
} from '@flyele-nx/types'
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

  /**
   * 创建项目
   */
  createProject(params: IProjectCreateParams) {
    return service.post<IResponse<{ project_id: string }>>({
      url: this.prefix,
      data: params
    })
  }

  /**
   * 查询分组列表
   */
  getGroup(projectId: string) {
    return service.get<IProjectGroup[]>({
      url: `${this.prefix}/${projectId}/group_list`
    })
  }

  /**
   * 创建分组
   * @param projectId 项目Id
   * @param group 待删除的分组Id
   */
  createGroup(
    projectId: string,
    group: {
      name: string
    }
  ) {
    return service.post({
      url: `${this.prefix}/${projectId}/group`,
      data: group
    })
  }

  /**
   * 移动项目分组中的事项
   * @param projectId 项目Id
   * @param data 移动的内容
   */
  moveGroupTask(
    projectId: string,
    data: {
      group_id: string
      new_group_id: string
      parent_id?: string
      task_id?: string
    }
  ) {
    return service.put({
      url: `${this.prefix}/${projectId}/group/task/change`,
      data
    })
  }

  /**
   * 项目批量导入事项
   * **/
  importTask({
    task_group_id,
    // spaceId,
    // projectTitle,
    projectId,
    taskIds
  }: // path
  {
    spaceId: string
    projectTitle: string
    projectId: string
    taskIds: string[]
    task_group_id?: string
    path?: ImportEnterPath
  }) {
    const res = service.post({
      url: `${this.prefix}/${projectId}/import_task`,
      data: {
        task_group_id,
        tasks_id: taskIds
      }
    })

    //TODO:JC.....
    // const import_issue_people_id = store.getState().user.userInfo.user_id

    // if (path)
    // SEN__import_matter({
    //   space_id: spaceId,
    //   business_type: BusinessType.matter, // 事项类型
    //   issue_id: taskIds.join(','), // 事项 id
    //   create_issue_time: dayjs().format('YYYY-MM-DD HH:mm:ss'), // 创建时间
    //   project_title: projectTitle, // 所属项目 title
    //   project_id: projectId, // 所属项目 id
    //   import_issue_people_id, // 导入人 id
    //   enter_page: path, // 进入页面入口
    // })

    return res
  }

  /**
   * 获取项目中的协作人列表
   * @param projectId
   * @returns
   */
  getMemberInProject(projectId: string) {
    return service
      .get<IProjectMember[]>({
        url: `${this.prefix}/${projectId}/members`
      })
      .then((res) => {
        // 过滤掉所有被撤回的人
        const _res = {
          ...res,
          data: [...res.data.filter((t: any) => t.state !== 10304)]
        }

        return _res as CommonResponse<IProjectMember[]>
      })
  }
}
export const projectApi = new Project()
