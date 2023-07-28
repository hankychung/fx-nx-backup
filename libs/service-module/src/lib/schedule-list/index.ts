/*
 * @Author: wanghui wanghui@flyele.net
 * @Date: 2023-07-14 16:21:30
 * @LastEditors: wanghui wanghui@flyele.net
 * @LastEditTime: 2023-07-28 16:22:27
 * @FilePath: /fx-nx/libs/service-module/src/lib/schedule-list/index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { getDiffKeys, getTaskIdsByDispatch, handleLogout } from './utils'
import { initTodayList } from './utils/initTodayList'
import { ListHandler } from './utils/listHandler'

export * from './schedule-list' // 日程列表
export * from './modules/all-schedule-list'
export * from './utils/taskHandler'
export * from './utils/listHandler'
export * from './types/index'
export * from './utils/executionHandler'

export const ScheduleUtils = {
  getDiffKeys,
  getTaskIdsByDispatch,
  handleLogout,
  reloadAllList: ListHandler.reloadAllList.bind(ListHandler),
  initTodayList
}
