/*
 * @Author: wanghui wanghui@flyele.net
 * @Date: 2023-03-07 20:20:24
 * @LastEditors: wanghui wanghui@flyele.net
 * @LastEditTime: 2023-03-09 14:53:18
 */
import { useCreation } from 'ahooks'
import React, { useEffect, useState } from 'react'
import { SelectMemberContext } from '../../context/context'
import { SelectMemberService } from '../../context/service'
import { VipPayType } from '../controller'
import PayQrCode from '../PayQrCode'
import LeftBlock from './components/LeftBlock'
import RightBlock from './components/RightBlock'

import style from './index.module.scss'

interface Iprops {
  vipType: VipPayType
}
const TeamVip = (props: Iprops) => {
  const { vipType } = props

  const [showPay, setShowPay] = useState<boolean>(false)
  const service = useCreation(() => {
    return new SelectMemberService()
  }, [])

  useEffect(() => {
    service.addListener((ev) => {
      const { event } = ev

      switch (event) {
        case 'showPay':
          setShowPay(service.getData('showPay').show)

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
          <LeftBlock vipType={vipType} />
        </div>
        <div className={style.block}>
          <RightBlock vipType={vipType} />
        </div>
        {/* 支付弹窗 */}
        {showPay && <PayQrCode />}
      </div>
    </SelectMemberContext.Provider>
  )
}

export default TeamVip
