/*
 * @Author: wanghui wanghui@flyele.net
 * @Date: 2023-03-08 09:43:55
 * @LastEditors: wanghui wanghui@flyele.net
 * @LastEditTime: 2023-03-13 19:30:34
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

const list = [
  {
    id: '1',
    name: '1个月',
    oldPrice: '30',
    price: '18',
    active: true
  },
  {
    id: '2',
    name: '1年',
    oldPrice: '299',
    price: '148',
    active: false
  },
  {
    id: '3',
    name: '终身会员',
    oldPrice: '499',
    price: '188',
    active: false
  }
]
const RightBlock = () => {
  const [vipMealList, setVipMealList] = useState<any>(list) // 套餐list

  useEffect(() => {
    console.log(888)
  }, [])
  const mealSelect = (_: any) => {
    const new_arr = list.map((item) => {
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
      {false && (
        <div className={style.mealBlock}>
          <div className={style.title}>套餐选择</div>
          <div className={style.mealList}>
            {vipMealList.map((_: any) => {
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
                      <span>{_.oldPrice}</span>
                    </span>
                    <div>
                      <span>￥</span>
                      {_.price}
                    </div>
                  </div>
                  <div className={style.time}>
                    <span> 限时 23:59:00</span>
                    <MealTime className={style.mealTime}></MealTime>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}
      {/* 支付按钮 */}
      {false && (
        <div>
          <PayButton vipMealType={VipMealType.PERSON} />
        </div>
      )}
      <div>
        <PersonVipEmpty></PersonVipEmpty>
      </div>
    </div>
  )
}

export default RightBlock
