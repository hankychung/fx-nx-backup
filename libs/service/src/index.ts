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
import { LabelApi } from './lib/label'
import { OfficialApi } from './lib/official'
import SSe from './lib/sse'
import './lib/payment'

// 全局类型
import {
  ILoginKeyParams,
  IDevice,
  IErrorResponse,
  IUserInfo,
  IVip
} from './lib/typings'

import { IWorkflowStep, IUserStepInfo } from '@flyele-nx/types'

// 协作人
// import {
//   IContactsAndStatus,
//   ITakerAndStatus,
//   VipTypeEnum,
//   EConCheckStatus
// } from './lib/typings/taker'

// Tag
import { TagModel, TagObjType } from './lib/typings/tag'
import * as TagConst from './lib/typings/tag/const'

// Auth
import * as AuthType from './lib/typings/auth'
import * as AuthConst from './lib/typings/auth/const'

// 空间
import { workspaceApi } from './lib/workspace'

// 订单管理系统
import * as OrderSystemType from './lib/typings/order-system'
import * as OrderSystemConst from './lib/typings/order-system/const'
import { projectApi } from './lib/project'

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
  TagConst,
  LabelApi,
  workspaceApi,
  projectApi,
  AuthConst,
  OfficialApi
}

export type {
  ILoginKeyParams,
  IDevice,
  // IContactsAndStatus,
  IErrorResponse,
  IUserInfo,
  OrderSystemType,
  TagModel,
  TagObjType,
  // ITakerAndStatus,
  AuthType,
  IVip,
  IWorkflowStep,
  IUserStepInfo
}
