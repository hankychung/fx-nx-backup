/*
 * @Author: wanghui wanghui@flyele.net
 * @Date: 2023-03-08 09:43:55
 * @LastEditors: wanghui wanghui@flyele.net
 * @LastEditTime: 2023-03-18 15:01:09
 * @FilePath: /electron-client/app/components/PersonPayModal/components/PersonVip/components/RightBlock/index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React, { useContext, useEffect, useMemo, useState } from 'react'
import cs from 'classnames'
import { ReactComponent as MealTime } from '../../../../../../assets/payImg/meal_time.svg'
import style from './index.module.scss'
import PayButton from '../../../PayButton'
import { SelectMemberContext } from '../../../../context/context'
import { VipPayType } from '../../../controller'
import { IFlyeleAvatarItem } from '../../../../../PayModal'
import { useCurrentTime } from '../../../../hooks/useCurrentTime'
import { IActiveGoods, ICoupon, paymentApi } from '@flyele-nx/api'
import * as dayjs from 'dayjs'
import { getResidueTime, regFenToYuan } from '../../../../utils'
import { message } from 'antd'

const RightBlock = ({ vipType }: { vipType: VipPayType }) => {
  const service = useContext(SelectMemberContext)
  const [vipMeal, setVipMeal] = useState<IActiveGoods>() // 套餐list
  const [resultArr, setResultArr] = useState<IFlyeleAvatarItem[]>([])
  const { nowScecond } = useCurrentTime()

  useEffect(() => {
    service.addListener((ev) => {
      const { event } = ev

      switch (event) {
        case 'selectMember':
          setResultArr(service.getData('selectMember').list)
          break

        default:
      }
    })

    return () => {
      service.dispose()
    }
  }, [service])
    //获取套餐
    useEffect(() => {
      getMealList()
    }, [])
    const getItem = (id: number, list: ICoupon[]) => {
      return list.filter((item) => +item.ref_goods_id === id)
    }
    const getMealList = async () => {
      paymentApi.createCoupon({ coupon_id: [1, 2, 3, 4] }).then((_) => {
        paymentApi.getPrice({ good_type: 'team' }).then((res) => {
          if (res.code === 0) {
            const new_arr = res.data.map((item) => {
              const arr = getItem(item.id, _.data || [])
              return {
                ...item,
                active: false,
                ...arr[0]
              }
            })
            setVipMeal(new_arr[0])
          }
        })
      })
    }
    const num = useMemo(() => {
      return dayjs.unix(vipMeal?.end_at || 0).valueOf() / 1000 //结束时间  毫秒数
    }, [vipMeal])
    const payClick=() => {
      if(resultArr.length===0){
         message.info({
          content: '请选择协作人',
        })
        return
      }
      service.showPay({ show: true, payInfo: vipMeal ,userInfo: resultArr})
    }
  return (
    <div className={style.rightBlock}>
      <div>
        <div className={style.lable}>套餐内容</div>
        <div className={style.mealBlock}>
          <div className={style.vip_title}>团队套餐</div>
          <div className={style.mealList}>
            <div
              className={cs(style.mealItem, {
                [style.activeStyle]: true
              })}
              onClick={() => {
                // mealSelect(_)
              }}
            >
              <div className={style.name}>团队会员</div>
              <div className={style.price}>
              {vipMeal?.original_price && (
                  <span>
                    <i>￥</i>
                    <span>{regFenToYuan(vipMeal?.original_price || 0)}</span>
                  </span>
                )}
                <div>
                  <span>￥</span>
                  {`${regFenToYuan(vipMeal?.now_price || 0)}/人/年`}
                </div>
              </div>
              {vipMeal?.end_at && getResidueTime(num - nowScecond) !== '0' && (
                <div className={style.time}>
                  <span> {getResidueTime(num - nowScecond)}</span>
                  <MealTime className={style.mealTime}></MealTime>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className={style.memberList}>
          <div className={style.lable_sum}>
            <div className={style.title}>开通人数</div>
            <div className={style.memberSum}>
              <span>{`x ${resultArr.length}人`}</span>
            </div>
          </div>
        </div>
      </div>

      {/* 支付按钮 */}
      <div>
        <PayButton  payClick={payClick} resultArr={resultArr} activeGood={vipMeal?[vipMeal]:[]}/>
      </div>
    </div>
  )
}

export default RightBlock
