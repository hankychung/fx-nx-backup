import React from 'react'

import { ReactComponent as ArrowRight } from '../../../../../../assets/payImg/arrow_right.svg'
import style from './index.module.scss'
import { createVipMealText, SectionType } from '../../../controller'

const LeftBlock = () => {
  const obj: SectionType = createVipMealText().person

  return (
    <div className={style.leftBlock}>
      <div className={style.person_desc}>{obj.desc}</div>
      <div className={style.interests}>
        <span>查看完整权益</span>
        <ArrowRight color="#F1AA40" />
      </div>
      <div className={style.interests_list}>
        {obj.list.map((_) => {
          return (
            <div className={style.interests_item} key={_.icon}>
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
