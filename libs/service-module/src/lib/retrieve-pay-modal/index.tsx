/*
 * @Author: wanghui wanghui@flyele.net
 * @Date: 2023-03-09 09:55:49
 * @LastEditors: wanghui wanghui@flyele.net
 * @LastEditTime: 2023-06-27 11:23:17
 */
import React, {
  useEffect,
  useMemo,
  useState,
  RefObject,
  useImperativeHandle
} from 'react'
import { ReactComponent as CustomerModalBg } from '../../assets/payImg/customer_modal_bg.svg'
// import { ReactComponent as CustomerServicesQrcode } from '../../assets/payImg/customer_services_qrcode.svg'
import { ReactComponent as PhoneNumIcon } from '../../assets/payImg/phone_num_icon.svg'
import { ReactComponent as Close } from '../../assets/payImg/close.svg'
import { ReactComponent as Diamond } from '../../assets/payImg/diamond.svg'
import { ReactComponent as EquityList } from '../../assets/payImg/equity_list.svg'

import style from './index.module.scss'
import PayQrCode from './pay-qrcode'
import { IActiveGoods, ICoupon, paymentApi } from '@flyele-nx/api'
import { useMemoizedFn, useMount } from 'ahooks'
import dayjs from 'dayjs'
import { getResidueTime } from '../quick-pay/utils'
import { useCurrentTime } from '../quick-pay/hoooks/useCurrentTime'
import { Modal } from 'antd'
import { globalNxController } from '../global/nxController'
import { useUserInfoStore } from '../store/useUserInfoStore'

interface Iprops {
  onClose: () => void
  isShow: boolean
  isPaySuccess: boolean
}

interface fun {
  setIsPay: (_: boolean) => void
}

const RetrievePayModal = (props: Iprops) => {
  const { onClose, isShow, isPaySuccess } = props
  const { nowScecond } = useCurrentTime()
  const [mealTime, setMealTime] = useState('')
  const [vipMeal, setVipMeal] = useState<IActiveGoods>() // 套餐list
  const userId = parseInt(useUserInfoStore((state) => state.userInfo.user_id))

  const getItem = (id: number, list: ICoupon[]) => {
    return list.filter((item) => +item.ref_goods_id === id)
  }

  const getResidueTime = (totalSeconds: number, text = '0') => {
    //   const nowtime = new Date().getTime() // 当前时间 毫秒数
    //   const endTime = dayjs.unix(end).valueOf() //结束时间  毫秒数
    //   const totalSeconds = (endTime - nowtime) / 1000 // 结束时间-当前时间 = 剩余多少时间
    const day = parseInt(`${totalSeconds / 3600 / 24}`) //天
    const hour = parseInt(`${(totalSeconds / 3600) % 24}`)
      .toString()
      .padStart(2, '0') //时
    const minute = parseInt(`${(totalSeconds / 60) % 60}`)
      .toString()
      .padStart(2, '0') //分
    const second = parseInt(`${totalSeconds % 60}`)
      .toString()
      .padStart(2, '0') //秒
    let residueTime =
      '倒计时：' + day + '天 ' + hour + '时 ' + minute + '分 ' + second + '秒'
    if (day >= 1) {
      residueTime = `${day + 1}`
    }
    if (day === 0) {
      residueTime = `${hour}:${minute}:${second}`
    }
    if (totalSeconds <= 0) {
      residueTime = '0'
    }

    return residueTime
  }
  const getMealList = useMemoizedFn(async () => {
    console.log('123getMealList')
    paymentApi.createCoupon({ coupon_id: [1, 2, 3, 4, 5, 6] }).then((_) => {
      paymentApi.getPrice({ good_type: 'person' }).then((res) => {
        if (res.code === 0) {
          console.log('res', res)

          const list =
            res.data &&
            res.data.length &&
            res.data.filter((item) => item.name === '终身会员')
          if (list) {
            const new_arr = list.map((item) => {
              const arr = getItem(item.id, _.data || [])
              if (arr.length > 0) {
                const num = arr[0].end_at
                  ? dayjs.unix(arr[0].end_at).valueOf() / 1000
                  : 0 //结束时间
                setMealTime(
                  getResidueTime(
                    num - nowScecond,
                    (
                      (item?.now_price - (item.price || 0)) /
                      item?.original_price
                    ).toFixed(2)
                  )
                )
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
            console.log('new_arr1111111111', new_arr)
            setVipMeal(new_arr[0])
          }
        }
      })
    })
  })

  //获取套餐
  useMount(() => {
    getMealList()
  })

  useEffect(() => {
    if (!isShow) return
    globalNxController.sensorSend('touch_to_pay_rule', {
      touch_rule: vipMeal?.price
        ? '退出支付挽回弹窗--优惠期内'
        : '退出支付挽回弹窗--优惠期外',
      page_name: userId % 2 === 0 ? '个人支付tabA' : '个人支付tabB'
    })
  }, [isShow, userId, vipMeal?.price])

  return (
    <>
      {!isPaySuccess && (
        <Modal
          open={isShow}
          centered
          footer={null}
          closable={false}
          wrapClassName={style.modalWrap}
        >
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
                <div className={style.left_title}>
                  真的要放弃终身会员优惠吗？
                </div>
                {vipMeal?.price ? (
                  <>
                    <div className={style.left_tips}>
                      限时优惠，到期将恢复原价
                    </div>
                    <div className={style.left_coupon}>
                      <div className={style.coupon_content}>
                        限时&nbsp;{mealTime}天
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
                    isShowPay={isPaySuccess}
                    vipMeal={vipMeal}
                    onClose={onClose}
                  />
                )}
              </div>
            </div>
          </div>
        </Modal>
      )}
    </>
  )
}

export default RetrievePayModal
