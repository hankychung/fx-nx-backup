import { service } from '../service'
import { CommonResponse } from '../typings'
import { IScheduleTask, IHoliday } from '../typings/schedule'

interface IGetScheduleTreeParams {
  taskId: string
  queryType?: number
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
}

export const TaskApi = new Task()
