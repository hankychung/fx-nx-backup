import React from 'react'
import { ReactComponent as Close } from '../../../../assets/payImg/close.svg'
import { ReactComponent as ArrowRight } from '../../../../assets/payImg/arrow_right.svg'
import style from './index.module.scss'
interface Iprops {
  onClose: () => void
}
const Header = (props: Iprops) => {
  const { onClose } = props
  return (
    <div className={style.header}>
      <div className={style.userInfo}>
        <div className={style.left}>
          <div className={style.user_info}>
            <span>开通团队会员</span>
            <div className={style.interests}>
              <span>查看完整权益</span>
              <ArrowRight color="#6A67F4" />
            </div>
          </div>
        </div>
      </div>
      <div
        className={style.right}
        onClick={() => {
          onClose()
        }}
      >
        <Close className={style.close}></Close>
      </div>
    </div>
  )
}

export default Header
