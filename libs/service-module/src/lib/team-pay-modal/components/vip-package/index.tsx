import React from 'react'
import style from './index.module.scss'
import TeamVip from '../team-vip'
import { VipPayType } from '../controller'
import { IFlyeleAvatarItem } from '../../../pay-modal'

interface Iprops {
  memberList: IFlyeleAvatarItem[]
  vipType: VipPayType
  mineId: string
  spaceId?: string
  upSpace?: () => void
}
const VipPackage = (props: Iprops) => {
  //进入判断会员类型

  return (
    <div className={style.vipPackage}>
      <div className={style.team_bg}>
        <TeamVip {...props} />
      </div>
    </div>
  )
}

export default VipPackage
