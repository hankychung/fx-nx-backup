/*
 * @Author: wanghui wanghui@flyele.net
 * @Date: 2023-03-09 09:55:49
 * @LastEditors: wanghui wanghui@flyele.net
 * @LastEditTime: 2023-05-04 18:05:09
 * @FilePath: /electron-client/app/components/TeamPayModal/components/Header/index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { ReactComponent as WechatIcon } from '../../../assets/payImg/wechat_icon.svg'
import style from './index.module.scss'
import Protocol from './components/protocol'
import SuccessPay from './components/success-pay'
import { IActiveGoods } from '@flyele-nx/api'
import { paymentApi } from '@flyele-nx/service'
import { useMemoizedFn } from 'ahooks'
import QRCode from 'qrcode'
import LogOut from './components/log-out'
import { IFlyeleAvatarItem } from '../../pay-modal'
import { regFenToYuan } from '../../quick-pay/utils'
import { envStore } from '@flyele-nx/service'
import { useUserInfoStore } from '@flyele-nx/global-processor'

const PayQrCode = ({
  isShowPay,
  // vipMeal,
  // memberList,
  onClose,
  vipMeal
}: // goProtocol,
// domain
{
  isShowPay: boolean
  vipMeal: IActiveGoods
  // domain: string
  // memberList: IFlyeleAvatarItem[]
  onClose: () => void
  // goProtocol: () => void
}) => {
  const [qrCode, setQrCode] = useState('')
  const isInit = useRef(false)
  const domain = envStore.getPayHost()
  const memberList: string[] = [
    useUserInfoStore((state) => state.userInfo.user_id)
  ]
  const qrCodeFunction = useMemoizedFn(async () => {
    const params = {
      amount: 1,
      coupon_id: vipMeal?.price ? vipMeal?.coupon_id : 0,
      good_id: vipMeal?.id || 0,
      // good_id: 8,
      origin_route: 'PC客户端',
      total_price: (vipMeal?.now_price || 0) - (vipMeal?.price || 0) || 0,
      // total_price: 1,
      users_id: memberList,
      indent_member_type: 1
    }
    try {
      paymentApi.createOrder(params).then(async (_) => {
        const a = {
          ..._.data,
          total_price: (vipMeal?.now_price || 0) - (vipMeal?.price || 0) || 0
        }
        const res = await QRCode.toDataURL(
          `${domain}/payDetail?params=${JSON.stringify(
            a
          )}&&token=${paymentApi.getToken()}`
        )
        setQrCode(res)
      })
    } catch {
      console.log('00')
    }
  })
  useEffect(() => {
    console.log(vipMeal, 'vipMeal')

    if (isInit.current && vipMeal) return
    if (vipMeal) {
      console.log(vipMeal, 'vipMeal')

      qrCodeFunction()
    }
    if (vipMeal) {
      isInit.current = true
    }
  }, [qrCodeFunction, vipMeal])

  return (
    <div>
      {!isShowPay && (
        <div className={style.payQrCode}>
          <div className={style.payInfo}>
            <div className={style.priceTips}>优惠后应付金额</div>
            <div className={style.price}>
              <span> ￥</span>
              <span>
                {regFenToYuan(
                  (vipMeal?.now_price || 0) - (vipMeal?.price || 0) || 0
                )}
              </span>
            </div>
            <div className={style.code}>
              {qrCode && (
                <img alt="qrcode" src={qrCode} className={style.qrcode} />
              )}
            </div>
            <div className={style.payIcon}>
              <div className={style.iconItem}>
                <WechatIcon className={style.qrcode}></WechatIcon>
                <div>使用微信扫码完成支付</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 支付成功  */}
      {isShowPay && (
        <div>
          <SuccessPay onClose={onClose} />
        </div>
      )}
    </div>
  )
}

export default PayQrCode
