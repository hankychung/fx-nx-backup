/*
 * @Author: wanghui wanghui@flyele.net
 * @Date: 2023-03-07 20:20:24
 * @LastEditors: wanghui wanghui@flyele.net
 * @LastEditTime: 2023-03-20 20:16:32
 */
import { IActiveGoods } from '@flyele-nx/api'
import { useCreation } from 'ahooks'
import React, { useEffect, useState } from 'react'
import { IFlyeleAvatarItem } from '../../../PayModal'
import { SelectMemberContext } from '../../context/context'
import { SelectMemberService } from '../../context/service'
import { VipPayType } from '../controller'
import PayQrCode from '../PayQrCode'
import LeftBlock from './components/LeftBlock'
import RightBlock from './components/RightBlock'

import style from './index.module.scss'

interface Iprops {
  memberList: IFlyeleAvatarItem[]
  vipType: VipPayType
  mineId: string
}
const TeamVip = (props: Iprops) => {
  const { vipType, memberList, mineId } = props

  const [showPay, setShowPay] = useState<boolean>(false)
  const [payInfo, setPayInfo] = useState<IActiveGoods>()
  const [userInfo, setUserInfo] = useState<IFlyeleAvatarItem[]>()
  const service = useCreation(() => {
    return new SelectMemberService()
  }, [])

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
          <RightBlock vipType={vipType} />
        </div>
        {/* 支付弹窗 */}
        {showPay && (
          <PayQrCode
            payInfo={payInfo}
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
