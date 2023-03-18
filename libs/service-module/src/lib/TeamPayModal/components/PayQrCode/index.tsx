/*
 * @Author: wanghui wanghui@flyele.net
 * @Date: 2023-03-09 09:55:49
 * @LastEditors: wanghui wanghui@flyele.net
 * @LastEditTime: 2023-03-18 10:47:02
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

const PayQrCode = ({ payInfo }: { payInfo?: IActiveGoods }) => {
  const service = useContext(SelectMemberContext)
  const [showSuccess, setShowSuccess] = useState<boolean>(false)
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
                <span>{regFenToYuan(payInfo&&payInfo.now_price||0)}</span>
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
