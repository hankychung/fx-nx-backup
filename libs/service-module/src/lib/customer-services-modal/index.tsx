/*
 * @Author: wanghui wanghui@flyele.net
 * @Date: 2023-03-09 09:55:49
 * @LastEditors: wanghui wanghui@flyele.net
 * @LastEditTime: 2023-06-27 11:23:17
 */
import React from 'react'
import { ReactComponent as CustomerModalBg } from '../../assets/payImg/customer_modal_bg.svg'
// import { ReactComponent as CustomerServicesQrcode } from '../../assets/payImg/customer_services_qrcode.svg'
import { ReactComponent as PhoneNumIcon } from '../../assets/payImg/phone_num_icon.svg'
import { ReactComponent as Close } from '../../assets/payImg/close.svg'

import style from './index.module.scss'

interface Iprops {
  onClose: () => void
}
const CustomerServicesModal = (props: Iprops) => {
  const { onClose } = props

  return (
    <div>
      <div className={style.customer}>
        <div className={style.head}>
          <div className={style.lable_customer}>
            <CustomerModalBg className={style.bg}></CustomerModalBg>
            <span>扫码添加专属客服</span>
          </div>
          <Close
            className={style.close}
            onClick={() => {
              onClose()
            }}
          ></Close>
        </div>

        <div className={style.qrcode}>
          <img
            src="https://cdn.flyele.net/resources/customer_service_qr_img.png"
            alt="客服"
          />
          <div>请使用微信/企业微信扫码</div>
        </div>
        <div className={style.phone_num}>
          <PhoneNumIcon></PhoneNumIcon>
          <span>电话：珊珊</span>
          <span> 150-0200-7797</span>
        </div>
      </div>
    </div>
  )
}

export default CustomerServicesModal
