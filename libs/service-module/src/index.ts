/*
 * @Author: wanghui wanghui@flyele.net
 * @Date: 2023-07-12 16:40:51
 * @LastEditors: wanghui wanghui@flyele.net
 * @LastEditTime: 2023-07-12 16:41:15
 * @FilePath: /fx-nx/libs/service-module/src/index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { MemberIntroduction } from './lib/member-introduction'
import { IdentityEqualComparison } from './lib/equity-comparison/identity'
import { SpaceEqualComparison } from './lib/equity-comparison/space'
import { QuickPay } from './lib/quick-pay/index' //快捷支付弹窗
import PersonPayModal from './lib/person-pay-modal/index' //个人支付弹窗
import TeamPayModal from './lib/team-pay-modal/index' //团队支付
import PayModal from './lib/pay-modal/index' //支付聚合
import CustomerServicesModal from './lib/customer-services-modal/index' //客服弹窗
import { MapSvg } from './lib/map-svg/index'
import { VipIntroduce } from './lib/vip-introduce/index'
import { VipIntroduceContent } from './lib/vip-introduce/content'
import { init, objectiveApi as NxObjectiveApi } from '@flyele-nx/api' //客服弹窗
import { AvatarEdit } from './lib/avatar-edit' //头像编辑
import { ContextMenu } from './lib/context-menu'
import { contextMenuTool } from './lib/context-menu/contextMenuTool'
import RetrievePayModalTeam from "./lib/retrieve-pay-modal-team"
import RetrievePayModal from "./lib/retrieve-pay-modal"
import { service, envStore } from '@flyele-nx/service'
import { DayExecution } from './lib/day-execution'

export * from './lib/project-lure' // 项目权益弹窗

export * from './lib/schedule-list' // 日程列表

export {
  MapSvg,
  MemberIntroduction,
  IdentityEqualComparison,
  SpaceEqualComparison,
  QuickPay,
  PersonPayModal,
  TeamPayModal,
  PayModal,
  CustomerServicesModal,
  VipIntroduce,
  VipIntroduceContent,
  AvatarEdit,
  ContextMenu,
  contextMenuTool,
  DayExecution,
  RetrievePayModalTeam,
  RetrievePayModal
}

export * from './lib/map-svg/type/props'

export * from './lib/global'

export const SMobjectiveApi = NxObjectiveApi

export const updateNxEnv = envStore.updateEnvByClient.bind(envStore)

export const updateNxToken = service.updateToken.bind(service)

export const registerPaymentInit = init
