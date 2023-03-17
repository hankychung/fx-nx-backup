export type IGetPriceParams = {
  good_type: 'person' | 'team'
  is_ios?: boolean
  is_new_user?: boolean
  is_old_user?: boolean
  num?: number
}

export type IGetPriceRes = {
  code: number
  complete_total: number
  cursor: number
  data: [
    {
      create_at: number
      day_num: number
      id: number
      name: string
      now_price: number
      original_price: number
      state: number
      type: number
    }
  ]
  dbg_error: string
  message: string
  not_today_total: number
  scroll_id: string
  total: number
}

export type GetPrice = (params: IGetPriceParams) => Promise<IGetPriceRes>
