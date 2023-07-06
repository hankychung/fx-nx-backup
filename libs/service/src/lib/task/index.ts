import { service } from '../service'
import { CommonResponse, IExternalListResponse } from '../typings'
import {
  IScheduleTask,
  IHoliday,
  IRelation,
  ICreateParams
} from '../typings/schedule'
import { IWorkflowStep } from '../typings/workflow'

interface IGetScheduleTreeParams {
  taskId: string
  queryType?: number
}

interface IRepeatParams {
  task_id: string
  repeat_id: string
}

class Task {
  private prefix = 'flyele/v2/tasks'
  private prefixTask = 'flyele/v2/task'

  // 获取所有下级事项
  async getScheduleTree(
    params: IGetScheduleTreeParams
  ): Promise<CommonResponse<IScheduleTask[]>> {
    return await service.get({
      url: `${this.prefix}/schedule/children/tree`,
      params: {
        query_type: params.queryType || 1,
        task_id: params.taskId
      }
    })
  }

  async search({
    pageRecord = 20,
    pageNumber = 1,
    title,
    refId,
    batchId,
    lastExitAt
  }: {
    pageRecord?: number
    pageNumber?: number
    title?: string
    refId: string
    batchId?: string
    lastExitAt?: number
  }) {
    const res = await service.get<IScheduleTask[]>({
      url: `${this.prefix}/search`,
      params: {
        page_record: pageRecord,
        page_number: pageNumber,
        title,
        ref_task_id: refId,
        batch_id: batchId,
        last_exit_at: lastExitAt
      }
    })

    return res
  }

  // 完成循环事项
  repeatFinish(data: IRepeatParams) {
    const { task_id, repeat_id } = data
    return service.post({
      url: `flyele/v2/task/${task_id}/repeat/${repeat_id}/finish`,
      data
    })
  }

  // 重启循环事项
  repeatRestart(data: IRepeatParams) {
    const { task_id, repeat_id } = data

    return service.post({
      url: `flyele/v2/task/${task_id}/repeat/${repeat_id}/restart`,
      data: { task_id, repeat_id }
    })
  }

  // 批量完成循环事项
  repeatFinishBatch(data: { repeated_tasks: IRepeatParams[] }) {
    return service.post({
      url: `batch/v1/tasks/finish`,
      data
    })
  }

  /**
   * 获取节假日
   */
  async getHoliday(year: number): Promise<CommonResponse<IHoliday[]>> {
    return service.get({
      url: `${this.prefix}/monthly_view/holiday`,
      params: {
        year
      }
    })
  }

  // 关注事项
  followTask(taskId: string) {
    return service.post({
      url: `/${this.prefixTask}/${taskId}/follow`
    })
  }

  // 取关
  unfollowTask(taskId: string) {
    return service.delete({
      url: `/${this.prefixTask}/${taskId}/follow`
    })
  }

  // 隐藏日程
  hide(ids: string[]) {
    return service.post({
      url: `${this.prefix}/schedule/show_or_hide`,
      data: {
        dispatchs_id: ids
      }
    })
  }

  getChildrenProcessRelation(task_id: string) {
    return service.get<CommonResponse<IRelation>>({
      url: `${this.prefix}/${task_id}/relation`,
      params: {
        _forceUpdate: true
      }
    })
  }

  /**
   * 当日事项
   */
  getToDayTask({
    day,
    pageNumber = 1,
    pageRecord = 20
  }: {
    day: string
    pageNumber?: number
    pageRecord?: number
  }) {
    return service.get<IScheduleTask[], IExternalListResponse>({
      url: `${this.prefix}/schedule/same_day`,
      params: {
        day,
        page_number: pageNumber,
        page_record: pageRecord
      }
    })
  }

  // 修改事项或者会议
  async updateTask(
    data: Partial<ICreateParams>,
    taskId: string,
    headers?: Record<string, any>
  ) {
    return await service.post({
      url: `${this.prefixTask}/${taskId}`,
      data,
      timeout: 10000,
      headers,
      notFilterEmpty: true
    })
  }

  // 获取工作流步骤
  async getFlowSteps({ taskId }: { taskId: string }) {
    const res = await service.get<IWorkflowStep[]>({
      url: `${this.prefixTask}/${taskId}/flow_steps`,
      params: {
        task_id: taskId
      }
    })

    return res
  }

  // 工作流步骤完成
  async flowStepComplete(params: { curStepId: string; taskId: string }) {
    const { taskId, curStepId } = params

    return await service.post({
      url: `${this.prefixTask}/${taskId}/flow_step/complete`,
      data: {
        task_flow_step_id: curStepId,
        task_id: taskId
      }
    })
  }

  // 工作流步骤回退
  async flowStepRollback(params: {
    reason?: string
    curStepId: string
    taskId: string
  }) {
    const { taskId, reason, curStepId } = params

    return await service.post({
      url: `${this.prefixTask}/${taskId}/flow_step/back`,
      data: {
        back_detail: reason,
        task_flow_step_id: curStepId,
        task_id: taskId
      }
    })
  }
}

export const TaskApi = new Task()
