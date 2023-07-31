import { VipTypeEnum } from '@flyele-nx/constant'
import { IInteract } from '@flyele-nx/types'

class VipHandler {
  static checkVipType({
    vip_type,
    vip_next_expired_at
  }: Pick<IInteract, 'vip_type' | 'vip_next_expired_at'>) {
    if (vip_next_expired_at)
      return {
        isTeamVip: true,
        isVip: true
      }

    const isVip = vip_type === VipTypeEnum.Person
    const isTeamVip = vip_type === VipTypeEnum.Team

    return {
      isVip,
      isTeamVip
    }
  }
}

export { VipHandler }
