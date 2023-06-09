import { service } from '../service'
import { CommonResponse } from '../typings'
import { IScheduleTask } from '../typings/schedule'

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
}

export const TaskApi = new Task()
