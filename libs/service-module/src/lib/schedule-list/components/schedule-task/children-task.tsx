import React, { FC, memo } from 'react'
import { IProps, ScheduleTask } from './index'
import { useScheduleStore } from '../../../store/useScheduleStore'

const _ChildrenTask: FC<IProps> = ({
  taskKey,
  date,
  topId,
  curTime,
  isDarkMode,
  style,
  isVipWin = false,
  opacity
}) => {
  const data = useScheduleStore((state) => state.taskDict[taskKey])

  if (
    (data.finish_time && data.repeat_type !== undefined && !data.repeat_type) ||
    JSON.stringify(data) === '{}'
  ) {
    return null
  }

  return (
    <ScheduleTask
      date={date}
      taskKey={taskKey}
      topId={topId}
      curTime={curTime}
      isDarkMode={isDarkMode}
      style={style}
      isSimple={true}
      isVipWin={isVipWin}
      opacity={opacity}
    />
  )
}

export const ChildrenTask = memo(_ChildrenTask)
