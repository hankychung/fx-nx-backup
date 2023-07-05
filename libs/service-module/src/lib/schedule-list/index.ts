import { getDiffKeys, getTaskIdsByDispatch, handleLogout } from './utils'
import { ListHandler } from './utils/listHandler'

export * from './schedule-list' // 日程列表
export * from './modules/all-schedule-list'
export * from './utils/taskHandler'
export * from './types/index'

export const ScheduleUtils = {
  getDiffKeys,
  getTaskIdsByDispatch,
  handleLogout,
  reloadAllList: ListHandler.reloadAllList.bind(ListHandler)
}
