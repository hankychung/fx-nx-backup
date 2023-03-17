import { paymentApi, GetPrice } from '@flyele-nx/service'

export const init = (options: { getPrice: GetPrice }) => {
  paymentApi.registerGetPrice(options.getPrice)
}
