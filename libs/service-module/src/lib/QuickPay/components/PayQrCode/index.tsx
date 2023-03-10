/*
 * @Author: wanghui wanghui@flyele.net
 * @Date: 2023-03-09 09:55:49
 * @LastEditors: wanghui wanghui@flyele.net
 * @LastEditTime: 2023-03-10 15:27:33
 * @FilePath: /electron-client/app/components/TeamPayModal/components/Header/index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React from 'react'
import wechat_icon from '../../../../assets/payImg/wechat_icon.svg'
import alipay_icon from '../../../../assets/payImg/alipay_icon.svg'
import style from './index.module.scss'
import Protocol from './components/Protocol'
import SuccessPay from './components/SuccessPay'

const PayQrCode = ({
  setShowSuccess,
  showSuccess,
}: {
  showSuccess: boolean
  setShowSuccess: (_: boolean) => void
}) => {
  return (
    <div>
      {!showSuccess && (
        <div className={style.payQrCode}>
          <div className={style.payInfo}>
            <div className={style.price}>
              <span> ￥</span>
              <span>298</span>
              <span>已省¥145</span>
            </div>
            <div
              className={style.code}
              onClick={() => {
                setShowSuccess(true)
              }}
            >
              <img alt="qrcode" src="" className={style.qrcode} />
            </div>
            <div className={style.payIcon}>
              <div className={style.iconItem}>
                <img alt="wechat" src={wechat_icon} className={style.qrcode} />
                <span>微信支付</span>
              </div>
              <span>/</span>
              <div className={style.iconItem}>
                <img alt="alipay" src={alipay_icon} className={style.qrcode} />
                <span>支付宝支付</span>
              </div>
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
