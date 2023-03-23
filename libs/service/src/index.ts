/**
 * API 的导出请按 后端的接口前缀区分 eg： userc
 * 类型的导出，除了全局性的类型可直接导出以外，自己模块的类型请以自己模块的模式导出
 * 请参考 order-system 的类型导出模式
 */
import { UsercApi } from './lib/userc'
import { paymentApi } from './lib/payment'
import { OrderSystemApi } from './lib/order-system'
import { service } from './lib/service'
import SSe from './lib/sse'
import './lib/payment'

import { ILoginKeyParams, IDevice, IErrorResponse } from './lib/typings'
import { IContactsAndStatus } from './lib/typings/taker'

// 订单管理系统
import * as OrderSystemType from './lib/typings/order-system'
import * as OrderSystemConst from './lib/typings/order-system/const'

export * from './lib/service'
export * from './lib/env'

export { service, SSe, UsercApi, paymentApi, OrderSystemApi, OrderSystemConst }
export type {
  ILoginKeyParams,
  IDevice,
  IContactsAndStatus,
  IErrorResponse,
  OrderSystemType
}
