/*
 * @Author: wanghui wanghui@flyele.net
 * @Date: 2023-03-09 09:55:49
 * @LastEditors: wanghui wanghui@flyele.net
 * @LastEditTime: 2023-04-06 19:54:56
 * @FilePath: /electron-client/app/components/TeamPayModal/components/Header/index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React, { useEffect, useState } from 'react'
import { ReactComponent as WechatIcon } from '../../../../assets/payImg/wechat_icon.svg'
import style from './index.module.scss'
import Protocol from './components/protocol'
import SuccessPay from './components/success-pay'
import { IActiveGoods, paymentApi } from '@flyele-nx/api'
import { regFenToYuan } from '../../utils'
import { useMemoizedFn } from 'ahooks'
import QRCode from 'qrcode'
import { IFlyeleAvatarItem } from '../../../pay-modal'

const PayQrCode = ({
  isPaySuccess,
  vipMeal,
  memberList,
  onClose
}: {
  isPaySuccess: boolean
  vipMeal?: IActiveGoods
  memberList: IFlyeleAvatarItem[]
  onClose?: () => void
}) => {
  const [qrCode, setQrCode] = useState('')

  //获取二维码
  const qrCodeFunction = useMemoizedFn(async () => {
    const params = {
      amount: 1,
      coupon_id: vipMeal?.coupon_id || 0,
      good_id: vipMeal?.id || 0,
      // good_id: 8,
      origin_route: 'PC客户端',
      total_price: vipMeal?.now_price || 0,
      // total_price: 1,
      users_id: memberList.map((item) => item.userId),
      indent_member_type: 2
    }
    try {
      paymentApi.createOrder(params).then(async (_) => {
        const a = {
          ..._.data,
          total_price: vipMeal?.now_price || 0
        }
        const res = await QRCode.toDataURL(
          `https://pay-test.flyele.vip/payDetail?params=${JSON.stringify(
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
    qrCodeFunction()
  }, [qrCodeFunction])
  return (
    <div>
      {!isPaySuccess && (
        <div className={style.payQrCode}>
          <div className={style.payInfo}>
            <div className={style.price}>
              <span> ￥</span>
              <span>{regFenToYuan(vipMeal?.now_price || 0)}</span>
              {vipMeal?.original_price && (
                <span>{`已省¥${regFenToYuan(
                  vipMeal?.original_price - vipMeal?.now_price
                )}`}</span>
              )}
            </div>
            <div className={style.code}>
              <img alt="qrcode" src={qrCode} className={style.qrcode} />
            </div>
            <div className={style.payIcon}>
              <div className={style.iconItem}>
                <WechatIcon className={style.qrcode}></WechatIcon>
                <span>微信支付</span>
              </div>
              {/* <span>/</span>
              <div className={style.iconItem}>
                <AlipayIcon className={style.qrcode}></AlipayIcon>
                <span>支付宝支付</span>
              </div> */}
            </div>
          </div>
          {/* 协议 */}
          <Protocol />
        </div>
      )}
      {/* 支付成功  */}
      {isPaySuccess && (
        <div>
          <SuccessPay onClose={onClose} />
        </div>
      )}
    </div>
  )
}

export default PayQrCode
