/*
 * @Author: wanghui wanghui@flyele.net
 * @Date: 2023-03-08 11:12:16
 * @LastEditors: wanghui wanghui@flyele.net
 * @LastEditTime: 2023-04-10 17:29:47
 * @FilePath: /electron-client/app/components/PersonPayModal/components/PayButton/index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { I18N } from '@flyele-nx/i18n'
import { IActiveGoods } from '@flyele-nx/api'
import cs from 'classnames'
import React from 'react'
import { IFlyeleAvatarItem } from '../../../pay-modal'
import { regFenToYuan } from '../../utils'
import { VipPayType } from '../controller'
import style from './index.module.scss'
import { isCN } from '@flyele-nx/i18n'
import { Paypal } from '@flyele-nx/paypal'

interface Iprops {
  vipType: VipPayType
  activeGood?: IActiveGoods[]
  resultArr?: IFlyeleAvatarItem[]
  mineInfo?: IFlyeleAvatarItem
  payClick: () => void
  goProtocol: () => void
  orderId: string
}
const PayButton = (props: Iprops) => {
  const {
    activeGood = [],
    payClick,
    resultArr = [],
    vipType,
    mineInfo,
    goProtocol,
    orderId
  } = props

  const activeItem = activeGood[0]
  return (
    <div className={style.payButton}>
      {activeItem && (
        <div className={style.priceSum}>
          <span>{I18N.common.totalPrice}</span>
          <div className={style.price}>
            {activeItem && activeItem.end_at && isCN && (
              <span>{`已省¥${
                +regFenToYuan(
                  activeItem.original_price -
                    (activeItem.now_price - (activeItem.price || 0))
                ) * resultArr?.length
              }`}</span>
            )}
            <div>
              <span>{isCN ? '¥' : '$'}</span>
              <span>
                {+regFenToYuan(activeItem.now_price - (activeItem.price || 0)) *
                  resultArr?.length}
              </span>
            </div>
          </div>
        </div>
      )}

      {isCN ? (
        <div
          className={cs(style.payBtn, {
            [style.teamPayBtn]: true,
            [style.noMember]:
              (!mineInfo?.isTeamVip &&
                resultArr.length === 0 &&
                vipType === VipPayType.UPSPACE) ||
              (resultArr.length === 0 && vipType !== VipPayType.UPSPACE)
          })}
          onClick={payClick}
        >
          {vipType === VipPayType.UPSPACE &&
          resultArr.length === 0 &&
          mineInfo?.isTeamVip
            ? I18N.common.upgradeSpaceOnly
            : I18N.common.immediatePayment}
        </div>
      ) : (
        <Paypal productId={orderId}></Paypal>
      )}

      <div className={style.protocol}>
        {I18N.common.paymentIsConsideredAs}
        <span
          className={cs({
            [style.teamColor]: true
          })}
          onClick={() => {
            goProtocol()
          }}
        >
          {I18N.common.feixiangMemberAssociation}
        </span>
      </div>
    </div>
  )
}

export default PayButton
