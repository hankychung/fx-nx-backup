/*
 * @Author: wanghui wanghui@flyele.net
 * @Date: 2023-03-10 18:01:01
 * @LastEditors: wanghui wanghui@flyele.net
 * @LastEditTime: 2023-04-24 10:14:42
 * @FilePath: /fx-nx/libs/service-module/src/lib/PersonPayModal/components/PersonVip/components/LeftBlock/index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React from 'react'

import { ReactComponent as ArrowRight } from '../../../../../../assets/payImg/arrow_right.svg'
import style from './index.module.scss'
import { createVipMealText, SectionType } from '../../../controller'

const LeftBlock = ({goInterests}:{goInterests:()=>void}) => {
  const obj: SectionType = createVipMealText().person

  return (
    <div className={style.leftBlock}>
      <div className={style.person_desc}>{obj.desc}</div>
      <div className={style.interests} onClick={goInterests}>
        <span>查看完整权益</span>
        <ArrowRight color="#F1AA40" />
      </div>
      <div className={style.interests_list}>
        {obj.list.map((_) => {
          return (
            <div className={style.interests_item} key={_.title}>
              <img src={_.icon} alt="tabs" />
              <div className={style.interests_info}>
                <span>{_.title}</span>
                <div>{_.desc}</div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default LeftBlock
