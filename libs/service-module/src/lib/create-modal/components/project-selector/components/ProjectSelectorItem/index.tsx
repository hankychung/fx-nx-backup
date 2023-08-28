/**
 author: william   email:362661044@qq.com
 create_at:2022/9/1 17:18
 **/

import { FlyTextTooltip } from '@flyele/flyele-components'
import React from 'react'
import style from './index.module.scss'
import { IBaseProjectInfo } from '@flyele-nx/types'
import { CheckItemRow } from '../CheckItemRow'
import { CheckBoxState } from '@flyele-nx/constant'

/**
 *  每一行 组件
 *
 * **/
type IItem = {
  onSelect: (data: IBaseProjectInfo) => void
  state?: CheckBoxState
  item: IBaseProjectInfo
}
export const ProjectSelectorItem = (props: IItem) => {
  const { onSelect, state, item } = props

  return (
    <CheckItemRow<IBaseProjectInfo>
      className={style.item}
      state={state}
      onClick={onSelect}
      data={item}
    >
      <div className={style.title}>
        <FlyTextTooltip text={item.project_name} strategy="fixed" />
      </div>
    </CheckItemRow>
  )
}
