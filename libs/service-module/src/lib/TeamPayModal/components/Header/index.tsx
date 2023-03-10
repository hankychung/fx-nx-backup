/*
 * @Author: wanghui wanghui@flyele.net
 * @Date: 2023-03-09 09:55:49
 * @LastEditors: wanghui wanghui@flyele.net
 * @LastEditTime: 2023-03-10 17:24:03
 * @FilePath: /electron-client/app/components/TeamPayModal/components/Header/index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React from 'react'
import close from '../../../../assets/payImg/close.svg'
import customer from '../../../../assets/payImg/customer.svg'
import { ReactComponent as ArrowRight } from '../../../../assets/payImg/arrow_right.svg'
import style from './index.module.scss'
import { vipPayText, VipPayType } from '../controller'

const Header = ({ vipType,onClose }: { vipType: VipPayType,onClose:()=>void }) => {
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
        <div className={style.customer}>
          <img alt="customer" src={customer} />
          <span>联系客服</span>
        </div>
        <img alt="close" src={close} className={style.close} onClick={()=>{onClose()}}/>
      </div>
    </div>
  )
}

export default Header
