/*
 * @Author: wanghui wanghui@flyele.net
 * @Date: 2023-04-06 16:13:15
 * @LastEditors: wanghui wanghui@flyele.net
 * @LastEditTime: 2023-04-12 16:36:43
 * @FilePath: /fx-nx/libs/api/src/types/payment.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
export type IGetPriceParams = {
  good_type: 'person' | 'team'
  is_ios?: boolean
  is_new_user?: boolean
  is_old_user?: boolean
  num?: number
}
export type IGetCouponParams = {
  coupon_id: number[]
}
export type IGoods = {
  create_at: number
  day_num: number
  id: number
  name: string
  now_price: number
  original_price: number
  state: number
  type: number
}
export interface ICoupon {
  end_at: number
  ref_goods_id: string
  coupon_id: number
  price: number
}
export interface ICreateOrderParams {
  amount: number
  coupon_id: number
  good_id: number
  origin_route: string
  total_price: number
  users_id: string[]
}
export interface IActiveGoods extends IGoods {
  active: boolean
  end_at: number
  ref_goods_id: string
  coupon_id: number
  price: number
}
export type IGetPriceRes = {
  code: number
  data: IActiveGoods[]
}
export type IGetCpuponRes = {
  code: number
  data: ICoupon[]
}
export type IndentData = {
  corporation_id: string
  create_at: number
  creator?: {
    user_id: number
    user_name: string
  }
  discount_id?: string
  good_id?: number
  id: string

  indent_content?: string
  indent_member_attr?: number
  indent_member_type?: number
  indent_num?: string
  indent_type?: number
  num?: number
  order_method?: number
  origin_route?: string
  payment_at: number
  should_price?: number
  state?: number
  total_price?: number
  transaction_id?: string
  update_at?: number
  users?: {
    after_pay_end_at: number
  }
}
export type GetPrice = (params: IGetPriceParams) => Promise<IGetPriceRes>
export type GetCoupon = (params: IGetCouponParams) => Promise<IGetCpuponRes>
export type CreateOrder = (params: ICreateOrderParams) => Promise<IGetCpuponRes>
export type GetToken = () => string
