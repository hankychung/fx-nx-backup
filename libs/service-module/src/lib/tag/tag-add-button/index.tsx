/**
 author: william   email:362661044@qq.com
 create_at:2021/10/27 下午 5:09
 **/

import React from 'react'
import { CircleAddIcon } from '@flyele-nx/icon'
import css from './index.module.scss'

export default function TagAddButton({
  visible,
  onClick
}: {
  visible?: boolean
  onClick?: () => void
}) {
  return (
    <div
      style={{ display: !visible ? 'grid' : 'none' }}
      className={css['add-tag']}
      key="add-btn"
      onClick={onClick}
    >
      <CircleAddIcon width={16} height={16} />
    </div>
  )
}
