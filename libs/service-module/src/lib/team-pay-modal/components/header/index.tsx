/*
 * @Author: wanghui wanghui@flyele.net
 * @Date: 2023-03-09 09:55:49
 * @LastEditors: wanghui wanghui@flyele.net
 * @LastEditTime: 2023-03-13 20:09:11
 * @FilePath: /electron-client/app/components/TeamPayModal/components/Header/index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React from 'react'
import { ReactComponent as Close } from '../../../../assets/payImg/close.svg'
import { ReactComponent as Customer } from '../../../../assets/payImg/customer.svg'
import { ReactComponent as ArrowRight } from '../../../../assets/payImg/arrow_right.svg'
import style from './index.module.scss'
import { vipPayText, VipPayType } from '../controller'
import {
  FlyBasePopper,
  FlyBasePopperCtrl,
  useController
} from '@flyele/flyele-components'
import CustomerServicesModal from '../../../customer-services-modal'

const Header = ({
  vipType,
  onClose
}: {
  vipType: VipPayType
  onClose: () => void
}) => {
  const Controller = useController(new FlyBasePopperCtrl())
  const obj = vipPayText(vipType)

  return (
    <div className={style.header}>
      <div className={style.userInfo}>
        <div className={style.left}>
          <div className={style.user_info}>
            <span>{obj.h1}</span>
            <div className={style.interests}>
              <span>查看完整权益</span>
              <ArrowRight color="#6A67F4" />
            </div>
          </div>
          <div className={style.tips}>
            如果未开通团队会员用户，无法进入到专业空间
          </div>
        </div>
      </div>
      <div className={style.right}>
        <FlyBasePopper
          controller={Controller}
          trigger="click"
          placement="bottom-end"
          showArrow={false}
          content={() => (
            <div>
              <CustomerServicesModal
                onClose={() => {
                  Controller.hide()
                }}
              ></CustomerServicesModal>
            </div>
          )}
        >
          <div className={style.customer}>
            <Customer></Customer>
            <span>联系客服</span>
          </div>
        </FlyBasePopper>

        <Close
          className={style.close}
          onClick={() => {
            onClose()
          }}
        ></Close>
      </div>
    </div>
  )
}

export default Header
