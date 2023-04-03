/*
 * @Author: wanghui wanghui@flyele.net
 * @Date: 2023-03-27 17:17:16
 * @LastEditors: wanghui wanghui@flyele.net
 * @LastEditTime: 2023-04-03 15:56:19
 * @FilePath: /fx-nx/libs/service-module/src/lib/team-pay-modal/components/vip-package/index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
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
  isPaySuccess: boolean
  upSpace?: () => void
  senConfirm?: () => void
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
