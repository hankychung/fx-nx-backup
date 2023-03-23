/**
 * API 的导出请按 后端的接口前缀区分 eg： userc
 * 类型的导出，除了全局性的类型可直接导出以外，自己模块的类型请以自己模块namespace的模式导出
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
import {
  ILoginParams,
  IUser,
  ILoginUser,
  IIndentAnalysis,
  IIndentList,
  IIndentListParams,
  IndentMemberType,
  IndentTimeType,
  IndentState,
  IndentStateLabel,
  OrderMethodLabel
} from './lib/typings/order-system'

export * from './lib/service'
export * from './lib/env'
export {
  service,
  SSe,
  UsercApi,
  paymentApi,
  OrderSystemApi,
  IndentStateLabel,
  OrderMethodLabel,
  IndentMemberType,
  IndentTimeType,
  IndentState
}
export type {
  ILoginKeyParams,
  IDevice,
  IContactsAndStatus,
  IErrorResponse,
  ILoginParams,
  IUser,
  ILoginUser,
  IIndentAnalysis,
  IIndentList,
  IIndentListParams
}
