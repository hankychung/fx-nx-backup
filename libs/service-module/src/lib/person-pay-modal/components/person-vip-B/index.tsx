import { IActiveGoods, ICoupon, paymentApi } from '@flyele-nx/api'
import React, { useContext, useState, useEffect, useMemo } from 'react'
import { ReactComponent as CountDownA } from '../../../../assets/payImg/count_down_a.svg'

import { IFlyeleAvatarItem } from '../../../pay-modal'
import { VipMealType } from '../controller'
import cs from 'classnames'
import style from './index.module.scss'
import price_box_BG from '../../../../assets/payImg/price_box_bg.svg'
import { useMemoizedFn } from 'ahooks'
import dayjs from 'dayjs'
import { getResidueTime, regFenToYuan } from './utils'
import { useCurrentTime } from '../../hooks/useCurrentTime'
import { SelectMemberContext } from '../../context/context'
import PersonVipEmpty from '../person-vip/components/right-block/person-vip-empty'
import PayButton from './components/pay-button'
const PersonVipB = ({
  memberList,
  mineId,
  couponList,
  goProtocol,
  vipMealType,
  goInterests
}: {
  memberList: IFlyeleAvatarItem[]
  mineId: string
  couponList?: ICoupon[]
  vipMealType: VipMealType
  goProtocol?: () => void
  goInterests: () => void
}) => {
  //设置初始日，用于做假数据，可以自行修改
  const [persons, setPersons] = useState<number>(0)
  const [vipMealList, setVipMealList] = useState<IActiveGoods[]>([]) // 套餐list
  const { nowScecond } = useCurrentTime()
  const service = useContext(SelectMemberContext)
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
    paymentApi.getPrice({ good_type: 'person' }).then((res) => {
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
        new_arr.reverse()
        setVipMealList(new_arr)
      }
    })
  })
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
  const getPerson = () => {
    const startDate = new Date('2023-07-10')
    const now = new Date()
    const diffTime = now.getTime() - startDate.getTime()
    const days = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    const base = 11289
    const span = 100 * days
    const random = Math.floor(Math.random() * span) + base
    return random
  }
  useEffect(() => {
    setPersons(getPerson())
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
  return (
    <div className={style.personVip}>
      <div className={style.above}>
        <div className={style.priceBox}>
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
                className={cs(
                  style.priceItem,
                  {
                    [style.activeStyle]: _.active && _.name !== '终身会员'
                  },
                  {
                    [style.activeStyleBstyle]: _.active && _.name === '终身会员'
                  },
                  {
                    [style.priceItemFifstActive]:
                      _.active && _.name === '终身会员'
                  }
                )}
                key={_.id}
                onClick={() => {
                  mealSelect(_)
                }}
              >
                <div className={style.priceTop}>
                  <div className={style.mealName}>{_.name}</div>
                  <div
                    className={cs(style.price, {
                      [style.priceActive]: _.active && _.name === '终身会员'
                    })}
                  >
                    ￥<span>{regFenToYuan(_.now_price - (_.price || 0))}</span>
                  </div>
                  <div
                    className={cs(style.oldPrice, {
                      [style.oldPriceActive]: _.active && _.name === '终身会员'
                    })}
                  >
                    ¥{regFenToYuan(_.original_price)}
                  </div>
                </div>
                <div
                  className={cs(
                    style.priceSave,
                    {
                      [style.priceSaveActive]: _.active && _.name !== '终身会员'
                    },
                    {
                      [style.priceSaveActiveB]:
                        _.active && _.name === '终身会员'
                    }
                  )}
                >
                  立省¥
                  {regFenToYuan(
                    _.original_price - _.now_price - (_.price || 0)
                  )}
                </div>
                {/* <div
                  className={cs(style.time, {
                    [style.timeActive]: _.active
                  })}
                >
                  限时&nbsp; 23:59:00
                </div> */}
                {_.name === '终身会员' &&
                  _.end_at &&
                  getResidueTime(num - nowScecond) !== '0' && (
                    <div
                      className={cs(style.time, {
                        [style.timeActive]: _.active
                      })}
                    >
                      限时&nbsp;
                      {getResidueTime(
                        num - nowScecond,
                        (
                          (_?.now_price - (_.price || 0)) /
                          _?.original_price
                        ).toFixed(2)
                      )}
                    </div>
                  )}
              </div>
            )
          })}
        </div>
        <div className={style.priceBottom}>
          已有{persons}人开通会员，正在更好管理自己的生活、工作
        </div>
      </div>
      <div className={style.below}>
        {/* 支付按钮 */}
        {!isLifeLong && (
          <PayButton
            activeGood={activeGood}
            payClick={payClick}
            goProtocol={goProtocol}
            goInterests={goInterests}
            vipMealList={vipMealList}
          />
        )}
        {isLifeLong && (
          <div>
            <PersonVipEmpty></PersonVipEmpty>
          </div>
        )}
      </div>
    </div>
  )
}

export default PersonVipB
