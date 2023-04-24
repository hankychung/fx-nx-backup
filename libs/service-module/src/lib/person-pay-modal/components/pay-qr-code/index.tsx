import React, { useContext, useEffect, useRef, useState } from 'react'
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
import { regFenToYuan } from '../../utils'
import { IFlyeleAvatarItem } from '../../../pay-modal'
import { paymentApi } from '@flyele-nx/api'
import { VipMealType } from '../controller'
const PayQrCode = ({
  payInfo,
  userInfo,
  vipMealType,
  senConfirm,
  isPaySuccess,
  onClose,
  getOrderCode,
  goProtocol,
  domain
}: {
  vipMealType: VipMealType
  payInfo?: IActiveGoods
  userInfo: IFlyeleAvatarItem[]
  isPaySuccess: boolean
  domain: string
  onClose: () => void
  senConfirm?: () => void
  getOrderCode?: (str: string) => void
  goProtocol: () => void
}) => {
  const service = useContext(SelectMemberContext)
  // const [showSuccess, setShowSuccess] = useState<boolean>(false)
  const [qrCode, setQrCode] = useState('')
  const isInit = useRef(false)
  //获取二维码
  const qrCodeFunction = useMemoizedFn(async () => {
    const params = {
      amount: userInfo.length,
      coupon_id: payInfo?.price ? payInfo?.coupon_id : 0,
      good_id: payInfo?.id || 0,
      // good_id: 8,
      origin_route: 'PC客户端',
      total_price:
        ((payInfo?.now_price || 0) - (payInfo?.price || 0) || 0) *
        userInfo.length,
      // total_price: 1,
      users_id: userInfo.map((item) => item.userId),
      indent_member_type:
        vipMealType === VipMealType.PERSON
          ? VipMealType.PERSON
          : VipMealType.TEAM
    }
    try {
      paymentApi.createOrder(params).then(async (_) => {
        getOrderCode && getOrderCode(_.data.out_trade_no)
        const a = _.data.out_trade_no
          ? {
              ..._.data,
              total_price:
                ((payInfo?.now_price || 0) - (payInfo?.price || 0) || 0) *
                userInfo.length
            }
          : {
              ..._.data.data,
              total_price:
                ((payInfo?.now_price || 0) - (payInfo?.price || 0) || 0) *
                userInfo.length
            }

        const b = JSON.stringify(a)
        const res = await QRCode.toDataURL(
          `${domain}/payDetail?params=${b}&&token=${paymentApi.getToken()}`
        )
        setQrCode(res)
      })
    } catch {
      console.log('00')
    }
  })

  useEffect(() => {
    if (isInit.current) return

    qrCodeFunction()
    senConfirm && senConfirm()
    isInit.current = true
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
      maskStyle={{ opacity: '0.4', background: '#000000', animation: 'none' }}
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
