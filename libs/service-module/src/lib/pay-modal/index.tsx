/*
 * @Author: wanghui wanghui@flyele.net
 * @Date: 2023-01-10 17:56:57
 * @LastEditors: wanghui wanghui@flyele.net
 * @LastEditTime: 2023-03-25 17:57:20
 */

import React, { useMemo } from 'react'
import { QuickPay } from '../quick-pay/index' //快捷支付弹窗
import PersonPayModal from '../person-pay-modal/index' //个人支付弹窗
import TeamPayModal from '../team-pay-modal/index' //团队支付
import { VipMealType } from '../person-pay-modal/components/controller'
import { VipPayType } from '../team-pay-modal/components/controller'
import { sortMap } from '../person-pay-modal/utils'

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
  const sortMemberList = useMemo((): IFlyeleAvatarItem[] => {
    // 排序规则
    const sortList = memberList.map((t) => {
      // 初始化排序
      const item = { ...t, sort: 0 }
      const { pinyin = '' } = item

      // 没有拼音情况下
      if (!item.pinyin) {
        item.sort = sortMap.other
      } else {
        // 拼音首字母排序
        const sort = sortMap[pinyin[0].toLowerCase()]
        item.sort = typeof sort === 'number' ? sort : sortMap.other
      }

      return { ...item }
    })

    sortList.sort((item1, item2) => {
      return item1.sort - item2.sort
    })

    return sortList
  }, [memberList])
  const buildPayModal = () => {
    if (!modalType) return null

    switch (modalType) {
      case 'quick':
        return (
          <QuickPay
            onClose={onClose}
            memberList={sortMemberList}
            mineId={mineId}
          />
        )
      case 'person':
        return (
          <PersonPayModal
            payType={payType}
            onClose={onClose}
            memberList={sortMemberList}
            mineId={mineId}
          />
        )
      case 'team':
        return (
          <TeamPayModal
            vipType={teamVipType}
            onClose={onClose}
            memberList={sortMemberList}
            mineId={mineId}
          />
        )
      default:
        return null
    }
  }

  return <div>{visible && <div>{buildPayModal()}</div>}</div>
}
