export interface ICreateOrderParams {
  amount: number
  coupon_id: number
  good_id: number
  origin_route: string
  total_price: number
  users_id: string[]
}

//获取支付信息
export interface IGetPayParams {
  code: string
  name: string
  order_method: number //下单的途径，0->默认未知，1->APP下单，2->小程序下单，3->JSAPI下单，4->Native下单，5->H5下单，6->支付宝下单
  out_trade_no: string
}
