import React from 'react'
import styles from './index.module.scss'
import { MatterType, MatterTypeLabel } from '@flyele-nx/constant'

interface IPROPScheduleType {
  matterType?: MatterType
}

export const ScheduleType: React.FC<IPROPScheduleType> = ({ matterType }) => {
  if (
    !matterType ||
    matterType === MatterType.matter ||
    matterType === MatterType.calendar
  ) {
    return null
  }

  return (
    <div className={styles.scheduleType}>{MatterTypeLabel[matterType]}</div>
  )
}
