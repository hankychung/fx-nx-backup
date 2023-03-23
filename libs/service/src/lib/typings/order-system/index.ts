import { IRequestList } from '../index'
import {
  IndentTimeType,
  IndentMemberType,
  IndentMemberAttr,
  IndentListMemberType,
  IndentType,
  OrderMethod,
  IndentState
} from './const'

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
  state?: string // 状态，多个用，拼接
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
