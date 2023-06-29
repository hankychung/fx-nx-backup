import React from 'react'
import styles from './index.module.scss'
import cs from 'classnames'
import { ArrowDownIcon } from '@flyele-nx/icon'

const _FinishNumBtn = ({
  show,
  count,
  onToggleShow,
  isDarkMode = false
}: {
  show: boolean
  count: number
  onToggleShow: (show: boolean) => void
  isDarkMode?: boolean
}) => {
  const onChange = () => {
    onToggleShow(show)
  }

  return (
    <div className={styles.btnRoot}>
      <div
        className={cs(styles.btnBox, { [styles.btnBoxBlack]: isDarkMode })}
        onClick={onChange}
      >
        <div className={cs(styles.text, { [styles.textBlack]: isDarkMode })}>
          已完成·{count || 0}
        </div>
        <div className={cs(styles.icon, { [styles.showUp]: show })}>
          <ArrowDownIcon width={8} height={8} color="#B4B4B4" />
        </div>
      </div>
    </div>
  )
}

export const FinishNumBtn = React.memo(_FinishNumBtn)
