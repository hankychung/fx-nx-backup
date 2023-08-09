import React from 'react'
import { Task } from '@flyele-nx/types'
import { TaskRow } from '../task-row'

export const TaskChildRow: React.FC<{
  rowHeight: number
  rowWidth: string
  id: string
  taskId: string
  t: Task
}> = ({ rowHeight, rowWidth, id, taskId, t }) => {
  return (
    <TaskRow
      id={id}
      taskId={taskId}
      t={t}
      key={taskId}
      rowHeight={rowHeight}
      rowWidth={rowWidth}
    ></TaskRow>
  )
}
