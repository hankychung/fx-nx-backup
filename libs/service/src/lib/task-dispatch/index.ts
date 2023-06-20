import { service } from '../service'
import { ISetFinishedStateParams } from '../typings/task-dispatch'

class TaskDispatch {
  private prefix = 'flyele/v2/task_dispatch'

  // 修改完成/重启事项状态
  setTaskDispatchState(id: string, data: { state: number }) {
    return service.post({
      url: `${this.prefix}/${id}/state`,
      data,
      timeout: 3000
    })
  }

  setTaskDispatchStateBatch(id: string, data: { state: number }) {
    return service.post({
      url: `${this.prefix}/${id}/state/batch`,
      data,
      timeout: 3000
    })
  }

  pinSchedule(dispatchId: string) {
    return service.post({
      url: `${this.prefix}/${dispatchId}/topmost`,
      data: { task_dispatch: dispatchId }
    })
  }

  setFinishedState(data: ISetFinishedStateParams) {
    return service.post({
      url: `${this.prefix}/${data.dispatch_id}/state`,
      data: {
        dispatch_id: data.dispatch_id,
        state: data.state,
        sensors_data: data.complete_entrance
          ? {
              complete_entrance: data.complete_entrance
            }
          : undefined
      },
      timeout: 3000
    })
  }

  /**
   * 退出事项
   */
  async exitTask(dispatch_id: string) {
    return await service.post({
      url: `${this.prefix}/${dispatch_id}/exit`
    })
  }
}

export const TaskDispatchApi = new TaskDispatch()
