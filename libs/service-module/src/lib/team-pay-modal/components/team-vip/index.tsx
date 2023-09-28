/*
 * @Author: wanghui wanghui@flyele.net
 * @Date: 2023-03-07 20:20:24
 * @LastEditors: wanghui wanghui@flyele.net
 * @LastEditTime: 2023-04-24 10:36:34
 */
import { IActiveGoods, paymentApi } from '@flyele-nx/api'
import { useCreation } from 'ahooks'
import React, { useCallback, useEffect, useState } from 'react'
import { IFlyeleAvatarItem } from '../../../pay-modal'
import { SelectMemberContext } from '../../context/context'
import { SelectMemberService } from '../../context/service'
import { VipPayType } from '../controller'
import PayQrCode from '../pay-qrcode'
import LeftBlock from './components/left-block'
import RightBlock from './components/right-block'

import style from './index.module.scss'
import { VipMealType } from '../../../person-pay-modal/components/controller'
import { isCN } from '@flyele-nx/i18n'

interface Iprops {
  memberList: IFlyeleAvatarItem[]
  vipType: VipPayType
  mineId: string
  spaceId?: string
  domain: string
  isPaySuccess: boolean
  upSpace?: () => void
  senConfirm?: () => void
  onClose?: () => void
  goProtocol: () => void
  showMsg?: () => void
}
const TeamVip = (props: Iprops) => {
  const {
    vipType,
    memberList,
    mineId,
    spaceId,
    upSpace,
    senConfirm,
    isPaySuccess,
    onClose,
    goProtocol,
    showMsg,
    domain
  } = props

  const [showPay, setShowPay] = useState<boolean>(false)
  const [payInfo, setPayInfo] = useState<IActiveGoods>()
  const [userInfo, setUserInfo] = useState<IFlyeleAvatarItem[]>()
  const service = useCreation(() => {
    return new SelectMemberService()
  }, [])
  const [orderId, setOrderId] = useState('')

  const getOrder = useCallback(async () => {
    console.log('get order')

    if (!userInfo) return null

    const params = {
      amount: userInfo.length,
      coupon_id: payInfo?.price ? payInfo?.coupon_id : 0,
      good_id: payInfo?.id || 0,
      // good_id: 8,
      origin_route: 'PC客户端',
      total_price:
        ((payInfo?.now_price || 0) - (payInfo?.price || 0) || 0) *
        userInfo.length,
      // total_price: 1,
      users_id: userInfo.map((item) => item.userId),
      workspace_id: spaceId,
      indent_member_type: VipMealType.TEAM
    }

    const _ = await paymentApi.createOrder(params)

    return {
      ..._.data,
      total_price:
        ((payInfo?.now_price || 0) - (payInfo?.price || 0) || 0) *
        userInfo.length
    }
  }, [payInfo, userInfo, spaceId])

  useEffect(() => {
    if (isCN) return

    getOrder().then((res) => {
      console.log('trading', res)
      const { out_trade_no } = res
      setOrderId(out_trade_no)
    })
  }, [getOrder])

  useEffect(() => {
    service.addListener((ev) => {
      const { event } = ev

      switch (event) {
        case 'showPay':
          setShowPay(service.getData('showPay').show)
          setPayInfo(service.getData('showPay').payInfo)
          setUserInfo(service.getData('showPay').userInfo)
          break

        default:
      }
    })

    return () => {
      service.dispose()
    }
  }, [service])
  return (
    <SelectMemberContext.Provider value={service}>
      <div className={style.teamVip}>
        <div className={style.block}>
          <LeftBlock
            vipType={vipType}
            memberList={memberList}
            mineId={mineId}
          />
        </div>
        <div className={style.block}>
          <RightBlock
            vipType={vipType}
            upSpace={upSpace}
            showMsg={showMsg}
            goProtocol={goProtocol}
            mineInfo={memberList.filter((item) => item.userId === mineId)[0]}
            orderId={orderId}
          />
        </div>
        {/* 支付弹窗 */}
        {showPay && (
          <PayQrCode
            getOrder={getOrder}
            payInfo={payInfo}
            spaceId={spaceId}
            senConfirm={senConfirm}
            isPaySuccess={isPaySuccess}
            onClose={onClose}
            goProtocol={goProtocol}
            domain={domain}
            userInfo={
              userInfo
                ? userInfo
                : memberList.filter((item) => item.userId === mineId)
            }
          />
        )}
      </div>
    </SelectMemberContext.Provider>
  )
}

export default TeamVip
