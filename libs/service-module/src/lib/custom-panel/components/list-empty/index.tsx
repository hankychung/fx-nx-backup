import React from 'react'

import style from './index.module.scss'
import { Close } from '@flyele-nx/icon'

const ListEmpty: React.FC<React.PropsWithChildren<unknown>> = () => {
  return (
    <div className={style.wrap}>
      {/* TODO: 这个图标没找到 */}
      <Close />
      <span>暂无数据</span>
    </div>
  )
}

export default ListEmpty
