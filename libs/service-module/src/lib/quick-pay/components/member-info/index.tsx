/*
 * @Author: wanghui wanghui@flyele.net
 * @Date: 2023-03-09 17:03:34
 * @LastEditors: wanghui wanghui@flyele.net
 * @LastEditTime: 2023-04-10 17:15:16
 * @FilePath: /electron-client/app/components/QuickPay/components/MemberInfo/index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE99
 */
import React, { useEffect, useMemo } from 'react'
import {
  FlyAvatar,
  FlyBasePopper,
  FlyBasePopperCtrl,
  useController
} from '@flyele/flyele-components'
import { ReactComponent as Customer } from '../../../../assets/payImg/customer.svg'
import { ReactComponent as MealTime } from '../../../../assets/payImg/meal_time.svg'
import { ReactComponent as MemberPersonVip } from '../../../../assets/payImg/member_person_vip.svg'
import { ReactComponent as MemberTeamVip } from '../../../../assets/payImg/member_team_vip.svg'
import * as dayjs from 'dayjs'
import cs from 'classnames'
import style from './index.module.scss'
import CustomerServicesModal from '../../../customer-services-modal'
import { IFlyeleAvatarItem } from '../../../pay-modal'
import { IActiveGoods, ICoupon, paymentApi } from '@flyele-nx/api'
import { getResidueTime, regFenToYuan } from '../../utils'
import { useCurrentTime } from '../../hoooks/useCurrentTime'
import { useMemoizedFn } from 'ahooks'

const MemberInfo = ({
  memberList,
  mineId,
  setVipMeal,
  vipMeal
}: {
  memberList: IFlyeleAvatarItem[]
  mineId: string
  vipMeal?: IActiveGoods
  setVipMeal: (_: IActiveGoods) => void
}) => {
  const Controller = useController(new FlyBasePopperCtrl())
  const { nowScecond } = useCurrentTime()

  const getItem = (id: number, list: ICoupon[]) => {
    return list.filter((item) => +item.ref_goods_id === id)
  }
  const getMealList = useMemoizedFn(async () => {
    paymentApi.createCoupon({ coupon_id: [1, 2, 3, 4] }).then((_) => {
      paymentApi.getPrice({ good_type: 'team' }).then((res) => {
        if (res.code === 0) {
          const new_arr = res.data.map((item) => {
            const arr = getItem(item.id, _.data || [])
            return {
              ...arr[0],
              ...item,
              active: false
            }
          })
          setVipMeal(new_arr[0])
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
  return (
    <div className={style.memberInfo}>
      <div className={style.member}>
        <div className={style.mem_info}>
          <FlyAvatar src={''} size={30} />
          <div className={style.mem_name}>
            <div className={style.name_icon}>
              <span>{memberList[0]?.name}</span>
              {mineId === memberList[0]?.userId && (
                <div className={style.mine}>我</div>
              )}
              {memberList[0]?.isVip && (
                <MemberPersonVip
                  className={style.member_person_vip}
                ></MemberPersonVip>
              )}
              {memberList[0]?.isTeamVip && (
                <MemberTeamVip
                  className={style.member_team_vip}
                ></MemberTeamVip>
              )}
            </div>
            <span>{memberList[0]?.telephone}</span>
          </div>
        </div>
        <FlyBasePopper
          controller={Controller}
          trigger="click"
          placement="bottom-end"
          showArrow={false}
          content={() => (
            <div>
              <CustomerServicesModal
                onClose={() => {
                  Controller.hide()
                }}
              ></CustomerServicesModal>
            </div>
          )}
        >
          <div className={style.customer}>
            <Customer></Customer>
            <span>客服</span>
          </div>
        </FlyBasePopper>
      </div>
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
              {`${regFenToYuan(
                (vipMeal?.now_price || 0) - (vipMeal?.price || 0) || 0
              )}/人/年`}
            </div>
          </div>
          {vipMeal?.end_at && getResidueTime(num - nowScecond) !== '0' && (
            <div className={style.time}>
              <span>
                {' '}
                {getResidueTime(
                  num - nowScecond,
                  (
                    vipMeal?.now_price -
                    (vipMeal?.price || 0) / vipMeal?.original_price
                  ).toFixed(2)
                )}
              </span>
              <MealTime className={style.mealTime}></MealTime>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default MemberInfo
