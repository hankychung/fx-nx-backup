/*
 * @Author: wanghui wanghui@flyele.net
 * @Date: 2023-01-10 17:56:57
 * @LastEditors: wanghui wanghui@flyele.net
 * @LastEditTime: 2023-03-10 17:44:56
 */

import React from 'react'
import {QuickPay}  from '../QuickPay/index'//快捷支付弹窗
import PersonPayModal from '../PersonPayModal/index'//个人支付弹窗
import TeamPayModal from '../TeamPayModal/index' //团队支付
import { VipMealType } from '../PersonPayModal/components/controller'

interface Iprops {
  visible:boolean
  payType?:VipMealType  //个人支付类型 1个人 2团队
  modalType:'quick' | 'person' | 'team' //所有支付弹窗类型
  onClose:()=>void
}

export default function PayModal(props:Iprops) {
  const {visible,modalType,payType,onClose} = props

  const buildPayModal = () => {
    if (!modalType) return null
    switch (modalType) {
      case 'quick':
        return <QuickPay onClose={onClose}/>
      case 'person':
        return <PersonPayModal payType={payType} onClose={onClose}/>
      case 'team':
        return <TeamPayModal vipType={1} onClose={onClose}/>
      default:
        return null
    }
  }

  return <>{visible && <div>{buildPayModal()}</div>}</>
}
