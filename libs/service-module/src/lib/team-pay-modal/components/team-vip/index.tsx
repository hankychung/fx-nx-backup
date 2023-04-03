/*
 * @Author: wanghui wanghui@flyele.net
 * @Date: 2023-03-07 20:20:24
 * @LastEditors: wanghui wanghui@flyele.net
 * @LastEditTime: 2023-04-03 17:21:19
 */
import { IActiveGoods } from '@flyele-nx/api'
import { useCreation } from 'ahooks'
import React, { useEffect, useState } from 'react'
import { IFlyeleAvatarItem } from '../../../pay-modal'
import { SelectMemberContext } from '../../context/context'
import { SelectMemberService } from '../../context/service'
import { VipPayType } from '../controller'
import PayQrCode from '../pay-qrcode'
import LeftBlock from './components/left-block'
import RightBlock from './components/right-block'

import style from './index.module.scss'

interface Iprops {
  memberList: IFlyeleAvatarItem[]
  vipType: VipPayType
  mineId: string
  spaceId?: string
  isPaySuccess: boolean
  upSpace?: () => void
  senConfirm?: () => void
  onClose?: () => void
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
    onClose
  } = props

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
          <RightBlock
            vipType={vipType}
            upSpace={upSpace}
            mineInfo={memberList.filter((item) => item.userId === mineId)[0]}
          />
        </div>
        {/* 支付弹窗 */}
        {showPay && (
          <PayQrCode
            payInfo={payInfo}
            spaceId={spaceId}
            senConfirm={senConfirm}
            isPaySuccess={isPaySuccess}
            onClose={onClose}
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
