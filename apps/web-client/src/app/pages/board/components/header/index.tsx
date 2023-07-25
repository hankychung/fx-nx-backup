import { memo, FC } from 'react'
import style from './index.module.scss'

const _BoardHeader: FC = () => {
  return <div className={style.header}>header</div>
}

export const BoardHeader = memo(_BoardHeader)
