import React, { useEffect, useRef } from 'react'
import { Task, IFullViewBarTask } from '@flyele-nx/types'
import cs from 'classnames'
import styles from './task-list-table.module.css'
import ListEmpty from '../ListEmpty'
import { FullShowMode } from '@flyele-nx/constant'
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
  taskHeaderRef: React.RefObject<HTMLDivElement>
  horizontalContainerClass?: string
  selectedTask: IFullViewBarTask | undefined
  setSelectedTask: (task: string) => void
  onExpanderClick: (task: Task) => void
  setIsChecked: (data: boolean) => void
  isChecked: boolean
  setFullShowMode: (_: FullShowMode) => void
  TaskListHeader: React.FC<{
    headerHeight: number
    rowWidth: string
    fontFamily: string
    fontSize: string
    setIsChecked: (data: boolean) => void
    isChecked: boolean
    taskHeaderRef: React.RefObject<HTMLDivElement>
    setFullShowMode: (_: FullShowMode) => void
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
  taskHeaderRef,
  horizontalContainerClass,
  TaskListHeader,
  TaskListTable,
  setIsChecked,
  isChecked,
  setFullShowMode
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
    isChecked,
    taskHeaderRef,
    setFullShowMode
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
    <div
      ref={taskListRef}
      style={{
        maxHeight: 'calc(100vh - 100px)',
        border: '1px solid rgba(232, 232, 232, 0.5)'
      }}
    >
      <TaskListHeader {...headerProps} />
      <div
        ref={horizontalContainerRef}
        className={cs(horizontalContainerClass)}
        style={ganttHeight ? { maxHeight: `calc(100% - 74px)` } : {}}
      >
        <TaskListTable {...tableProps} />
        <div style={{ height: '6px' }}></div>
      </div>
      {tasks.length === 0 && <ListEmpty></ListEmpty>}
    </div>
  )
}
