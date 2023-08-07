import { UserInfoUtils } from '../userInfoUtils'
import { useUserInfoStore } from '@flyele-nx/zustand-store'

export const useCheckVip = () => {
  const { isEnterprise } = useUserInfoStore((state) => state)
  const { vip } = useUserInfoStore((state) => state)

  // 个人会员
  const isVip = isEnterprise || UserInfoUtils.vipCheck(vip)
  // 团队会员
  const isTeamVip = isEnterprise || UserInfoUtils.vipTeamCheck(vip)
  // 已过期的会员
  const isExpiredVip = !isEnterprise && UserInfoUtils.checkExpiredVip(vip)
  // 普通（从未购买过个人会员）
  const isPoor = !isEnterprise && UserInfoUtils.checkPoor(vip)
  // 是否永久个人会员
  const isForeverVip = isEnterprise || UserInfoUtils.vipForeverCheck(vip)
  // 个人项目里的事项
  const isVipOrTeamVip = isVip || isTeamVip

  // 是否是有效的vip用户 即 开通了个人会员/团队会员 且没有过期的
  const isValidVip = isEnterprise || UserInfoUtils.hasVipAndNoDead(vip)

  return {
    vip,
    isVip,
    isValidVip,
    isExpiredVip,
    isPoor,
    isTeamVip,
    isForeverVip,
    isVipOrTeamVip
  }
}
