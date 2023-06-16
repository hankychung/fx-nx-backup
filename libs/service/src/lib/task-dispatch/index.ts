import { service } from '../service'

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
}

export const TaskDispatchApi = new TaskDispatch()
