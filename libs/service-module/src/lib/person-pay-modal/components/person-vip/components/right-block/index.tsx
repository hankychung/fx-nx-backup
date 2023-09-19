import { I18N, isCN } from '@flyele-nx/i18n'
import React, { useContext, useEffect, useMemo, useState } from 'react'
import cs from 'classnames'
import { ReactComponent as MealTime } from '../../../../../../assets/payImg/meal_time.svg'
import style from './index.module.scss'
import PayButton from '../../../pay-button'
import { VipMealType } from '../../../controller'
import PersonVipEmpty from './person-vip-empty'
import { IActiveGoods, ICoupon } from '@flyele-nx/api'
import { getResidueTime, regFenToYuan } from '../../../../utils'
import * as dayjs from 'dayjs'
import { useCurrentTime } from '../../../../hooks/useCurrentTime'
import { SelectMemberContext } from '../../../../context/context'
import { useMemoizedFn } from 'ahooks'
import { IFlyeleAvatarItem } from '../../../../../pay-modal'
import { paymentApi } from '@flyele-nx/service'
const RightBlock = ({
  memberList,
  mineId,
  couponList,
  goProtocol,
  vipMealType,
  originRoute
}: {
  goProtocol?: () => void
  memberList: IFlyeleAvatarItem[]
  mineId: string
  couponList?: ICoupon[]
  vipMealType: VipMealType
  originRoute?: string
}) => {
  const [vipMealList, setVipMealList] = useState<IActiveGoods[]>([]) // 套餐list
  const service = useContext(SelectMemberContext)
  const [productId, setProductId] = useState('')
  const { nowScecond } = useCurrentTime()
  const isLifeLong = useMemo(() => {
    const info = memberList.filter((item) => item.userId === mineId)[0]
    if (info.end_time === 9999999999 || info.next_end_time === 9999999999) {
      return true
    }
    return false
  }, [mineId, memberList])
  const getItem = (id: number, list: ICoupon[]) => {
    return list.filter((item) => +item.ref_goods_id === id)
  }

  const getMealList = useMemoizedFn(async () => {
    paymentApi.getGoodsList({ good_type: 'person' }).then((res) => {
      if (res.code === 0) {
        const new_arr = res.data.map((item, index) => {
          const arr = getItem(item.id, couponList || [])

          if (index === 0) {
            if (arr.length > 0) {
              const num = arr[0].end_at
                ? dayjs.unix(arr[0].end_at).valueOf() / 1000
                : 0 //结束时间
              return {
                ...arr[0],
                ...item,
                active: true,
                price:
                  arr[0].end_at && getResidueTime(num - nowScecond) === '0'
                    ? 0
                    : arr[0].price
              }
            } else {
              return {
                ...item,
                active: true
              }
            }
          }
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
          } else {
            return {
              ...item,
              active: false
            }
          }
        })
        setVipMealList(new_arr)
      }
    })
  })
  useEffect(() => {
    if (
      vipMealType === VipMealType.PERSON &&
      couponList &&
      couponList?.length > 0
    ) {
      getMealList()
    }
    if (vipMealType === VipMealType.PERSON && couponList?.length === 0) {
      getMealList()
    }
  }, [getMealList, vipMealType, couponList])

  //选择套餐
  const mealSelect = (_: IActiveGoods) => {
    const new_arr = vipMealList.map((item) => {
      if (item.id === _.id) {
        return {
          ...item,
          active: true
        }
      }
      return {
        ...item,
        active: false
      }
    })

    setVipMealList(new_arr)
  }
  const activeGood = useMemo(() => {
    if (nowScecond) return vipMealList.filter((item) => item.active)
  }, [vipMealList, nowScecond])

  const payClick = () => {
    service.showPay({
      show: true,
      payInfo: activeGood ? activeGood[0] : vipMealList[0]
    })
  }

  const isOldUser = useMemo(() => {
    if (!vipMealList) return true
    const start = dayjs.unix(vipMealList[0]?.create_at || 0).valueOf() / 1000 //结束时间  毫秒数
    const end = dayjs.unix(vipMealList[0]?.end_at || 0).valueOf() / 1000 //结束时间  毫秒数
    const totalSeconds = end - start
    const day = parseInt(`${totalSeconds / 3600 / 24}`)
    return day > 5 ? true : false
  }, [vipMealList])
  //获取订单号
  const qrCodeFunction = useMemoizedFn(async () => {
    const userInfo = memberList.filter((item) => item.userId === mineId)
    const payInfo = activeGood ? activeGood[0] : vipMealList[0]
    const params = {
      amount: userInfo.length,
      coupon_id: payInfo?.price ? payInfo?.coupon_id : 0,
      good_id: payInfo?.id || 0,
      origin_route: originRoute ? originRoute : 'PC客户端',
      total_price:
        ((payInfo?.now_price || 0) - (payInfo?.price || 0) || 0) *
        userInfo.length,
      users_id: userInfo.map((item) => item.userId),
      indent_member_type:
        vipMealType === VipMealType.PERSON
          ? VipMealType.PERSON
          : VipMealType.TEAM
    }
    try {
      paymentApi.createOrder(params).then(async (res) => {
        setProductId(res.data.out_trade_no)
      })
    } catch {
      console.log('00')
    }
  })

  //当切换套餐的时候直接生成订单(海外版)
  useEffect(() => {
    if (isCN) return
    qrCodeFunction()
  }, [vipMealList, qrCodeFunction])

  return (
    <div className={style.rightBlock}>
      {!isLifeLong && (
        <div className={style.mealBlock}>
          <div className={style.title}>{I18N.common.packageSelection}</div>
          <div className={style.mealList}>
            {vipMealList.map((_: IActiveGoods) => {
              let num = 0
              if (_.end_at) {
                num = dayjs.unix(_.end_at).valueOf() / 1000 //结束时间
              }
              if (
                _.end_at &&
                getResidueTime(num - nowScecond) === '0' &&
                _.price
              ) {
                const new_list = vipMealList.map((item) => {
                  if (item.id === _.id) {
                    return {
                      ...item,
                      price: 0,
                      coupon_id: 0
                    }
                  }
                  return {
                    ...item
                  }
                })
                setVipMealList(new_list)
              }
              return (
                <div
                  className={cs(style.mealItem, {
                    [style.activeStyle]: _.active
                  })}
                  key={_.id}
                  onClick={() => {
                    mealSelect(_)
                  }}
                >
                  <div className={style.name}>{_.name}</div>
                  <div className={style.price}>
                    {_.original_price && (
                      <span>
                        <i>￥</i>
                        <span>{regFenToYuan(_.original_price)}</span>
                      </span>
                    )}
                    <div>
                      <span>￥</span>
                      {regFenToYuan(_.now_price - (_.price || 0))}
                    </div>
                  </div>
                  {_.end_at && getResidueTime(num - nowScecond) !== '0' && (
                    <div className={style.time}>
                      <span>
                        {getResidueTime(
                          num - nowScecond,
                          (
                            (_?.now_price - (_.price || 0)) /
                            _?.original_price
                          ).toFixed(2),
                          isOldUser
                        )}
                      </span>
                      <MealTime className={style.mealTime}></MealTime>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      )}
      {/* 支付按钮 */}
      {!isLifeLong && (
        <div>
          <PayButton
            vipMealType={VipMealType.PERSON}
            activeGood={activeGood}
            payClick={payClick}
            goProtocol={goProtocol}
            vipMealList={vipMealList}
            productId={productId}
          />
        </div>
      )}
      {isLifeLong && (
        <div>
          <PersonVipEmpty></PersonVipEmpty>
        </div>
      )}
    </div>
  )
}

export default RightBlock
