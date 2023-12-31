/*
 * @Author: wanghui wanghui@flyele.net
 * @Date: 2023-03-08 09:43:55
 * @LastEditors: wanghui wanghui@flyele.net
 * @LastEditTime: 2023-07-21 16:54:21
 * @FilePath: /electron-client/app/components/PersonPayModal/components/PersonVip/components/RightBlock/index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { I18N, isCN } from '@flyele-nx/i18n'
import React, { useContext, useEffect, useMemo, useState } from 'react'
import cs from 'classnames'
import { ReactComponent as MealTime } from '../../../../../../assets/payImg/meal_time.svg'
import { FlyAvatar, FlyAvatarWithIcon } from '@flyele/flyele-components'
import { ReactComponent as InviteMember } from '../../../../../../assets/payImg/invite_member.svg'
import style from './index.module.scss'
import PayButton from '../../../pay-button'
import { VipMealType } from '../../../controller'
import { SelectMemberContext } from '../../../../context/context'
import { IActiveGoods, ICoupon } from '@flyele-nx/api'
import { paymentApi } from '@flyele-nx/service'
import { getResidueTime, regFenToYuan } from '../../../../utils'
import { useCurrentTime } from '../../../../hooks/useCurrentTime'
import * as dayjs from 'dayjs'
import { IFlyeleAvatarItem } from '../../../../../pay-modal'
import { useMemoizedFn } from 'ahooks'
import RetrievePayModalTeam from '../../../../../retrieve-pay-modal-team'
const RightBlock = ({
  vipMealType,
  goProtocol,
  couponList,
  showMsg,
  hasShowRetrieveModal,
  setHasShowRetrieveModal,
  originRoute,
  isRequest,
  setIsRequest
}: {
  vipMealType: VipMealType
  goProtocol: () => void
  showMsg?: () => void
  couponList?: ICoupon[]
  hasShowRetrieveModal: boolean
  setHasShowRetrieveModal: () => void
  originRoute?: string
  isRequest?: boolean
  setIsRequest?: (_: boolean) => void
}) => {
  const service = useContext(SelectMemberContext)
  const [resultArr, setResultArr] = useState<IFlyeleAvatarItem[]>([])
  const [vipMeal, setVipMeal] = useState<IActiveGoods>() // 套餐list
  const { nowScecond } = useCurrentTime()
  const [showTeam, setShowTeam] = useState(false)
  const [productId, setProductId] = useState('')

  useEffect(() => {
    service.addListener((ev) => {
      const { event } = ev
      switch (event) {
        case 'selectMember':
          setResultArr(service.getData('selectMember').list)
          break
        case 'showPay':
          if (service.getData('showPay').vipMealType === VipMealType.TEAM) {
            setShowTeam(true)
          }
          break
        default:
      }
    })

    return () => {
      service.dispose()
    }
  }, [service])

  const getItem = (id: number, list: ICoupon[]) => {
    return list.filter((item) => +item.ref_goods_id === id)
  }
  const getMealList = useMemoizedFn(async () => {
    paymentApi.getGoodsList({ good_type: 'team' }).then((res) => {
      if (res.code === 0) {
        const new_arr = res.data.map((item) => {
          const arr = getItem(item.id, couponList || [])
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
        setIsRequest && setIsRequest(false)
        setVipMeal(new_arr[0])
      }
    })
  })
  //获取套餐
  useEffect(() => {
    if (vipMealType === VipMealType.TEAM && isRequest) {
      getMealList()
    }
  }, [vipMealType, getMealList, isRequest])
  const num = useMemo(() => {
    return dayjs.unix(vipMeal?.end_at || 0).valueOf() / 1000 //结束时间  毫秒数
  }, [vipMeal])
  const payClick = () => {
    if (!resultArr.length) {
      showMsg && showMsg()
      return
    }
    service.showPay({ show: true, payInfo: vipMeal, userInfo: resultArr })
  }
  //修改优惠
  useEffect(() => {
    if (
      vipMeal?.end_at &&
      getResidueTime(num - nowScecond) === '0' &&
      vipMeal.price
    ) {
      setVipMeal({ ...vipMeal, price: 0, coupon_id: 0 })
    }
  }, [nowScecond, vipMeal, num])

  const isOldUser = useMemo(() => {
    const start = dayjs.unix(vipMeal?.create_at || 0).valueOf() / 1000 //结束时间  毫秒数
    const end = dayjs.unix(vipMeal?.end_at || 0).valueOf() / 1000 //结束时间  毫秒数
    const totalSeconds = end - start
    const day = parseInt(`${totalSeconds / 3600 / 24}`)
    return day > 5 ? true : false
  }, [vipMeal])

  //获取订单号
  const qrCodeFunction = useMemoizedFn(async () => {
    const userInfo = resultArr
    const payInfo = vipMeal
    if (!payInfo || !payInfo.id) return

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
    if (isCN || !vipMeal) return
    qrCodeFunction()
  }, [vipMeal, resultArr, qrCodeFunction])

  return (
    <div className={style.rightBlock}>
      <div>
        <div className={style.mealBlock}>
          <div className={style.title}>{I18N.common.teamPackage}</div>
          <div className={style.mealList}>
            <div
              className={cs(style.mealItem, {
                [style.activeStyle]: true
              })}
              onClick={() => {
                // mealSelect(_)
              }}
            >
              <div className={style.vip_name}>{I18N.common.business}</div>
              <div className={style.price}>
                {vipMeal?.original_price && isCN && (
                  <span>
                    <i>￥</i>
                    <span>{regFenToYuan(vipMeal?.original_price || 0)}</span>
                  </span>
                )}
                <div>
                  <span>{isCN ? '￥' : '$'}</span>
                  {`${regFenToYuan(
                    (vipMeal?.now_price || 0) - (vipMeal?.price || 0) || 0
                  )}${I18N.common.regFe}`}
                </div>
              </div>
              {vipMeal?.end_at && getResidueTime(num - nowScecond) !== '0' && (
                <div className={style.time}>
                  <span>
                    {getResidueTime(
                      num - nowScecond,
                      (
                        (vipMeal?.now_price - (vipMeal.price || 0)) /
                        vipMeal?.original_price
                      ).toFixed(2),
                      isOldUser
                    )}
                  </span>
                  <MealTime className={style.mealTime}></MealTime>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className={style.memberList}>
          <div className={style.lable_vip}>
            <div className={style.title}>{I18N.common.openTo}</div>
            <div className={style.memberSum}>
              {I18N.common.numberOfUsersOpened}
              <span>{` x${resultArr.length}`}</span>
            </div>
          </div>

          <div className={style.members}>
            {resultArr.map((_) => {
              return (
                <div key={_.userId} className={style.item}>
                  <div className={style.show} id="member_info">
                    <FlyAvatarWithIcon
                      iconPos="topRight"
                      icon="delete"
                      src={_.avatar}
                      size={30}
                      border={true}
                      iconCursor="pointer"
                      onClickIcon={() => {
                        service.selectMember({
                          list: resultArr.filter(
                            (item) => item.userId !== _.userId
                          )
                        })
                      }}
                    />
                  </div>
                  <div className={style.hide}>
                    <FlyAvatar src={_.avatar} size={30} border={true} />
                  </div>
                  <p className={style.name}>{_.name}</p>
                </div>
              )
            })}
            <div
              onClick={() => {
                service.show(true)
                service.selectMember({ list: resultArr })
              }}
              id="invite_member"
            >
              <InviteMember className={style.invite_member}></InviteMember>
            </div>
          </div>
        </div>
      </div>

      {/* 支付按钮 */}
      <div>
        <PayButton
          vipMealType={VipMealType.TEAM}
          activeGood={vipMeal ? [vipMeal] : []}
          payClick={payClick}
          resultArr={resultArr}
          goProtocol={goProtocol}
          productId={productId}
        />
      </div>
      {!hasShowRetrieveModal && (
        <RetrievePayModalTeam
          isShow={showTeam}
          onClose={() => {
            setShowTeam(false)
            setHasShowRetrieveModal()
          }}
        />
      )}
    </div>
  )
}

export default RightBlock
