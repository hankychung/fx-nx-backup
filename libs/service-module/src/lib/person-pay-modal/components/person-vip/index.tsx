/*
 * @Author: wanghui wanghui@flyele.net
 * @Date: 2023-03-07 20:18:39
 * @LastEditors: wanghui wanghui@flyele.net
 * @LastEditTime: 2023-04-24 10:14:43
 * @FilePath: /electron-client/app/components/PersonPayModal/components/PersonVip/index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import { ICoupon } from '@flyele-nx/api'
import React from 'react'
import { IFlyeleAvatarItem } from '../../../pay-modal'
import { VipMealType } from '../controller'
import LeftBlock from './components/left-block'
import RightBlock from './components/right-block'

import style from './index.module.scss'

const PersonVip = ({
  memberList,
  mineId,
  couponList,
  goProtocol,
  vipMealType,
  goInterests,
  originRoute,
  isRequest,
  setIsRequest
}: {
  memberList: IFlyeleAvatarItem[]
  mineId: string
  couponList?: ICoupon[]
  vipMealType: VipMealType
  goProtocol?: () => void
  goInterests: () => void
  originRoute?: string
  isRequest?: boolean
  setIsRequest?: (_: boolean) => void
}) => {
  return (
    <div className={style.personVip}>
      <div>
        <LeftBlock goInterests={goInterests} />
      </div>
      <div>
        <RightBlock
          memberList={memberList}
          mineId={mineId}
          couponList={couponList}
          goProtocol={goProtocol}
          vipMealType={vipMealType}
          originRoute={originRoute}
          setIsRequest={setIsRequest}
          isRequest={isRequest}
        />
      </div>
    </div>
  )
}

export default PersonVip
