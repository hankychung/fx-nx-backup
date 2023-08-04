import { FC, memo } from 'react'
import style from './index.module.scss'
import cs from 'classnames'
import { ArrowDownIcon } from '@flyele-nx/icon'

const _Create: FC = () => {
  return (
    <div className={style.create}>
      <div className={cs(style.plainTextBtn)}>
        <div className={style.createBtn}>创建</div>
        <div className={style.dropDownArrow}>
          <ArrowDownIcon />
        </div>
      </div>
    </div>
  )
}

export const Create = memo(_Create)
