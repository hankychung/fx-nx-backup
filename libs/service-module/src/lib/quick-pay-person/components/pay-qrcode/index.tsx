/*
 * @Author: wanghui wanghui@flyele.net
 * @Date: 2023-03-09 09:55:49
 * @LastEditors: wanghui wanghui@flyele.net
 * @LastEditTime: 2023-05-04 18:05:09
 * @FilePath: /electron-client/app/components/TeamPayModal/components/Header/index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { ReactComponent as WechatIcon } from '../../../../assets/payImg/wechat_icon.svg'
import style from './index.module.scss'
import Protocol from './components/protocol'
import SuccessPay from './components/success-pay'
import { IActiveGoods, paymentApi } from '@flyele-nx/api'
import { regFenToYuan } from '../../utils'
import { useMemoizedFn } from 'ahooks'
import QRCode from 'qrcode'
import { IFlyeleAvatarItem } from '../../../pay-modal'
import LogOut from './components/log-out'

const PayQrCode = ({
  isPaySuccess,
  vipMeal,
  memberList,
  onClose,
  goProtocol,
  domain
}: {
  isPaySuccess: boolean
  vipMeal?: IActiveGoods
  domain: string
  memberList: IFlyeleAvatarItem[]
  onClose?: () => void
  goProtocol: () => void
}) => {
  const [qrCode, setQrCode] = useState('')
  const isInit = useRef(false)
  //获取二维码
  const qrCodeFunction = useMemoizedFn(async () => {
    const params = {
      amount: 1,
      coupon_id: vipMeal?.price ? vipMeal?.coupon_id : 0,
      good_id: vipMeal?.id || 0,
      // good_id: 8,
      origin_route: 'PC客户端',
      total_price: (vipMeal?.now_price || 0) - (vipMeal?.price || 0) || 0,
      // total_price: 1,
      users_id: memberList.map((item) => item.userId),
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
        console.log('准备a-----', _)
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
  const txt = useMemo(() => {
    if (memberList[0].corp_id) return '该用户为企业版用户，无法为其开通会员'
    return '该用户已注销，无法为其开通会员'
  }, [memberList])

  return (
    <div>
      {!isPaySuccess && (
        <div className={style.payQrCode}>
          <div className={style.payInfo}>
            <div className={style.price}>
              <span> ￥</span>
              <span>
                {regFenToYuan(
                  (vipMeal?.now_price || 0) - (vipMeal?.price || 0) || 0
                )}
              </span>
              {/* {vipMeal?.original_price && (
                <span>{`已省¥${regFenToYuan(
                  vipMeal?.original_price -
                    vipMeal?.now_price -
                    (vipMeal?.price || 0)
                )}`}</span>
              )} */}
            </div>
            <div className={style.code}>
              {qrCode && (
                <img alt="qrcode" src={qrCode} className={style.qrcode} />
              )}
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
          <Protocol goProtocol={goProtocol} />
        </div>
      )}
      {(memberList[0].corp_id || memberList[0].is_interact === 2) && (
        <LogOut txt={txt}></LogOut>
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
