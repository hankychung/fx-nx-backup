import { I18N, isCN } from '@flyele-nx/i18n'
import { IActiveGoods, ICoupon } from '@flyele-nx/api'
import { paymentApi } from '@flyele-nx/service'
import { paymentApi as paymentCountApi } from '@flyele-nx/service'
import React, { useContext, useState, useEffect, useMemo } from 'react'

import { IFlyeleAvatarItem } from '../../../pay-modal'
import { VipMealType } from '../controller'
import cs from 'classnames'
import style from './index.module.scss'
import { useMemoizedFn } from 'ahooks'
import dayjs from 'dayjs'
import { getResidueTime, regFenToYuan } from './utils'
import { useCurrentTime } from '../../hooks/useCurrentTime'
import { SelectMemberContext } from '../../context/context'
import PayButton from './components/pay-button'
import PersonVipEmpty from './components/person-vip-empty'

enum IMealName {
  personVip = '个人会员',
  teamVip = '团队会员',
  lifeVip = '终身会员'
}

const PersonVipB = ({
  memberList,
  mineId,
  couponList,
  goProtocol,
  vipMealType,
  goInterests,
  originRoute
}: {
  memberList: IFlyeleAvatarItem[]
  mineId: string
  couponList?: ICoupon[]
  vipMealType: VipMealType
  goProtocol?: () => void
  goInterests: () => void
  originRoute?: string
}) => {
  const [persons, setPersons] = useState<number>(0)
  const [vipMealList, setVipMealList] = useState<IActiveGoods[]>([]) // 套餐list
  const { nowScecond } = useCurrentTime()
  const [productId, setProductId] = useState('')

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
    paymentApi.getGoodsList({ good_type: 'person' }).then((res) => {
      if (res.code === 0) {
        const new_arr = res.data.map((item, index) => {
          const arr = getItem(item.id, couponList || [])
          if (index === 2) {
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

  const payLife = () => {
    service.showPay({
      show: true,
      payInfo: vipMealList[0]
    })
  }

  const payClick = () => {
    service.showPay({
      show: true,
      payInfo: activeGood ? activeGood[0] : vipMealList[0]
    })
  }

  const getPerson = () => {
    paymentCountApi.getCountPaymentUser().then((res: any) => {
      setPersons(res.data.user_count)
    })
  }

  useEffect(() => {
    getPerson()
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
    <div className={style.personVip}>
      {!isLifeLong && (
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
                      [style.activeStyle]:
                        _.active && _.name !== IMealName.lifeVip
                    },
                    {
                      [style.activeStyleB]:
                        _.active && _.name === IMealName.lifeVip
                    },
                    {
                      [style.priceItemFifstActive]:
                        _.active && _.name === IMealName.lifeVip
                    }
                  )}
                  key={_.id}
                  onClick={() => {
                    mealSelect(_)
                  }}
                >
                  <div className={style.priceTop}>
                    <div
                      className={cs(style.mealName, {
                        [style.mealNameActive]:
                          _.active && _.name === IMealName.lifeVip
                      })}
                    >
                      {_.name}
                    </div>
                    <div
                      className={cs(style.price, {
                        [style.priceActive]:
                          _.active && _.name === IMealName.lifeVip
                      })}
                    >
                      ￥
                      <span>{regFenToYuan(_.now_price - (_.price || 0))}</span>
                    </div>
                    <div
                      className={cs(style.oldPrice, {
                        [style.oldPriceActive]:
                          _.active && _.name === IMealName.lifeVip
                      })}
                    >
                      ¥{regFenToYuan(_.original_price)}
                    </div>
                  </div>
                  <div
                    className={cs(
                      style.priceSave,
                      {
                        [style.priceSaveActive]:
                          _.active && _.name !== IMealName.lifeVip
                      },
                      {
                        [style.priceSaveActiveB]:
                          _.active && _.name === IMealName.lifeVip
                      }
                    )}
                  >
                    {I18N.common.provincialGovernment}¥
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
                  {_.name === I18N.common.life_time &&
                    _.end_at &&
                    getResidueTime(num - nowScecond) !== '0' && (
                      <div
                        className={cs(style.time, {
                          [style.timeActive]: _.active
                        })}
                      >
                        {I18N.common.limitedTimeNbs}&nbsp;
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
            {I18N.template?.(I18N.common.haveOpenVipPeople, { val1: persons })}
          </div>
        </div>
      )}
      {!isLifeLong && (
        <div className={style.below}>
          {/* 支付按钮 */}
          <PayButton
            activeGood={activeGood}
            payClick={payClick}
            payLife={payLife}
            goProtocol={goProtocol}
            goInterests={goInterests}
            vipMealList={vipMealList}
            productId={productId}
          />
        </div>
      )}
      {isLifeLong && <PersonVipEmpty />}
    </div>
  )
}

export default PersonVipB
