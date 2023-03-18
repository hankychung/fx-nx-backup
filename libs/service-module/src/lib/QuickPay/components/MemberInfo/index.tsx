/*
 * @Author: wanghui wanghui@flyele.net
 * @Date: 2023-03-09 17:03:34
 * @LastEditors: wanghui wanghui@flyele.net
 * @LastEditTime: 2023-03-18 12:24:11
 * @FilePath: /electron-client/app/components/QuickPay/components/MemberInfo/index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE99
 */
import React from 'react'
import {
  FlyAvatar,
  FlyBasePopper,
  FlyBasePopperCtrl,
  useController
} from '@flyele/flyele-components'
import { ReactComponent as Customer } from '../../../../assets/payImg/customer.svg'
import { ReactComponent as MealTime } from '../../../../assets/payImg/meal_time.svg'
import { ReactComponent as MemberPersonVip } from '../../../../assets/payImg/member_person_vip.svg'
import { ReactComponent as MemberTeamVip } from '../../../../assets/payImg/member_team_vip.svg'

import cs from 'classnames'
import style from './index.module.scss'
import CustomerServicesModal from '../../../CustomerServicesModal'
import { IFlyeleAvatarItem } from '../../../PayModal'

const MemberInfo = ({
  memberList,
  mineId
}: {
  memberList: IFlyeleAvatarItem[]
  mineId: string
}) => {
  const Controller = useController(new FlyBasePopperCtrl())
  return (
    <div className={style.memberInfo}>
      <div className={style.member}>
        <div className={style.mem_info}>
          <FlyAvatar src={''} size={30} />
          <div className={style.mem_name}>
            <div className={style.name_icon}>
              <span>{memberList[0].name}</span>
              {mineId === memberList[0].userId && (
                <div className={style.mine}>我</div>
              )}
              {memberList[0].isVip && (
                <MemberPersonVip
                  className={style.member_person_vip}
                ></MemberPersonVip>
              )}
              {memberList[0].isTeamVip && (
                <MemberTeamVip
                  className={style.member_team_vip}
                ></MemberTeamVip>
              )}
            </div>
            <span>{memberList[0].telephone}</span>
          </div>
        </div>
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
            <span>客服</span>
          </div>
        </FlyBasePopper>
      </div>
      <div className={style.mealList}>
        <div
          className={cs(style.mealItem, {
            [style.activeStyle]: true
          })}
          onClick={() => {
            // mealSelect(_)
          }}
        >
          <div className={style.name}>团队会员</div>
          <div className={style.price}>
            <span>
              <i>￥</i>
              <span>599</span>
            </span>
            <div>
              <span>￥</span>
              298/人/年
            </div>
          </div>
          <div className={style.time}>
            <span> 限时 23:59:00</span>
            <MealTime className={style.mealTime}></MealTime>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MemberInfo
