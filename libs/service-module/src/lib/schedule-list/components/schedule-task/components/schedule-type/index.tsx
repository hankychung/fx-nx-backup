import React from 'react'
import styles from './index.module.scss'
import { ScheduleTaskConst } from '@flyele-nx/service'

interface IPROPScheduleType {
  matterType?: ScheduleTaskConst.MatterType
}

export const ScheduleType: React.FC<IPROPScheduleType> = ({ matterType }) => {
  if (
    !matterType ||
    matterType === ScheduleTaskConst.MatterType.matter ||
    matterType === ScheduleTaskConst.MatterType.calendar
  ) {
    return null
  }

  return (
    <div className={styles.scheduleType}>
      {ScheduleTaskConst.MatterTypeLabel[matterType]}
    </div>
  )
}
