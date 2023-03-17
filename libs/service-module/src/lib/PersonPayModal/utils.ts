import { paymentApi, GetPrice } from '@flyele-nx/api'

export const init = (options: { getPrice: GetPrice }) => {
  paymentApi.registerGetPrice(options.getPrice)
}
