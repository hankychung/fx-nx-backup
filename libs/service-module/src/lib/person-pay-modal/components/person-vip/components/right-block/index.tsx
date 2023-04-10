import React, { useContext, useEffect, useMemo, useState } from 'react'
import cs from 'classnames'
import { ReactComponent as MealTime } from '../../../../../../assets/payImg/meal_time.svg'
import style from './index.module.scss'
import PayButton from '../../../pay-button'
import { VipMealType } from '../../../controller'
import PersonVipEmpty from './person-vip-empty'
import { IActiveGoods, paymentApi, ICoupon } from '@flyele-nx/api'
import { getResidueTime, regFenToYuan } from '../../../../utils'
import * as dayjs from 'dayjs'
import { useCurrentTime } from '../../../../hooks/useCurrentTime'
import { SelectMemberContext } from '../../../../context/context'
import { useMemoizedFn } from 'ahooks'
import { IFlyeleAvatarItem } from '../../../../../pay-modal'
const RightBlock = ({
  memberList,
  mineId,
  couponList
}: {
  memberList: IFlyeleAvatarItem[]
  mineId: string
  couponList?: ICoupon[]
}) => {
  const [vipMealList, setVipMealList] = useState<IActiveGoods[]>([]) // 套餐list
  const service = useContext(SelectMemberContext)
  const { nowScecond } = useCurrentTime()
  const isLifeLong = useMemo(() => {
    const info = memberList.filter((item) => item.userId === mineId)[0]
    if (info.end_time === 9999999999) {
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
              return {
                ...arr[0],
                ...item,
                active: true
              }
            } else {
              return {
                ...item,
                active: true
              }
            }
          }
          if (arr.length > 0) {
            return {
              ...arr[0],
              ...item,
              active: false
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
    getMealList()
  }, [getMealList])
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
    return vipMealList.filter((item) => item.active)
  }, [vipMealList])
  const payClick = () => {
    service.showPay({ show: true, payInfo: activeGood[0] })
  }

  return (
    <div className={style.rightBlock}>
      {!isLifeLong && (
        <div className={style.mealBlock}>
          <div className={style.title}>套餐选择</div>
          <div className={style.mealList}>
            {vipMealList.map((_: IActiveGoods) => {
              let num = 0
              if (_.end_at) {
                num = dayjs.unix(_.end_at).valueOf() / 1000 //结束时间
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
                      {regFenToYuan(_.now_price)}
                    </div>
                  </div>
                  {_.end_at && getResidueTime(num - nowScecond) !== '0' && (
                    <div className={style.time}>
                      <span>
                        {getResidueTime(
                          num - nowScecond,
                          (_?.now_price / _?.original_price).toFixed(2)
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
