import React, { useEffect, useRef } from 'react'
import { Task, IFullViewBarTask } from '@flyele-nx/types'

export type TaskListProps = {
  headerHeight: number
  rowWidth: string
  fontFamily: string
  fontSize: string
  rowHeight: number
  ganttHeight: number
  scrollY: number
  locale: string
  tasks: Task[]
  taskListRef: React.RefObject<HTMLDivElement>
  horizontalContainerClass?: string
  selectedTask: IFullViewBarTask | undefined
  setSelectedTask: (task: string) => void
  onExpanderClick: (task: Task) => void
  setIsChecked: (data: boolean) => void
  isChecked: boolean
  TaskListHeader: React.FC<{
    headerHeight: number
    rowWidth: string
    fontFamily: string
    fontSize: string
    setIsChecked: (data: boolean) => void
    isChecked: boolean
  }>
  TaskListTable: React.FC<{
    rowHeight: number
    rowWidth: string
    fontFamily: string
    fontSize: string
    locale: string
    tasks: Task[]
    selectedTaskId: string
    setSelectedTask: (taskId: string) => void
    onExpanderClick: (task: Task) => void
  }>
}

export const TaskList: React.FC<TaskListProps> = ({
  headerHeight,
  fontFamily,
  fontSize,
  rowWidth,
  rowHeight,
  scrollY,
  tasks,
  selectedTask,
  setSelectedTask,
  onExpanderClick,
  locale,
  ganttHeight,
  taskListRef,
  horizontalContainerClass,
  TaskListHeader,
  TaskListTable,
  setIsChecked,
  isChecked
}) => {
  const horizontalContainerRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (horizontalContainerRef.current) {
      horizontalContainerRef.current.scrollTop = scrollY
    }
  }, [scrollY])

  const headerProps = {
    headerHeight,
    fontFamily,
    fontSize,
    rowWidth,
    setIsChecked,
    isChecked
  }
  const selectedTaskId = selectedTask ? selectedTask.id : ''
  const tableProps = {
    rowHeight,
    rowWidth,
    fontFamily,
    fontSize,
    tasks,
    locale,
    selectedTaskId: selectedTaskId,
    setSelectedTask,
    onExpanderClick
  }

  return (
    <div ref={taskListRef} style={{ height: 'calc(100vh - 100px)' }}>
      <TaskListHeader {...headerProps} />
      <div
        ref={horizontalContainerRef}
        className={horizontalContainerClass}
        style={ganttHeight ? { height: ganttHeight } : {}}
      >
        <TaskListTable {...tableProps} />
      </div>
    </div>
  )
}
