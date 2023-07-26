import { VipTypeEnum } from '@flyele-nx/constant'
import { IInteract } from '../typings/taker'

class VipHandler {
  static checkVipType({ vip_type }: Pick<IInteract, 'vip_type'>) {
    const isVip = vip_type === VipTypeEnum.Person
    const isTeamVip = vip_type === VipTypeEnum.Team

    return {
      isVip,
      isTeamVip
    }
  }
}

export { VipHandler }
