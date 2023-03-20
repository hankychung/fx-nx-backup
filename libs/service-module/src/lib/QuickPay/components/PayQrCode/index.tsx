/*
 * @Author: wanghui wanghui@flyele.net
 * @Date: 2023-03-09 09:55:49
 * @LastEditors: wanghui wanghui@flyele.net
 * @LastEditTime: 2023-03-18 17:28:43
 * @FilePath: /electron-client/app/components/TeamPayModal/components/Header/index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React, { useEffect, useState } from 'react'
import { ReactComponent as WechatIcon } from '../../../../assets/payImg/wechat_icon.svg'
import style from './index.module.scss'
import Protocol from './components/Protocol'
import SuccessPay from './components/SuccessPay'
import { IActiveGoods } from '@flyele-nx/api'
import { regFenToYuan } from '../../utils'
import { useMemoizedFn } from 'ahooks'
import QRCode from 'qrcode'

const PayQrCode = ({
  setShowSuccess,
  showSuccess,
  vipMeal
}: {
  showSuccess: boolean
  vipMeal?: IActiveGoods
  setShowSuccess: (_: boolean) => void
}) => {
  const [qrCode, setQrCode] = useState('')
  useEffect(() => {
    qrCodeFunction()
  }, [])
  //获取二维码
  const qrCodeFunction = useMemoizedFn(async () => {
    try {
      // const { date, dateText } = await getValidityTime()
      // const currentTime = Math.trunc(new Date().getTime() / 1000) // 当前时间 单位：秒

      // setValidityTime(dateText)

      // url += `&expire_at=${date}&dispatch_at=${currentTime}`
      const url = 'https://feixiang.cn?a=1'
      const res = await QRCode.toDataURL(
        'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx2edc8ed2729bdddf&redirect_uri=' +
          encodeURIComponent(url) +
          '&response_type=code&scope=snsapi_base&state=123&connect_redirect=1#wechat_redirect'
      )
      //https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx2edc8ed2729bdddf&redirect_uri=http://127.0.0.1:4200/payDetail&response_type=code&scope=snsapi_base&state=123&connect_redirect=1#wechat_redirect
      setQrCode(res)
    } catch {
      console.log('00')
    }
  })

  return (
    <div>
      {!showSuccess && (
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
            <div
              className={style.code}
              onClick={() => {
                setShowSuccess(true)
              }}
            >
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
      {showSuccess && (
        <div>
          <SuccessPay />
        </div>
      )}
    </div>
  )
}

export default PayQrCode
