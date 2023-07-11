/*
 * @Author: wanghui wanghui@flyele.net
 * @Date: 2023-03-09 09:55:49
 * @LastEditors: wanghui wanghui@flyele.net
 * @LastEditTime: 2023-06-27 11:23:17
 */
import React, { useEffect, useState } from 'react'
import { ReactComponent as CustomerModalBg } from '../../assets/payImg/customer_modal_bg.svg'
// import { ReactComponent as CustomerServicesQrcode } from '../../assets/payImg/customer_services_qrcode.svg'
import { ReactComponent as PhoneNumIcon } from '../../assets/payImg/phone_num_icon.svg'
import { ReactComponent as Close } from '../../assets/payImg/close.svg'
import { ReactComponent as Diamond } from '../../assets/payImg/diamond.svg'
import { ReactComponent as EquityList } from '../../assets/payImg/equity_list.svg'

import style from './index.module.scss'
import PayQrCode from './pay-qrcode'
import { IActiveGoods, ICoupon, paymentApi } from '@flyele-nx/api'
import { useMemoizedFn } from 'ahooks'
import dayjs from 'dayjs'
import { getResidueTime } from '../quick-pay/utils'
import { useCurrentTime } from '../quick-pay/hoooks/useCurrentTime'

interface Iprops {
  onClose: () => void
  isShowPay: boolean
}
const RetrievePayModal = (props: Iprops) => {
  const { onClose, isShowPay } = props
  const { nowScecond } = useCurrentTime()

  const [vipMeal, setVipMeal] = useState<IActiveGoods>() // 套餐list
  const getItem = (id: number, list: ICoupon[]) => {
    return list.filter((item) => +item.ref_goods_id === id)
  }
  const getMealList = useMemoizedFn(async () => {
    paymentApi.createCoupon({ coupon_id: [1, 2, 3, 4, 5, 6] }).then((_) => {
      paymentApi.getPrice({ good_type: 'person' }).then((res) => {
        if (res.code === 0) {
          console.log('res', res)

          const list =
            res.data &&
            res.data.length &&
            res.data.filter((item) => item.name === '终身会员')
          console.log('test-list', list)
          if (list) {
            const new_arr = list.map((item) => {
              const arr = getItem(item.id, _.data || [])
              if (arr.length > 0) {
                const num = arr[0].end_at
                  ? dayjs.unix(arr[0].end_at).valueOf() / 1000
                  : 0 //结束时间
                return {
                  ...arr[0],
                  ...item,
                  active: false,
                  price:
                    arr[0].end_at && getResidueTime(num - nowScecond) === '0'
                      ? 0
                      : arr[0].price
                }
              }
              return {
                ...item,
                active: false
              }
            })
            console.log('new_arr', new_arr)
            setVipMeal(new_arr[0])
          }
        }
      })
    })
  })
  //获取套餐
  useEffect(() => {
    getMealList()
    console.log('vipMeal', vipMeal)
  }, [getMealList,vipMeal])

  return (
    <>
      {!isShowPay && (
        <div className={style.wrap}>
          <div className={style.head}>
            <Diamond></Diamond>
            <Close
              className={style.close}
              onClick={() => {
                onClose()
              }}
            ></Close>
          </div>
          <div className={style.content}>
            <div className={style.left}>
              <div className={style.left_title}>真的要放弃终身会员优惠吗？</div>
              {vipMeal?.price ? (
                <>
                  <div className={style.left_tips}>
                    限时优惠，到期将恢复原价
                  </div>
                  <div className={style.left_coupon}>
                    <div className={style.coupon_content}>
                      限时&nbsp;23:59:00
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className={style.left_tips}>
                    开通终身会员，即可持续使用以下权益
                  </div>
                  <EquityList style={{ marginTop: 20 }} />
                </>
              )}
            </div>
            <div className={style.right}>
              {vipMeal && (
                <PayQrCode
                  isShowPay={isShowPay}
                  vipMeal={vipMeal}
                  onClose={onClose}
                />
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default RetrievePayModal
