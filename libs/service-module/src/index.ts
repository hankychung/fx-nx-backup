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
export * from './lib/schedule-list/schedule-list' // 日程列表

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
  AvatarEdit
}

export * from './lib/map-svg/type/props'

export const SMobjectiveApi = NxObjectiveApi

export const registerPaymentInit = init
