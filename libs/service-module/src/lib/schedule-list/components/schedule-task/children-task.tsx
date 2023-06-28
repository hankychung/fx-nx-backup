import React, { FC, memo } from 'react'
import { IProps, ScheduleTask } from './index'
import { useScheduleStore } from '../../../store/useScheduleStore'

const _ChildrenTask: FC<IProps> = ({
  taskKey,
  date,
  topId,
  curTime,
  listKey,
  isDarkMode,
  style,
  isVipWin = false
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
      listKey={listKey}
      topId={topId}
      curTime={curTime}
      isDarkMode={isDarkMode}
      style={style}
      isSimple={true}
      isVipWin={isVipWin}
    />
  )
}

export const ChildrenTask = memo(_ChildrenTask)
