/*
 * @Author: wanghui wanghui@flyele.net
 * @Date: 2023-03-07 20:20:24
 * @LastEditors: wanghui wanghui@flyele.net
 * @LastEditTime: 2023-04-08 11:53:59
 */
import { ICoupon } from '@flyele-nx/api'
import React from 'react'
import { IFlyeleAvatarItem } from '../../../pay-modal'
import { VipMealType } from '../controller'
import LeftBlock from './components/left-block'
import RightBlock from './components/right-block'

import style from './index.module.scss'

const TeamVip = ({
  memberList,
  mineId,
  vipMealType,
  goProtocol,
  couponList
}: {
  memberList: IFlyeleAvatarItem[]
  mineId: string
  vipMealType: VipMealType
  couponList?: ICoupon[]
  goProtocol: () => void
}) => {
  return (
    <div className={style.teamVip}>
      <div>
        <LeftBlock memberList={memberList} mineId={mineId} />
      </div>
      <div>
        <RightBlock
          vipMealType={vipMealType}
          goProtocol={goProtocol}
          couponList={couponList}
        />
      </div>
    </div>
  )
}

export default TeamVip
