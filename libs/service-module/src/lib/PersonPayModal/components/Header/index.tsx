/*
 * @Author: wanghui wanghui@flyele.net
 * @Date: 2023-03-10 15:49:02
 * @LastEditors: wanghui wanghui@flyele.net
 * @LastEditTime: 2023-03-10 17:23:16
 * @FilePath: /fx-nx/libs/service-module/src/lib/PersonPayModal/components/Header/index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React from 'react'
import close from '../../../../assets/payImg/close.svg'
import customer from '../../../../assets/payImg/customer.svg'
import { FlyAvatar } from '@flyele/flyele-components'
import style from './index.module.scss'
interface Iprops {
  onClose: () => void
}
const Header = (props: Iprops) => {
  const { onClose } = props
  return (
    <div className={style.header}>
      <div className={style.userInfo}>
        <div className={style.left}>
          <FlyAvatar shape="circle" size={36} src={close} />
          <div className={style.user_info}>
            <span>Teresa Cheung</span>
            <div className={style.vip}>未开通飞项会员</div>
          </div>
        </div>
      </div>
      <div className={style.right}>
        <div className={style.customer}>
          <img alt="customer" src={customer} />
          <span>联系客服</span>
        </div>
        <img
          alt="close"
          src={close}
          className={style.close}
          onClick={() => {
            onClose()
          }}
        />
      </div>
    </div>
  )
}

export default Header
