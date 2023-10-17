import styles from './index.module.scss'
import { CycleCardDarkIcon, CycleCardIcon, RepeatIcon } from '@flyele-nx/icon'
import React from 'react'
import { getRepeatDelayTotal } from '../../../../../../utils'
import { ILocalTask } from '@flyele-nx/types'
import { useUserInfoStore } from '@flyele-nx/zustand-store'

interface IProps {
  task: ILocalTask
  isDarkMode?: boolean
}

export const BuildRepeatIcon = ({ task, isDarkMode = false }: IProps) => {
  const userId = useUserInfoStore((state) => state.userInfo.user_id)
  const repeatDelayTotal = getRepeatDelayTotal({ rawTask: task, userId })

  if (repeatDelayTotal) {
    return (
      <div className={styles.repeatDelayTotalBox}>
        <RepeatIcon width="1em" height="1em" color="#FF784D" />
        <div>{repeatDelayTotal}</div>
      </div>
    )
  }

  return isDarkMode ? (
    <div className={styles.repeatIcon}>
      <CycleCardDarkIcon width={13} height={13} />
    </div>
  ) : (
    <div className={styles.repeatIcon}>
      <CycleCardIcon width={13} height={13} />
    </div>
  )
}
