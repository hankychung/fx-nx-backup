import {
  IGetPriceParams,
  IGetPriceRes,
  GetPrice,
  IGetCouponParams,
  GetCoupon,
  IGetCpuponRes
} from '../types/payment'

class PaymentApi {
  getPrice(_params: IGetPriceParams) {
    return Promise.resolve({} as IGetPriceRes)
  }
  createCoupon(_params: IGetCouponParams) {
    return Promise.resolve({} as IGetCpuponRes)
  }
  registerGetPrice(fn: GetPrice) {
    this.getPrice = fn
  }
  registerCreateCoupon(fn: GetCoupon) {
    this.createCoupon = fn
  }
}

export const paymentApi = new PaymentApi()

export const init = (options: {
  getPrice: GetPrice
  createCoupon: GetCoupon
}) => {
  paymentApi.registerGetPrice(options.getPrice)
  paymentApi.registerCreateCoupon(options.createCoupon)
}
export * from '../types/payment'
