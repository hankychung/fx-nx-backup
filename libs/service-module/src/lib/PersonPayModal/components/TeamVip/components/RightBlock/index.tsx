/*
 * @Author: wanghui wanghui@flyele.net
 * @Date: 2023-03-08 09:43:55
 * @LastEditors: wanghui wanghui@flyele.net
 * @LastEditTime: 2023-03-10 16:22:14
 * @FilePath: /electron-client/app/components/PersonPayModal/components/PersonVip/components/RightBlock/index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React, { useContext, useEffect, useState } from 'react'
import cs from 'classnames'
import meal_time from '../../../../../../assets/payImg/meal_time.svg'
import { FlyAvatar, FlyAvatarWithIcon } from '@flyele/flyele-components'
import invite_member from '../../../../../../assets/payImg/invite_member.svg'
import style from './index.module.scss'
import PayButton from '../../../PayButton'
import { VipMealType } from '../../../controller'
import { SelectMemberContext } from '../../../../context/context'

const RightBlock = () => {
  const service = useContext(SelectMemberContext)
  const [resultArr, setResultArr] = useState<any[]>([])

  useEffect(() => {
    service.addListener((ev) => {
      const { event } = ev

      switch (event) {
        case 'selectMember':
          setResultArr(service.getData('selectMember').list)
          break

        default:
      }
    })

    return () => {
      service.dispose()
    }
  }, [service])
  return (
    <div className={style.rightBlock}>
      <div>
        <div className={style.mealBlock}>
          <div className={style.title}>团队套餐</div>
          <div className={style.mealList}>
            <div
              className={cs(style.mealItem, {
                [style.activeStyle]: true,
              })}
              onClick={() => {
                // mealSelect(_)
              }}
            >
              <div className={style.vip_name}>团队会员</div>
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
        <div className={style.memberList}>
          <div className={style.lable_vip}>
            <div className={style.title}>开通对象</div>
            <div className={style.memberSum}>
              开通人数
              <span>{` x${resultArr.length}`}</span>
            </div>
          </div>

          <div className={style.members}>
            {resultArr.map((_: any) => {
              return (
                <div key={_.user_id} className={style.item}>
                  <div className={style.show} id="member_info">
                    <FlyAvatarWithIcon
                      iconPos="topRight"
                      icon="delete"
                      src={_.avatar}
                      iconCursor="pointer"
                      onClickIcon={() => {
                        service.selectMember({
                          list: resultArr.filter(
                            (item) => item.user_id !== _.user_id
                          ),
                        })
                      }}
                    />
                  </div>
                  <div className={style.hide}>
                    <FlyAvatar src={_.avatar} />
                  </div>
                  <p className={style.name}>是的空间发挥的苦上加苦可是打开</p>
                </div>
              )
            })}
            <div
              onClick={() => {
                service.show(true)
                service.selectMember({ list: resultArr })
              }}
              id="invite_member"
            >
              <img
                alt="time"
                src={invite_member}
                className={style.invite_member}
              />
            </div>
          </div>
        </div>
      </div>

      {/* 支付按钮 */}
      <div>
        <PayButton vipMealType={VipMealType.TEAM} />
      </div>
    </div>
  )
}

export default RightBlock
