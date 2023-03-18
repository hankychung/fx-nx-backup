/*
 * @Author: wanghui wanghui@flyele.net
 * @Date: 2023-03-10 15:49:02
 * @LastEditors: wanghui wanghui@flyele.net
 * @LastEditTime: 2023-03-18 14:40:38
 * @FilePath: /fx-nx/libs/service-module/src/lib/PersonPayModal/components/Header/index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React, { useMemo } from 'react'
import close from '../../../../assets/payImg/close.svg'
import { ReactComponent as Close } from '../../../../assets/payImg/close.svg'
import { ReactComponent as Customer } from '../../../../assets/payImg/customer.svg'
import {
  FlyAvatar,
  FlyBasePopper,
  FlyBasePopperCtrl,
  useController
} from '@flyele/flyele-components'
import style from './index.module.scss'
import CustomerServicesModal from '../../../CustomerServicesModal'
import { IFlyeleAvatarItem } from '../../../PayModal'
interface Iprops {
  memberList: IFlyeleAvatarItem[]
  mineId: string
  onClose: () => void
}
const Header = (props: Iprops) => {
  const Controller = useController(new FlyBasePopperCtrl())
  const { onClose, memberList, mineId } = props
  const userInfo = useMemo(()=>{
return memberList.filter(item=>item.userId===mineId)[0]
  },[mineId,memberList])
  return (
    <div className={style.header}>
      <div className={style.userInfo}>
        <div className={style.left}>
          <FlyAvatar shape="circle" size={36} src={userInfo?.avatar} />
          <div className={style.user_info}>
            <span>{userInfo?.name}</span>
            <div className={style.vip}>未开通飞项会员</div>
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
