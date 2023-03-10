/*
 * @Author: wanghui wanghui@flyele.net
 * @Date: 2023-03-09 09:55:49
 * @LastEditors: wanghui wanghui@flyele.net
 * @LastEditTime: 2023-03-09 14:50:36
 * @FilePath: /electron-client/app/components/TeamPayModal/components/PayButton/index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import cs from 'classnames'
import React, { useContext } from 'react'
import { SelectMemberContext } from '../../context/context'
import { VipPayType } from '../controller'
import style from './index.module.scss'

interface Iprops {
  vipPayType: VipPayType
}
const PayButton = (props: Iprops) => {
  const { vipPayType = 1 } = props
  const service = useContext(SelectMemberContext)

  console.log(vipPayType)

  return (
    <div className={style.payButton}>
      <div className={style.priceSum}>
        <span>合计</span>
        <div className={style.price}>
          <span>已省¥12</span>
          <div>
            <span>¥</span>
            <span>18</span>
          </div>
        </div>
      </div>
      <div
        className={cs(style.payBtn, {
          [style.teamPayBtn]: true
        })}
        onClick={() => {
          service.showPay({ show: true, payInfo: '999' })
        }}
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
