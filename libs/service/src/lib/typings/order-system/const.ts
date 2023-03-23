/**
 * 时间类型 today:今日 month:本月
 */
export enum IndentTimeType {
  TODAY = 'today', // 今日
  MONTH = 'month' // 本月
}

/**
 * 订单属性 personal:个人 corp: 企业
 */
export enum IndentMemberType {
  PERSONAL = 'personal', // 个人
  CORP = 'corp' // 企业
}

/**
 * 订单成员类型
 * 1：首次开通 2：未到期续费 3：已到期续费 4：新增席位
 */
export enum IndentMemberAttr {
  FIRST = 1, // 首次开通
  RENEW, // 未到期续费
  DELAYED_RENEW, // 已到期续费
  NEW // 新增席位
}

/**
 * 订单属性
 */
export enum IndentListMemberType {
  PERSONAL = 1, // 个人
  TEAM, // 团队
  CORP // 企业
}

/**
 * 订单类型
 */
export enum IndentType {
  FOR_SELF = 1, // 为自己支付
  FOR_OTHER // 为他人支付
}

/**
 * 订单类型
 */
export enum OrderMethod {
  WECHAT = 1, // 微信APP支付
  MINI_PROGRAM, // 小程序支付
  JSAPI, // JSAPI支付
  NATIVE, // Native支付
  H5, // H5支付
  ALIPAY // 支付宝支付
}

/**
 * 订单状态 中文
 */
export const OrderMethodLabel: {
  [key: number]: string
} = {
  [OrderMethod.WECHAT]: '微信',
  [OrderMethod.MINI_PROGRAM]: '小程序',
  [OrderMethod.JSAPI]: 'JSAPI',
  [OrderMethod.NATIVE]: 'Native',
  [OrderMethod.H5]: 'H5',
  [OrderMethod.ALIPAY]: '支付宝'
}

/**
 * 订单状态
 */
export enum IndentState {
  PENDING = 12000, // 待支付
  SUCCESS, // 支付成功
  REFUND, // 退款成功
  CANCEL, // 取消
  CLOSE, // 关闭
  REFUND_ERROR // 退款异常
}

/**
 * 订单状态 中文
 */
export const IndentStateLabel: {
  [key: number]: string
} = {
  [IndentState.PENDING]: '待支付',
  [IndentState.SUCCESS]: '支付成功',
  [IndentState.REFUND]: '退款成功',
  [IndentState.CANCEL]: '取消',
  [IndentState.CLOSE]: '关闭',
  [IndentState.REFUND_ERROR]: '退款异常'
}