/*
 * @Author: wanghui wanghui@flyele.net
 * @Date: 2023-03-09 09:55:49
 * @LastEditors: wanghui wanghui@flyele.net
 * @LastEditTime: 2023-03-21 14:29:14
 * @FilePath: /electron-client/app/components/TeamPayModal/components/Header/index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React, { useContext, useEffect, useState } from 'react'
import { ReactComponent as WechatIcon } from '../../../../assets/payImg/wechat_icon.svg'
// import { ReactComponent as AlipayIcon } from '../../../../assets/payImg/alipay_icon.svg'
import { Modal } from 'antd'
import { ReactComponent as Close } from '../../../../assets/payImg/close.svg'
import QRCode from 'qrcode'
import style from './index.module.scss'
import Protocol from './components/Protocol'
import { SelectMemberContext } from '../../context/context'
import SuccessPay from './components/SuccessPay'
import { useMemoizedFn } from '@flyele/flyele-components'
import { IActiveGoods } from '@flyele-nx/api'
import { regFenToYuan } from '../../utils'
import { IFlyeleAvatarItem } from '../../../PayModal'
import { paymentApi } from '@flyele-nx/api'
const PayQrCode = ({
  payInfo,
  userInfo
}: {
  payInfo?: IActiveGoods
  userInfo: IFlyeleAvatarItem[]
}) => {
  const service = useContext(SelectMemberContext)
  const [showSuccess, setShowSuccess] = useState<boolean>(false)
  const [qrCode, setQrCode] = useState('')

  useEffect(() => {
    qrCodeFunction()
  }, [])

  //获取二维码
  const qrCodeFunction = useMemoizedFn(async () => {
    console.log(paymentApi, paymentApi.getToken(), paymentApi.getToken())

    const params = {
      amount: userInfo.length,
      coupon_id: payInfo?.coupon_id || 0,
      good_id: payInfo?.id || 0,
      // good_id: 8,
      origin_route: 'PC客户端',
      total_price: (payInfo?.now_price || 0) * userInfo.length,
      // total_price: 1,
      users_id: userInfo.map((item) => item.userId)
    }
    try {
      const res = await QRCode.toDataURL(
        `http://127.0.0.1:4200/payDetail?params=${JSON.stringify(params)}`
      )
      setQrCode(res)
    } catch {
      console.log('00')
    }
  })
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
              <Close
                className={style.close}
                onClick={() => {
                  service.showPay({ show: false })
                }}
              ></Close>
            </div>
            <div className={style.payInfo}>
              <div className={style.price}>
                <span> ￥</span>
                <span>{regFenToYuan((payInfo && payInfo.now_price) || 0)}</span>
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
