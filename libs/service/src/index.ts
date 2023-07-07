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

import {
  IScheduleTask,
  IRepeatConfig,
  IHoliday,
  Taker,
  RepeatList,
  ILocalTask
} from './lib/typings/schedule'
import * as ScheduleTaskConst from './lib/typings/schedule/const'
import * as CreateTypeMap from './lib/typings/schedule/createTypeMap'

import { IWorkflowStep, IUserStepInfo } from './lib/typings/workflow'
import * as WorkflowConst from './lib/typings/workflow/const'

// 协作人
import {
  IContactsAndStatus,
  ITakerAndStatus,
  VipTypeEnum,
  EConCheckStatus
} from './lib/typings/taker'

// Tag
import { TagModel, TagObjType } from './lib/typings/tag'
import * as TagConst from './lib/typings/tag/const'

// Auth
import * as AuthType from './lib/typings/auth'
import * as AuthConst from './lib/typings/auth/const'

// 空间
import * as SpaceType from './lib/typings/space'
import * as SpaceTypeConst from './lib/typings/space/const'
import { workspaceApi } from './lib/workspace'

// 项目
import * as ProjectType from './lib/typings/project'

// 订单管理系统
import * as OrderSystemType from './lib/typings/order-system'
import * as OrderSystemConst from './lib/typings/order-system/const'

export * from './lib/service'
export * from './lib/env'
export * from './lib/biz'
export * from './lib/task'

export * as ScheduleType from './lib/typings/schedule'

export {
  service,
  SSe,
  UsercApi,
  paymentApi,
  OrderSystemApi,
  TaskDispatchApi,
  OrderSystemConst,
  ScheduleTaskConst,
  CreateTypeMap,
  TagConst,
  LabelApi,
  workspaceApi,
  SpaceTypeConst,
  AuthConst,
  VipTypeEnum,
  EConCheckStatus,
  WorkflowConst
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
  IHoliday,
  Taker,
  RepeatList,
  TagModel,
  TagObjType,
  ITakerAndStatus,
  AuthType,
  IVip,
  SpaceType,
  ProjectType,
  IWorkflowStep,
  IUserStepInfo,
  ILocalTask
}
