import React from 'react'
import styles from './index.module.scss'
import cs from 'classnames'
import { ArrowDownIcon } from '@flyele-nx/icon'

const _FinishNumBtn = ({
  show,
  count,
  onToggleShow,
  isDarkMode = false,
  opacityModal = false
}: {
  show: boolean
  count: number
  onToggleShow: (show: boolean) => void
  isDarkMode?: boolean
  opacityModal?: boolean
}) => {
  const onChange = () => {
    onToggleShow(show)
  }

  return (
    <div className={styles.btnRoot}>
      <div
        className={cs(styles.btnBox, { [styles.btnBoxBlack]: isDarkMode })}
        style={{
          backgroundColor: opacityModal
            ? isDarkMode
              ? 'rgba(59, 62, 75, 0.1)'
              : 'rgba(237, 237, 237, 0.1)'
            : isDarkMode
            ? 'rgba(59, 62, 75, 1)'
            : '#F6F8FA'
        }}
        onClick={onChange}
      >
        <div className={cs(styles.text)}>已完成·{count || 0}</div>
        <div className={cs(styles.icon, { [styles.showUp]: show })}>
          <ArrowDownIcon width={8} height={8} color="#B4B4B4" />
        </div>
      </div>
    </div>
  )
}

export const FinishNumBtn = React.memo(_FinishNumBtn)
