import {
  IGetPriceParams,
  IGetPriceRes,
  GetPrice,
  IGetCouponParams,
  GetCoupon,
  IGetCpuponRes,
  ICreateOrderParams,
  CreateOrder,
  GetToken
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
  getToken() {
    return '' as string
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
  registerGetToken(fn: GetToken) {
    this.getToken = fn
  }
}

export const paymentApi = new PaymentApi()

export const init = (options: {
  getPrice: GetPrice
  createCoupon: GetCoupon
  createOrder: CreateOrder
  getToken: GetToken
}) => {
  paymentApi.registerGetPrice(options.getPrice)
  paymentApi.registerCreateCoupon(options.createCoupon)
  paymentApi.registerCreateOrder(options.createOrder)
  paymentApi.registerGetToken(options.getToken)
}
export * from '../types/payment'
