import { service } from '../service'
import {
  IBffTaskDetail,
  ICustomDashboardItem,
  IDayViewResponse,
  IInteract,
  IResponse
} from '@flyele-nx/types'

type TaskListType = 'history' | 'today' | 'future' | 'invite'

class Biz {
  private prefix = 'biz/flyele/v1'

  async getScheduleList(args: {
    type?: TaskListType
    pageRecord?: number
    pageNumber?: number
    queryType?: number
    day?: string
    is_refresh?: number
  }) {
    const {
      type,
      pageRecord = 20,
      pageNumber = 1,
      queryType,
      day,
      is_refresh
    } = args

    const res = await service.post<IDayViewResponse>({
      url: `${this.prefix}/day_view`,
      data: {
        apis: 'schedule',
        schedule: {
          tab_type: type,
          page_record: pageRecord,
          page_number: pageNumber,
          query_type: queryType,
          day,
          is_refresh
        }
      }
    })

    return res
  }

  async getCustomDashboardData(args: {
    filterId: string
    taskId?: string
    batchId?: string
    pageRecord?: number
    pageNumber?: number
  }) {
    const { filterId, taskId, batchId, pageRecord = 20, pageNumber = 1 } = args
    return service.post<
      IResponse<{
        custom_dashboard: ICustomDashboardItem[]
      }>
    >({
      url: `${this.prefix}/day_view`,
      data: {
        apis: 'custom_dashboard',
        custom_dashboard: {
          filter_id: filterId,
          page_record: pageRecord,
          page_number: pageNumber,
          task_id: taskId,
          batch_id: batchId
        }
      }
    })
  }

  async getInteracts() {
    const res = await service.get<IInteract[]>({
      url: `${this.prefix}/user/interacts`
    })

    return res.data
  }

  async getTaskDetail({ taskId }: { taskId: string }) {
    const res = await service.get<IBffTaskDetail>({
      url: `${this.prefix}/task?task_id=${taskId}&apis=*`
    })

    return res.data
  }
}

export const BizApi = new Biz()
