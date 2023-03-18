import { MemberIntroduction } from './lib/MemberIntroduction'
import { IdentityEqualComparison } from './lib/EquityComparison/identity'
import { SpaceEqualComparison } from './lib/EquityComparison/space'
import { QuickPay } from './lib/QuickPay/index' //快捷支付弹窗
import PersonPayModal from './lib/PersonPayModal/index' //个人支付弹窗
import TeamPayModal from './lib/TeamPayModal/index' //团队支付
import PayModal from './lib/PayModal/index' //支付聚合
import CustomerServicesModal from './lib/CustomerServicesModal/index' //客服弹窗
import { MapSvg } from './lib/map-svg/index'
import { MapSvgRef, InitMapSvgRef } from './lib/map-svg/type/props'
export * from './lib/service-module'

export {
  MapSvg,
  MapSvgRef,
  InitMapSvgRef,
  MemberIntroduction,
  IdentityEqualComparison,
  SpaceEqualComparison,
  QuickPay,
  PersonPayModal,
  TeamPayModal,
  PayModal,
  CustomerServicesModal
}
