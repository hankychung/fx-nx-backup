/*
 * @Author: wanghui wanghui@flyele.net
 * @Date: 2023-03-09 17:03:34
 * @LastEditors: wanghui wanghui@flyele.net
 * @LastEditTime: 2023-03-10 15:26:28
 * @FilePath: /electron-client/app/components/QuickPay/components/MemberInfo/index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE99
 */
import React from 'react'
import { FlyAvatar } from '@flyele/flyele-components'
import customer from '../../../../assets/payImg/customer.svg'
import meal_time from '../../../../assets/payImg/meal_time.svg'
import member_person_vip from '../../../../assets/payImg/member_person_vip.svg'
import member_team_vip from '../../../../assets/payImg/member_team_vip.svg'
import cs from 'classnames'
import style from './index.module.scss'

const MemberInfo = () => {
  return (
    <div className={style.memberInfo}>
      <div className={style.member}>
        <div className={style.mem_info}>
          <FlyAvatar src={customer} size={30} />
          <div className={style.mem_name}>
            <div className={style.name_icon}>
              <span>圣诞节快乐妇女经典款</span>
              <div className={style.mine}>我</div>
              <img
                alt="member_person_vip"
                src={member_person_vip}
                className={style.member_person_vip}
              />
              <img
                alt="member_team_vip"
                src={member_team_vip}
                className={style.member_team_vip}
              />
            </div>
            <span>16651150991</span>
          </div>
        </div>
        <div className={style.customer}>
          <img alt="customer" src={customer} />
          <span>客服</span>
        </div>
      </div>
      <div className={style.mealList}>
        <div
          className={cs(style.mealItem, {
            [style.activeStyle]: true,
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
            <img alt="time" src={meal_time} className={style.mealTime} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default MemberInfo
