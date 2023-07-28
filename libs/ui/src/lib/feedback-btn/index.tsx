import React from 'react'
import cs from 'classnames'
import styles from './index.module.scss'
import { FeedBackIcon } from '@flyele-nx/icon'

type IFeedbackBtnProps = {
  customClass?: string
  clickHandler(): void
}

const FeedbackBtn = (props: IFeedbackBtnProps) => {
  const { clickHandler, customClass } = props

  return (
    <div className={cs(styles.btn, customClass)} onClick={clickHandler}>
      <div className={styles.btn__icon}>
        <FeedBackIcon width={14} height={14} />
      </div>
      <div className={styles.btn__text}>意见反馈</div>
    </div>
  )
}

export { FeedbackBtn, IFeedbackBtnProps }
