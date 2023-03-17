import { IGetPriceParams, IGetPriceRes, GetPrice } from '../types/payment'

class PaymentApi {
  getPrice(_params: IGetPriceParams) {
    return Promise.resolve({} as IGetPriceRes)
  }

  registerGetPrice(fn: GetPrice) {
    this.getPrice = fn
  }
}

export const paymentApi = new PaymentApi()

export * from '../types/payment'
