/*
 * @Author: wanghui wanghui@flyele.net
 * @Date: 2023-03-09 09:55:49
 * @LastEditors: wanghui wanghui@flyele.net
 * @LastEditTime: 2023-03-10 16:50:28
 * @FilePath: /electron-client/app/components/TeamPayModal/components/Header/index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React, { useContext, useState } from 'react'
import wechat_icon from '../../../../assets/payImg/wechat_icon.svg'
import alipay_icon from '../../../../assets/payImg/alipay_icon.svg'
import { Modal } from 'antd'
import close from '../../../../assets/payImg/close.svg'
import style from './index.module.scss'
import Protocol from './components/Protocol'
import { SelectMemberContext } from '../../context/context'
import SuccessPay from './components/SuccessPay'

const PayQrCode = () => {
  const service = useContext(SelectMemberContext)
  const [showSuccess, setShowSuccess] = useState<boolean>(false)

  return (
    <Modal
      open
      centered
      footer={null}
      closable={false}
      destroyOnClose
      maskClosable={false}
      width={360}
      wrapClassName={style.custom_modal}
      maskStyle={{ opacity: '0.4', background: '#000000', animation: 'none' }}
    >
      <div>
        {!showSuccess && (
          <div className={style.payQrCode}>
            <div className={style.head}>
              <div className={style.lable_pay}>
                <span>扫码支付</span>
                <div className={style.telephone}>对公支付联系: 12345678901</div>
              </div>
              <img
                alt="close"
                src={close}
                className={style.close}
                onClick={() => {
                  service.showPay({ show: false })
                }}
              />
            </div>
            <div className={style.payInfo}>
              <div className={style.price}>
                <span> ￥</span>
                <span>298</span>
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
                  <img
                    alt="wechat"
                    src={wechat_icon}
                    className={style.qrcode}
                  />
                  <span>微信支付</span>
                </div>
                <span>/</span>
                <div className={style.iconItem}>
                  <img
                    alt="alipay"
                    src={alipay_icon}
                    className={style.qrcode}
                  />
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
    </Modal>
  )
}

export default PayQrCode
