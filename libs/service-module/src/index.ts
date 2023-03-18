import { MemberIntroduction } from './lib/MemberIntroduction'
import { IdentityEqualComparison } from './lib/EquityComparison/identity'
import { SpaceEqualComparison } from './lib/EquityComparison/space'
import { QuickPay } from './lib/QuickPay/index' //快捷支付弹窗
import PersonPayModal from './lib/PersonPayModal/index' //个人支付弹窗
import TeamPayModal from './lib/TeamPayModal/index' //团队支付
import PayModal from './lib/PayModal/index' //支付聚合
import CustomerServicesModal from './lib/CustomerServicesModal/index' //客服弹窗
import { VipIntroduce } from './lib/VipIntroduce/index'
import { VipIntroduceContent } from './lib/VipIntroduce/Content/index'

export * from './lib/service-module'
export {
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
