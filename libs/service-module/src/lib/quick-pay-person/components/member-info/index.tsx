/*
 * @Author: wanghui wanghui@flyele.net
 * @Date: 2023-03-09 17:03:34
 * @LastEditors: wanghui wanghui@flyele.net
 * @LastEditTime: 2023-04-25 14:56:16
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
import PayModal, { IFlyeleAvatarItem } from '../../../pay-modal'
import { IActiveGoods, ICoupon, paymentApi } from '@flyele-nx/api'
import { getResidueTime, regFenToYuan } from '../../utils'
import { useCurrentTime } from '../../hoooks/useCurrentTime'
import { useMemoizedFn } from 'ahooks'
import meal_time from '../../../../assets/payImg/meal_time.svg'
import { globalNxController } from '@flyele-nx/global-processor'

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
  const Controller = useController(new FlyBasePopperCtrl())
  const { nowScecond } = useCurrentTime()

  const getItem = (id: number, list: ICoupon[]) => {
    return list.filter((item) => +item.ref_goods_id === id)
  }
  const getMealList = useMemoizedFn(async () => {
    paymentApi.createCoupon({ coupon_id: [1, 2, 3, 4, 5, 6, 7] }).then((_) => {
      paymentApi.getPrice({ good_type: 'person' }).then((res) => {
        if (res.code === 0) {
          console.log('res', res)

          const list =
            res.data &&
            res.data.length &&
            res.data.filter((item) => item.name === '终身会员')
          console.log('test-list', list)
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
            console.log('new_arr', new_arr)
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
      {/* <div className={style.member}>
        <div className={style.mem_info}>
          <FlyAvatar src={memberList[0].avatar} size={30} />
          <div className={style.mem_name}>
            <div className={style.name_icon}>
              <div className={style.name}>{memberList[0]?.name}</div>
              {mineId === memberList[0]?.userId && (
                <div className={style.mine}>我</div>
              )}
              {memberList[0]?.isVip && !memberList[0]?.isTeamVip && (
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
      </div> */}
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
            <div>个人会员·终身会员</div>
            <div className={style.more}>
              开通后立即享受众多
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
                个人会员权益
              </span>
            </div>
          </div>
          <div className={style.price}>
            {vipMeal?.original_price && (
              <span>
                <i>￥</i>
                {/* <span>{regFenToYuan(vipMeal?.original_price || 0)}</span> */}
                <span>499</span>
              </span>
            )}
            <div>
              <span>￥</span>
              {`${regFenToYuan(
                (vipMeal?.now_price || 0) - (vipMeal?.price || 0) || 0
              )}`}
            </div>
          </div>
          {vipMeal?.end_at && getResidueTime(num - nowScecond) !== '0' && (
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
        已为您选择最优惠套餐&nbsp; <span onClick={handleModalType}>切换</span>
      </div>
    </div>
  )
}

export default MemberInfo
