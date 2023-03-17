import { IGetCouponParams, IGetPriceParams, init } from '@flyele-nx/api'
import { service } from '../service'

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
   
}

const PaymentApi = new Payment()
init({ getPrice: PaymentApi.getGoodsList,createCoupon:PaymentApi.createCoupon })
export default new Payment()