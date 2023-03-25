import { create } from 'zustand'
import { OrderSystemApi, OrderSystemConst } from '@flyele-nx/service'

interface IInvoiceStore {
  notOpenTotal: number
  fetch: () => void
  updateNotOpenTotal: (data: number) => void
}

const initInvoiceData: {
  notOpenTotal: number
} = {
  notOpenTotal: -1
}

export const useInvoiceStore = create<IInvoiceStore>((set) => ({
  notOpenTotal: initInvoiceData.notOpenTotal,
  fetch: async () => {
    try {
      const { code, total } = await OrderSystemApi.getInvoiceList({
        page_number: 1,
        state: OrderSystemConst.InvoiceState.NOT_OPEN
      })
      if (code === 0) {
        set({ notOpenTotal: total ? total : 0 })
      }
    } catch (e) {
      console.log('缓存请求未开发票数量失败', e)
    }
  },
  updateNotOpenTotal: (data: number) =>
    set((state) => ({
      notOpenTotal: data
    }))
}))
