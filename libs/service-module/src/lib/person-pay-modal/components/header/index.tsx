/*
 * @Author: wanghui wanghui@flyele.net
 * @Date: 2023-03-10 15:49:02
 * @LastEditors: wanghui wanghui@flyele.net
 * @LastEditTime: 2023-04-14 10:55:33
 * @FilePath: /fx-nx/libs/service-module/src/lib/PersonPayModal/components/Header/index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React, { useMemo } from 'react'
import { ReactComponent as Close } from '../../../../assets/payImg/close.svg'
import { ReactComponent as Customer } from '../../../../assets/payImg/customer.svg'
import {
  FlyAvatar,
  FlyBasePopper,
  FlyBasePopperCtrl,
  useController
} from '@flyele/flyele-components'
import style from './index.module.scss'
import CustomerServicesModal from '../../../customer-services-modal'
import { IFlyeleAvatarItem } from '../../../pay-modal'
import dayjs from 'dayjs'
interface Iprops {
  memberList: IFlyeleAvatarItem[]
  mineId: string
  onClose: () => void
}
const Header = (props: Iprops) => {
  const Controller = useController(new FlyBasePopperCtrl())
  const { onClose, memberList, mineId } = props
  const userInfo = useMemo(() => {
    return memberList.filter((item) => item.userId === mineId)[0]
  }, [mineId, memberList])

  const vipText = useMemo(() => {
    const info = memberList.filter((item) => item.userId === mineId)[0]

    let txt = '未开通飞项会员'
    if (!info.level) {
      if (info.end_time && info.recently_type === 2) {
        txt = '您的团队会员已过期，请续费后使用'
      }
      if (info.end_time && info.recently_type === 1) {
        txt = '您的个人会员过期，请续费后使用'
      }
    }
    if (info.level === 1) {
      if (info.end_time) {
        txt = `您已开通个人会员，${dayjs
          .unix(info.end_time)
          .format('YYYY年MM月DD日')}到期`
      }
      if (info.end_time === 9999999999) {
        txt = `您已开通终身版个人会员，可无限期使用`
      }
    }
    if (info.level === 2) {
      if (info.end_time) {
        txt = `您已开通团队会员，${dayjs
          .unix(info.end_time)
          .format('YYYY年MM月DD日')}到期`
      }
    }
    return txt
  }, [mineId, memberList])
  return (
    <div className={style.header}>
      <div className={style.userInfo}>
        <div className={style.left}>
          <FlyAvatar shape="circle" size={36} src={userInfo?.avatar} />
          <div className={style.user_info}>
            <span>{userInfo?.name}</span>
            <div className={style.vip}>{vipText}</div>
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
