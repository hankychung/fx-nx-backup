import { IGetCouponParams, IGetPriceParams, init } from '@flyele-nx/api'
import { service } from '../service'
import { ICreateOrderParams, IGetPayParams } from '../typings'

class Payment {
  /**
   * 获取商品列表1
   */
  async getGoodsList(params: IGetPriceParams) {
    return service.post({
      url: `payment/v2/goods`,
      data: params
    })
  }
  /**
   * 创建优惠券
   */
  async createCoupon(params: IGetCouponParams) {
    return service.post({
      url: `payment/v2/goods/discount/coupon`,
      data: params
    })
  }
  /**
   * 下单
   */
  async createOrder(params: ICreateOrderParams) {
    return service.post({
      url: `payment/v2/indent`,
      data: params
    })
  }
  /**
   * 获取支付信息
   */
  async prePay(params: IGetPayParams) {
    return service.post({
      url: `payment/v2/payment/prepay`,
      data: params
    })
  }
  /**
   * 查询订单
   */
  async getOrderDetail(params: { out_trade_no: string | false }) {
    return service.post({
      url: `payment/v2/payment/query`,
      data: params
    })
  }
  async getIndent(indent_id: string) {
    return service.get({
      url: `payment/v2/indent/${indent_id}`
    })
  }
  /**
   * 查询支付人数假数据
   */
  async getCountPaymentUser() {
    return service.get({
      url: `payment/v2/payment/count_payment_user`
    })
  }
  getToken() {
    return service.getToken()
  }
}

const PaymentApi = new Payment()
init({
  getPrice: PaymentApi.getGoodsList,
  createCoupon: PaymentApi.createCoupon,
  createOrder: PaymentApi.createOrder,
  getToken: PaymentApi.getToken
})
export const paymentApi = new Payment()
