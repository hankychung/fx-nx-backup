/**
 * API 的导出请按 后端的接口前缀区分 eg： userc
 * 类型的导出，除了全局性的类型可直接导出以外，自己模块的类型请以自己模块的模式导出
 * 请参考 order-system 的类型导出模式
 */
import { UsercApi } from './lib/userc'
import { paymentApi } from './lib/payment'
import { OrderSystemApi } from './lib/order-system'
import { service } from './lib/service'
import { TaskDispatchApi } from './lib/task-dispatch'
import SSe from './lib/sse'
import './lib/payment'

// 全局类型
import {
  ILoginKeyParams,
  IDevice,
  IErrorResponse,
  IUserInfo
} from './lib/typings'

import { IScheduleTask, IRepeatConfig, IHoliday } from './lib/typings/schedule'
import * as ScheduleTaskConst from './lib/typings/schedule/const'

// 协作人
import { IContactsAndStatus } from './lib/typings/taker'

// 订单管理系统
import * as OrderSystemType from './lib/typings/order-system'
import * as OrderSystemConst from './lib/typings/order-system/const'

export * from './lib/service'
export * from './lib/env'
export * from './lib/biz'
export * from './lib/task'

export {
  service,
  SSe,
  UsercApi,
  paymentApi,
  OrderSystemApi,
  TaskDispatchApi,
  OrderSystemConst,
  ScheduleTaskConst
}

export type {
  ILoginKeyParams,
  IDevice,
  IContactsAndStatus,
  IErrorResponse,
  IUserInfo,
  OrderSystemType,
  IScheduleTask,
  IRepeatConfig,
  IHoliday
}
