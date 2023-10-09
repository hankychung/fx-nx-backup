/*
 * @Author: wanghui wanghui@flyele.net
 * @Date: 2023-03-09 09:55:49
 * @LastEditors: wanghui wanghui@flyele.net
 * @LastEditTime: 2023-04-25 14:59:33
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
import Protocol from './components/protocol'
import { SelectMemberContext } from '../../context/context'
import SuccessPay from './components/success-pay'
import { useMemoizedFn } from '@flyele/flyele-components'
import { IActiveGoods } from '@flyele-nx/api'
import { paymentApi } from '@flyele-nx/service'
import { regFenToYuan } from '../../utils'
import { IFlyeleAvatarItem } from '../../../pay-modal'

const PayQrCode = ({
  payInfo,
  userInfo,
  spaceId,
  senConfirm,
  isPaySuccess,
  onClose,
  goProtocol,
  domain,
  getOrder
}: {
  payInfo?: IActiveGoods
  userInfo: IFlyeleAvatarItem[]
  spaceId?: string
  domain: string
  isPaySuccess: boolean
  senConfirm?: () => void
  onClose?: () => void
  goProtocol: () => void
  getOrder: () => Promise<any>
}) => {
  const service = useContext(SelectMemberContext)
  // const [showSuccess, setShowSuccess] = useState<boolean>(false)
  const [qrCode, setQrCode] = useState('')

  //获取二维码
  const qrCodeFunction = useMemoizedFn(async () => {
    const a = await getOrder()

    const b = JSON.stringify(a)
    const res = await QRCode.toDataURL(
      `${domain}/payDetail?params=${b}&&token=${paymentApi.getToken()}`
    )
    setQrCode(res)
  })

  useEffect(() => {
    qrCodeFunction()
    senConfirm && senConfirm()
  }, [qrCodeFunction, senConfirm])
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
      maskStyle={{ opacity: '0.7', background: '#000000', animation: 'none' }}
    >
      <div>
        {!isPaySuccess && (
          <div className={style.payQrCode}>
            <div className={style.head}>
              <div className={style.lable_pay}>
                <span>扫码支付</span>
                <div className={style.telephone}>对公支付联系: 15002007797</div>
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
                <span>
                  {regFenToYuan(
                    (payInfo &&
                      (payInfo.now_price - (payInfo.price || 0)) *
                        userInfo.length) ||
                      0
                  )}
                </span>
              </div>
              <div className={style.code}>
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
            <Protocol goProtocol={goProtocol} />
          </div>
        )}
        {/* 支付成功  */}
        {isPaySuccess && (
          <div>
            <SuccessPay onClose={onClose} />
          </div>
        )}
      </div>
    </Modal>
  )
}

export default PayQrCode
