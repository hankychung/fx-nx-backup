/*
 * @Author: wanghui wanghui@flyele.net
 * @Date: 2023-03-10 15:49:02
 * @LastEditors: wanghui wanghui@flyele.net
 * @LastEditTime: 2023-04-14 10:55:33
 * @FilePath: /fx-nx/libs/service-module/src/lib/PersonPayModal/components/Header/index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { I18N, isCN } from '@flyele-nx/i18n'
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
import { getEnFormat } from '@flyele-nx/utils'
import { CustomerServiceEmail } from '@flyele-nx/ui'
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

    let txt = I18N.common.flightNotActivated
    if (!info.level) {
      if (info.end_time && info.recently_type === 2) {
        txt = I18N.common.yourTeamWill
      }
      if (info.end_time && info.recently_type === 1) {
        txt = I18N.common.yourPersonalMeeting
      }
    }
    if (info.level === 1) {
      if (info.end_time) {
        txt = `${I18N.template?.(I18N.common.youHaveOpened, {
          val1: getEnFormat(
            dayjs.unix(info.end_time),
            'YYYY年MM月DD日',
            'MMM D, YYYY'
          )
        })}`
      }
      if (info.end_time === 9999999999) {
        txt = I18N.common.youHaveOpenedTheTerminal
      }
    }
    if (info.level === 2) {
      if (info.end_time) {
        txt = `${I18N.template?.(I18N.common.youHaveOpenedAGroup, {
          val1: getEnFormat(
            dayjs.unix(info.end_time),
            'YYYY年MM月DD日',
            'MMM D, YYYY'
          )
        })}`
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
              {isCN ? (
                <CustomerServicesModal
                  onClose={() => {
                    Controller.hide()
                  }}
                />
              ) : (
                <CustomerServiceEmail onClose={() => Controller.hide()} />
              )}
            </div>
          )}
        >
          <div className={style.customer}>
            <Customer />
            <span>{I18N.common.contactCustomerService}</span>
          </div>
        </FlyBasePopper>

        <Close
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
