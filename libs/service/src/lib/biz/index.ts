import { service } from '../service'
import { IDayViewResponse } from '../typings/biz/dayView'

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
      pageRecord = 10,
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
}

export const BizApi = new Biz()
