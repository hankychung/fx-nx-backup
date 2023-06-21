import React, { FC, memo } from 'react'
import { IProps, ScheduleTask } from './index'
import { useScheduleStore } from '../../../store/useScheduleStore'

const _ChildrenTask: FC<IProps> = ({
  taskKey,
  date,
  topId,
  curTime,
  userId,
  isDarkMode,
  style
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
      userId={userId}
      isSimple={true}
    />
  )
}

export const ChildrenTask = memo(_ChildrenTask)
