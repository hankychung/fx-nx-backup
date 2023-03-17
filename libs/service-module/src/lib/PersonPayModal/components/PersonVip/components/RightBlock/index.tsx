/*
 * @Author: wanghui wanghui@flyele.net
 * @Date: 2023-03-08 09:43:55
 * @LastEditors: wanghui wanghui@flyele.net
 * @LastEditTime: 2023-03-17 20:25:23
 * @FilePath: /electron-client/app/components/PersonPayModal/components/PersonVip/components/RightBlock/index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React, { useEffect, useState } from 'react'
import cs from 'classnames'
import { ReactComponent as MealTime } from '../../../../../../assets/payImg/meal_time.svg'
import style from './index.module.scss'
import PayButton from '../../../PayButton'
import { VipMealType } from '../../../controller'
import PersonVipEmpty from './PersonVipEmpty'
import { IActiveGoods, paymentApi, ICoupon } from '@flyele-nx/api'
import { getResidueTime, regFenToYuan } from '../../../../utils'

const RightBlock = () => {
  const [vipMealList, setVipMealList] = useState<IActiveGoods[]>([]) // 套餐list
  const [intervalId, setIntervalId] = useState<NodeJS.Timer>()
  useEffect(() => {
    getMealList()
  }, [])
  useEffect(() => {
    if (vipMealList.length > 0) {
      // const a=vipMealList
      // if(a.length>0) return
      const id: NodeJS.Timer = setInterval(() => {
        // const a=vipMealList
        const new_arr = vipMealList.map((item) => {
          if (item.end_at) {
            return {
              ...item,
              a: getResidueTime(1679141829)
            }
          }
          return {
            ...item
          }
        })
        console.log(new_arr)

        setVipMealList(new_arr)
      }, 1000)
      setIntervalId(id)
    }
    return () => {
      clearInterval(intervalId)
    }
  }, [vipMealList])

  const getItem = (id: number, list: ICoupon[]) => {
    return list.filter((item) => +item.ref_goods_id === id)
  }
  const getMealList = async () => {
    paymentApi.createCoupon({ coupon_id: [1, 2, 3, 4] }).then((_) => {
      paymentApi.getPrice({ good_type: 'person' }).then((res) => {
        if (res.code === 0) {
          const new_arr = res.data.map((item, index) => {
            const arr = getItem(item.id, _.data || [])
            if (index === 0) {
              if (arr.length > 0) {
                return {
                  ...item,
                  active: true,
                  ...arr[0]
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
                ...item,
                active: false,
                ...arr[0]
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
  }
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

  return (
    <div className={style.rightBlock}>
      {
        <div className={style.mealBlock}>
          <div className={style.title}>套餐选择</div>
          <div className={style.mealList}>
            {vipMealList.map((_: IActiveGoods) => {
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
                    <span>
                      <i>￥</i>
                      <span>{regFenToYuan(_.original_price)}</span>
                    </span>
                    <div>
                      <span>￥</span>
                      {regFenToYuan(_.now_price)}
                    </div>
                  </div>
                  {_.end_at &&_.a&& (
                    <div className={style.time}>
                      <span>{_.a&&_.a.residueTime}</span>
                      <MealTime className={style.mealTime}></MealTime>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      }
      {/* 支付按钮 */}
      {
        <div>
          <PayButton vipMealType={VipMealType.PERSON} />
        </div>
      }
      {false && (
        <div>
          <PersonVipEmpty></PersonVipEmpty>
        </div>
      )}
    </div>
  )
}

export default RightBlock
