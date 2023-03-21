/*
 * @Author: wanghui wanghui@flyele.net
 * @Date: 2023-01-10 17:56:57
 * @LastEditors: wanghui wanghui@flyele.net
 * @LastEditTime: 2023-03-20 10:51:48
 */

import React from 'react'
import { QuickPay } from '../QuickPay/index' //快捷支付弹窗
import PersonPayModal from '../PersonPayModal/index' //个人支付弹窗
import TeamPayModal from '../TeamPayModal/index' //团队支付
import { VipMealType } from '../PersonPayModal/components/controller'
import { VipPayType } from '../TeamPayModal/components/controller'

export declare type IFlyeleAvatarItem = {
  userId: string
  name: string
  pinyin?: string
  avatar: string
  telephone: string
  isVip: boolean
  isTeamVip: boolean
}

interface Iprops {
  visible: boolean
  mineId: string
  payType?: VipMealType //个人支付类型 1个人 2团队
  teamVipType?: VipPayType
  modalType: 'quick' | 'person' | 'team' //所有支付弹窗类型
  onClose: () => void
  memberList: IFlyeleAvatarItem[]
}

export default function PayModal(props: Iprops) {
  const {
    visible,
    modalType,
    payType,
    onClose,
    memberList,
    mineId,
    teamVipType = 1
  } = props

  const buildPayModal = () => {
    if (!modalType) return null

    switch (modalType) {
      case 'quick':
        return (
          <QuickPay onClose={onClose} memberList={memberList} mineId={mineId} />
        )
      case 'person':
        return (
          <PersonPayModal
            payType={payType}
            onClose={onClose}
            memberList={memberList}
            mineId={mineId}
          />
        )
      case 'team':
        return (
          <TeamPayModal
            vipType={teamVipType}
            onClose={onClose}
            memberList={memberList}
            mineId={mineId}
          />
        )
      default:
        return null
    }
  }

  return <div>{visible && <div>{buildPayModal()}</div>}</div>
}
