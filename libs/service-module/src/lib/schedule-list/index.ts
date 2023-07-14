import { getDiffKeys, getTaskIdsByDispatch, handleLogout } from './utils'
import { initTodayList } from './utils/initTodayList'
import { ListHandler } from './utils/listHandler'

export * from './schedule-list' // 日程列表
export * from './modules/all-schedule-list'
export * from './utils/taskHandler'
export * from './types/index'
export * from './utils/executionHandler'

export const ScheduleUtils = {
  getDiffKeys,
  getTaskIdsByDispatch,
  handleLogout,
  reloadAllList: ListHandler.reloadAllList.bind(ListHandler),
  initTodayList
}
