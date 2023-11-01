import { I18N } from '@flyele-nx/i18n'
export type SectionType = {
  h1: string
}
// 类型
export enum VipPayType {
  NOVIPCREATE = 1, // 非会员创建专业版空间
  UPSPACE, // 升级空间
  RENEWVIP //1、审批/邀请成为内部成员需要为其付费2、为成员续
}
export type TabType = {
  h1: string
  type: VipPayType
}

export const vipPayText = (type: VipPayType) => {
  if (type === VipPayType.NOVIPCREATE) {
    return {
      h1: I18N.common.openVipUseSpace
    }
  }
  if (type === VipPayType.UPSPACE) {
    return {
      h1: I18N.common.upgradeProfessionalSpace
    }
  }
  return {
    h1: I18N.common.activateForFriends2
  }
}
