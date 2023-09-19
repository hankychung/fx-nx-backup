import classNames from 'classnames'
import style from './child-matter-item.module.scss'
import { AddIcon, Close } from '@flyele-nx/icon'

export const ChildMatterItem = () => {
  return (
    <div
      data-id="child-matter"
      className={classNames(style.child_matter_wrap, style.hover_bg)}
    >
      <div className={style.left_box}>
        <AddIcon width={16} height={16} />

        <input placeholder={'inputPlaceholder'} value={'title'} />
      </div>
      <div className={style.right_box}>
        <div className={style.iconBox}></div>
        <Close className={style.clear_icon} />
      </div>
    </div>
  )
}
