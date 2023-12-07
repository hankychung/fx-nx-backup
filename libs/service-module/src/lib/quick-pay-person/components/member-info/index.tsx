/*
 * @Author: wanghui wanghui@flyele.net
 * @Date: 2023-03-09 17:03:34
 * @LastEditors: wanghui wanghui@flyele.net
 * @LastEditTime: 2023-04-25 14:56:16
 * @FilePath: /electron-client/app/components/QuickPay/components/MemberInfo/index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE99
 */
import { I18N } from '@flyele-nx/i18n'
import React, { useEffect, useMemo } from 'react'
import { ReactComponent as MealTime } from '../../../../assets/payImg/meal_time.svg'
import * as dayjs from 'dayjs'
import cs from 'classnames'
import style from './index.module.scss'
import { IFlyeleAvatarItem } from '../../../pay-modal'
import { IActiveGoods, ICoupon } from '@flyele-nx/api'
import { paymentApi } from '@flyele-nx/service'
import { getResidueTime, regFenToYuan } from '../../utils'
import { useCurrentTime } from '../../hoooks/useCurrentTime'
import { useMemoizedFn } from 'ahooks'
import { globalNxController } from '@flyele-nx/global-processor'
import { globalInfoHandler } from '@flyele-nx/zustand-handler'

const MemberInfo = ({
  memberList,
  mineId,
  setVipMeal,
  vipMeal,
  handleModalType
}: {
  memberList: IFlyeleAvatarItem[]
  mineId: string
  vipMeal?: IActiveGoods
  setVipMeal: (_: IActiveGoods) => void
  handleModalType: () => void
}) => {
  const isCN = globalInfoHandler.langIsCn()
  const { nowScecond } = useCurrentTime()

  const getItem = (id: number, list: ICoupon[]) => {
    return list.filter((item) => +item.ref_goods_id === id)
  }
  const getMealList = useMemoizedFn(async () => {
    paymentApi.createCoupon({ coupon_id: [1, 2, 3, 4, 5, 6, 7] }).then((_) => {
      paymentApi.getGoodsList({ good_type: 'person' }).then((res) => {
        if (res.code === 0) {
          console.log('res', res)

          const list =
            res.data &&
            res.data.length &&
            // 14-终身会员 / 29-年套餐
            res.data.filter((item) => item.id === 29)
          // res.data.filter((item) => item.id === (isCN ? 14 : 29))
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
            setVipMeal(new_arr[0])
          }
        }
      })
    })
  })
  //获取套餐
  useEffect(() => {
    getMealList()
  }, [getMealList])
  const num = useMemo(() => {
    return dayjs.unix(vipMeal?.end_at || 0).valueOf() / 1000 //结束时间  毫秒数
  }, [vipMeal])

  //修改优惠
  useEffect(() => {
    if (
      vipMeal?.end_at &&
      getResidueTime(num - nowScecond) === '0' &&
      vipMeal.price
    ) {
      setVipMeal({ ...vipMeal, price: 0, coupon_id: 0 })
    }
  }, [nowScecond, vipMeal, num, setVipMeal])

  return (
    <div className={style.memberInfo}>
      <div className={style.mealList}>
        <div
          className={cs(style.mealItem, {
            [style.activeStyle]: true
          })}
          onClick={() => {
            // mealSelect(_)
          }}
        >
          <div className={style.name}>
            <div>{I18N.common.individualMembershipEnd}</div>
            <div className={style.more}>
              {I18N.common.immediatelyAfterOpening}
              <span
                onClick={() => {
                  const shell = globalNxController.electronShell()
                  if (shell) {
                    // 先判断 有没有 electron
                    shell.openExternal(`https://official-website.flyele.net`)
                  } else {
                    // 再用 普通 web打开新页面的方式
                    window.open(`https://official-website.flyele.net`)
                  }
                }}
              >
                {I18N.common.individualMembershipRights}
              </span>
            </div>
          </div>
          <div className={style.price}>
            {isCN && vipMeal?.original_price && (
              <span>
                <i>￥</i>
                {/* <span>{regFenToYuan(vipMeal?.original_price || 0)}</span> */}
                <span>499</span>
              </span>
            )}
            <div>
              <span>{isCN ? '￥' : '$'}</span>
              {`${regFenToYuan(
                (vipMeal?.now_price || 0) - (vipMeal?.price || 0) || 0
              )}`}
            </div>
          </div>
          {isCN &&
            vipMeal?.end_at &&
            getResidueTime(num - nowScecond) !== '0' && (
              <div className={style.time}>
                <span>
                  {getResidueTime(
                    num - nowScecond,
                    (
                      (vipMeal?.now_price - (vipMeal?.price || 0)) /
                      vipMeal?.original_price
                    ).toFixed(2)
                  )}
                </span>
                <MealTime className={style.mealTime}></MealTime>
              </div>
            )}
        </div>
      </div>
      <div className={style.switchCoupon}>
        {I18N.common.selectedForYou}&nbsp;
        <span onClick={handleModalType}>{I18N.common.switch}</span>
      </div>
    </div>
  )
}

export default MemberInfo
