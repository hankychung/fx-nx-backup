import { I18N } from '@flyele-nx/i18n'

/**
 * 空间升级类型
 */
export enum SpaceUpgradeType {
  SPACE = 1, // 空间成员
  EXTERNAL = 2 // 外部成员
}

/**
 * 空间成员类型
 */
export enum SpaceMemberType {
  SPACE = 1, // 空间成员
  EXTERNAL = 2 // 外部成员
}
/**
 * 空间角色
 */
export enum SpaceMemberNewType {
  CREATOR = 1, // 创建人
  ADMIN = 2, // 管理员
  SPACE = 3, // 空间成员
  EXTERNAL = 4 // 外部成员
}
/**
 * 空间成员审批状态
 */
export enum SpaceApprovalState {
  UNTREATED = 1, // 未处理
  AGREE = 2, // 同意
  REJECT = 3 // 拒绝
}

/**
 * 空间类型
 */
export enum SPACE_TYPE {
  team = 1, // 团队空间
  private = 2 // 个人空间
}

/**
 * 空间等级
 */
export enum SPACE_LEVEL {
  private = 0, // 这个字段不是服务端定义，是本端定义为了配合模型使用，这个等级代表个人空间
  basic = 1,
  vip = 2,
  /** 企业版的专业空间 */
  enterprise = 3
}

/**
 * 空间等级对应字典
 */
export const SPACE_LEVEL_DICT = {
  [SPACE_LEVEL.private]: '个人空间',
  [SPACE_LEVEL.basic]: '免费空间',
  [SPACE_LEVEL.vip]: '专业空间',
  [SPACE_LEVEL.enterprise]: '企业版专业空间'
}

/**
 * 空间状态
 */
export enum SPACE_STATE {
  normal = 1, // 正常
  dissolve = 2, // 解散
  disable = 3 // 禁用(待激活)
}

// 团队人数
export const TeamSize = [
  {
    id: '1',
    title: '1-10'
  },
  {
    id: '2',
    title: '11-20'
  },
  {
    id: '3',
    title: '20-50'
  },
  {
    id: '4',
    title: I18N.common.moreThan50
  }
]
