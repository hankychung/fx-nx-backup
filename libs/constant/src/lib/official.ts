export enum CorpAppStatus {
  /** 0-没有付费 */
  noPaid = 0,
  /** 1-限时试用 */
  limitedTimeTrial,
  /** 2-试用过期 */
  trialExpired,
  /** 3-购买期内 */
  purchasePeriod,
  /** 4-购买过期 */
  purchaseExpired,
  /** 5-不限时试用 */
  unlimitedTrial,
  /** 6-购买期内，但是人数超标, 注意，超标后还可以用7天 */
  withinPurchaseExceedsInside7,
  /** 7-购买期内，但是人数超标, 且已经超标试用7天 */
  withinPurchaseExceedsOutSide7
}

export enum CorpUserStatus {
  /** 1=已激活 */
  activated = 1,
  /** 2=已禁用 */
  disabled,
  /** 4=未激活 */
  inactive,
  /** 5=退出企业 */
  logOutCorp
}

export enum CorpVersion {
  /** 前端定义的，非企业版 */
  trial = 'trial',
  paid = 'paid'
}

// 激活状态:1-正常，2-未启用，3-已失效，4-已离职
export const CorpCuStatus: {
  [key: number]: {
    status: string
    tips: string
    bg: string
  }
} = {
  1: {
    status: '',
    tips: '',
    bg: ''
  }, //正常状态？
  2: {
    status: '未启用',
    tips: '该员工还未登录过飞项',
    bg: '#FFAC44'
  }, //2=未启用
  3: {
    status: '已失效',
    tips: '该员工已被移出企业微信飞项模版可见范围',
    bg: '#b4b4b4'
  }, //2=已失效
  4: {
    status: '已离职',
    tips: '该员工已不在公司通讯录中',
    bg: '#FE4D4D'
  } //5=退出企业
}
