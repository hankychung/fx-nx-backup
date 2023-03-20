/*
 * @Author: wanghui wanghui@flyele.net
 * @Date: 2023-03-07 20:20:24
 * @LastEditors: wanghui wanghui@flyele.net
 * @LastEditTime: 2023-03-20 11:05:51
 */
import React from 'react'
import { IFlyeleAvatarItem } from '../../../PayModal'
import { VipMealType } from '../controller'
import LeftBlock from './components/LeftBlock'
import RightBlock from './components/RightBlock'

import style from './index.module.scss'

const TeamVip = ({
  memberList,
  mineId,
  vipMealType
}: {
  memberList: IFlyeleAvatarItem[]
  mineId: string
  vipMealType:VipMealType
}) => {
  return (
    <div className={style.teamVip}>
      <div>
        <LeftBlock memberList={memberList} mineId={mineId} />
      </div>
      <div>
        <RightBlock vipMealType={vipMealType}/>
      </div>
    </div>
  )
}

export default TeamVip
