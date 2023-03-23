import { MemberIntroduction } from './lib/MemberIntroduction'
import { IdentityEqualComparison } from './lib/EquityComparison/identity'
import { SpaceEqualComparison } from './lib/EquityComparison/space'
import { QuickPay } from './lib/QuickPay/index' //快捷支付弹窗
import PersonPayModal from './lib/PersonPayModal/index' //个人支付弹窗
import TeamPayModal from './lib/TeamPayModal/index' //团队支付
import PayModal from './lib/PayModal/index' //支付聚合
import CustomerServicesModal from './lib/CustomerServicesModal/index' //客服弹窗
import { MapSvg } from './lib/map-svg/index'
import { VipIntroduce } from './lib/VipIntroduce/index'
import { VipIntroduceContent } from './lib/VipIntroduce/Content'
import { init, objectiveApi as NxObjectiveApi } from '@flyele-nx/api' //客服弹窗
export * from './lib/service-module'

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
  VipIntroduceContent
}

export * from './lib/map-svg/type/props'

export const SMobjectiveApi = NxObjectiveApi

export const registerPaymentInit = init
