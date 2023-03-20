import {
  IGetPriceParams,
  IGetPriceRes,
  GetPrice,
  IGetCouponParams,
  GetCoupon,
  IGetCpuponRes,
  ICreateOrderParams,
  CreateOrder
} from '../types/payment'

class PaymentApi {
  getPrice(_params: IGetPriceParams) {
    return Promise.resolve({} as IGetPriceRes)
  }
  createCoupon(_params: IGetCouponParams) {
    return Promise.resolve({} as IGetCpuponRes)
  }
  createOrder(_params: ICreateOrderParams) {
    return Promise.resolve({} as any)
  }
  registerGetPrice(fn: GetPrice) {
    this.getPrice = fn
  }
  registerCreateCoupon(fn: GetCoupon) {
    this.createCoupon = fn
  }
  registerCreateOrder(fn: CreateOrder) {
    this.createOrder = fn
  }
}

export const paymentApi = new PaymentApi()

export const init = (options: {
  getPrice: GetPrice
  createCoupon: GetCoupon
  createOrder: CreateOrder
}) => {
  paymentApi.registerGetPrice(options.getPrice)
  paymentApi.registerCreateCoupon(options.createCoupon)
  paymentApi.registerCreateOrder(options.createOrder)
}
export * from '../types/payment'
