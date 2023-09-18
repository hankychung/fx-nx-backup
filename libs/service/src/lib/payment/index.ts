import { IGetCouponParams, IGetPriceParams, IGetPriceRes } from '@flyele-nx/api'
import { service } from '../service'
import { ICreateOrderParams, IGetPayParams } from '../typings'

class Payment {
  /**
   * 获取商品列表1
   */
  async getGoodsList(params: IGetPriceParams) {
    return service.post<IGetPriceRes>({
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

  // 创建paypal订单
  async createPaypalOrder(orderId: string) {
    return service.post({
      url: `payment/v2/paypal/create_order`,
      data: {
        indent_num: orderId
      },
      timeout: 60000
    })
  }

  // paypal订单支付详情
  async getPaypalOrderDetail(orderId: string) {
    return service.get({
      url: `payment/v2/paypal/callback/sync`,
      params: {
        order_id: orderId
      },
      timeout: 60000
    })
  }
}

const PaymentApi = new Payment()

export default PaymentApi
