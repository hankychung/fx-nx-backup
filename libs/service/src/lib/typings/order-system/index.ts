import { IRequestList } from '../index'

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

export interface ILoginParams {
  telephone: string // 账号
  verify_code: string // 验证码
}

export interface IUser {
  id: string
  nick_name: string // 昵称
  telephone: string // 手机号
}

export interface ILoginUser extends IUser {
  token: string // token
}

export interface IMemberCount {
  personal_count: number // 个人会员人数
  team_count: number // 团队人数
}
export interface IIndentSum {
  amount: number // 钱
  count: number // 数量
}

/**
 * 订单统计
 */
export interface IIndentAnalysis {
  member: IMemberCount
  month_indent: IIndentSum
  today_indent: IIndentSum
  total_indent: IIndentSum
}

/**
 * 订单列表请求参数
 */
export interface IIndentListParams extends IRequestList {
  user_keyword?: string // 用户关键字
  corp_keyword?: string // 企业关键字
  indent_num?: string // 订单编号
  time_type?: IndentTimeType // 时间类型
  indent_member_type?: IndentMemberType // 订单属性
}

/**
 * 订单列表用到的人员信息
 */
export interface IIndentUser {
  telephone: string
  user_id: string
  user_name: string
}

/**
 * 订单列表
 */
export interface IIndentList {
  corporation_id: string // 企业订单关联企业id
  create_at: number // 创建时间
  creator: IIndentUser // 创建人信息
  good_id: number // 产品ID
  id: string
  indent_content: string // 订单内容 格式：个人版：会员类型-时长-人数 企业版： 企业版-时长-类型（开通or新增）-席位数量
  indent_member_attr: IndentMemberAttr // 订单成员类型
  indent_member_type: IndentListMemberType // 订单属性 1：个人，2:团队，3：企业
  indent_num: string // 订单编号
  indent_type: IndentType // 订单类型
  num: number // 产品数量
  order_method: OrderMethod // 支付方式
  origin_route: string // 订单渠道 (官网，Android客户端，IOS客户端，PC客户端，企业微信)
  payment_at: number // 支付时间
  should_price: number // 应付总价，单位：分
  state: IndentState // 订单状态
  total_price: number // 实付总价，单位：分
  update_at: number // 更新时间
  users: IIndentUser // 充值用户信息数据
}
