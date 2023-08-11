import React, { FC, useMemo } from 'react'
import { IScheduleTask } from '@flyele-nx/types'

interface IPROPIndent {
  task: IScheduleTask
  isTopTask: boolean
}

export const Indent: FC<IPROPIndent> = ({ task, isTopTask }) => {
  const deepWidth = useMemo(() => {
    let width = 0
    if (task.parent_id && !isTopTask) {
      const parentIds = task.parent_id.split(',')
      width = parentIds.length * 20
    } else {
      width = 0
    }
    return width
  }, [isTopTask, task.parent_id])

  return (
    <div
      style={{
        width: deepWidth + 'px'
      }}
    />
  )
}
