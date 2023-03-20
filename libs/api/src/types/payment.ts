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
}
export type IGetPriceRes = {
  code: number
  data: IActiveGoods[]
}
export type IGetCpuponRes = {
  code: number
  data: ICoupon[]
}

export type GetPrice = (params: IGetPriceParams) => Promise<IGetPriceRes>
export type GetCoupon = (params: IGetCouponParams) => Promise<IGetCpuponRes>
export type CreateOrder = (params: ICreateOrderParams) => Promise<IGetCpuponRes>
