/*
 * @Author: wanghui wanghui@flyele.net
 * @Date: 2023-03-08 11:12:16
 * @LastEditors: wanghui wanghui@flyele.net
 * @LastEditTime: 2023-03-18 14:55:05
 * @FilePath: /electron-client/app/components/PersonPayModal/components/PayButton/index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { IActiveGoods } from '@flyele-nx/api'
import cs from 'classnames'
import _ from 'lodash'
import React from 'react'
import { IFlyeleAvatarItem } from '../../../PayModal'

import { regFenToYuan } from '../../utils'
import style from './index.module.scss'

interface Iprops {
  activeGood?: IActiveGoods[]
  resultArr?: IFlyeleAvatarItem[]
  payClick: () => void
}
const PayButton = (props: Iprops) => {
  const {  activeGood = [], payClick, resultArr = [] } = props

  const activeItem = activeGood[0]
  return (
    <div className={style.payButton}>
      {activeItem && (
        <div className={style.priceSum}>
          <span>合计</span>
          <div className={style.price}>
            {activeItem && activeItem.end_at && (
              <span>{`已省¥${
                +regFenToYuan(
                  activeItem.original_price - activeItem.now_price
                ) * resultArr?.length
              }`}</span>
            )}
            <div>
              <span>¥</span>
              <span>
                {+regFenToYuan(activeItem.now_price) * resultArr?.length}
              </span>
            </div>
          </div>
        </div>
      )}
      <div
        className={cs(style.payBtn, {
          [style.teamPayBtn]: true
        })}
        onClick={payClick}
      >
        立即支付
      </div>
      <div className={style.protocol}>
        支付即视为同意
        <span
          className={cs({
            [style.teamColor]: true
          })}
        >
          《飞项会员协议》
        </span>
      </div>
    </div>
  )
}

export default PayButton
