/*
 * @Author: wanghui wanghui@flyele.net
 * @Date: 2023-03-10 15:49:02
 * @LastEditors: wanghui wanghui@flyele.net
 * @LastEditTime: 2023-03-13 19:23:08
 * @FilePath: /fx-nx/libs/service-module/src/lib/PersonPayModal/components/Header/index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { I18N } from '@flyele-nx/i18n'
import React from 'react'
import { ReactComponent as PersonVip } from '../../../../../../assets/payImg/person_vip_empty.svg'
import style from './index.module.scss'

const PersonVipEmpty = () => {
  return (
    <div className={style.personVipEmpty}>
      <div>
        <PersonVip></PersonVip>
      </div>
      <div className={style.emptyText}>
        {I18N.common.youHavePurchased}
        <span>{I18N.common.lifetimeIndividualMeeting}</span>
        {I18N.common.canBeUsedIndefinitely}
      </div>
    </div>
  )
}

export default PersonVipEmpty
