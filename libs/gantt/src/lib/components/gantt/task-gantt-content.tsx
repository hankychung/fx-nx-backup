import { I18N } from '@flyele-nx/i18n'
import React, { useEffect, useMemo, useState } from 'react'
import {
  IFullViewEventOption,
  IFullViewBarTask,
  IFullViewGanttEvent
} from '@flyele-nx/types'
import { handleTaskBySVGMouseEvent } from '../../helpers/bar-helper'
import { isKeyboardEvent } from '../../helpers/other-helper'
import { TaskItem } from '../task-item/task-item'
import {
  FullViewBarMoveAction,
  FullViewGanttContentMoveAction,
  MatterType
} from '@flyele-nx/constant'
import { isInTask } from '../../utils'
import { useUserInfoStore } from '@flyele-nx/zustand-store'
import { globalNxController } from '@flyele-nx/global-processor'
import { timeGetter } from '@flyele-nx/utils'

export type TaskGanttContentProps = {
  tasks: IFullViewBarTask[]
  dates: Date[]
  ganttEvent: IFullViewGanttEvent
  selectedTask: IFullViewBarTask | undefined
  rowHeight: number
  columnWidth: number
  timeStep: number
  svg?: React.RefObject<SVGSVGElement>
  svgWidth: number
  taskHeight: number
  arrowColor: string
  arrowIndent: number
  fontSize: string
  fontFamily: string
  rtl: boolean
  scrollX: number
  setScrollX: (num: number) => void
  setGanttEvent: (value: IFullViewGanttEvent) => void
  setFailedTask: (value: IFullViewBarTask | null) => void
  setSelectedTask: (taskId: string) => void
} & IFullViewEventOption

export const TaskGanttContent: React.FC<TaskGanttContentProps> = ({
  tasks,
  dates,
  ganttEvent,
  selectedTask,
  rowHeight,
  columnWidth,
  timeStep,
  svg,
  taskHeight,
  arrowColor,
  arrowIndent,
  fontFamily,
  fontSize,
  rtl,
  setGanttEvent,
  setFailedTask,
  setSelectedTask,
  onDateChange,
  onProgressChange,
  onDoubleClick,
  onClick,
  onDelete,
  scrollX,
  setScrollX
}) => {
  const point = svg?.current?.createSVGPoint()
  const [xStep, setXStep] = useState(0)
  const [initEventX1Delta, setInitEventX1Delta] = useState(0)
  const [isMoving, setIsMoving] = useState(false)

  const userId = useUserInfoStore((state) => state.userInfo.user_id)

  // create xStep
  useEffect(() => {
    const dateDelta =
      dates[1].getTime() -
      dates[0].getTime() -
      dates[1].getTimezoneOffset() * 60 * 1000 +
      dates[0].getTimezoneOffset() * 60 * 1000
    const newXStep = (timeStep * columnWidth) / dateDelta
    setXStep(newXStep)
  }, [columnWidth, dates, timeStep])
  const notMyBusiness = useMemo(() => {
    if (!ganttEvent.changedTask) return
    return (
      !!userId &&
      !isInTask(
        ganttEvent.changedTask?.takers,
        userId,
        ganttEvent.changedTask?.creator_id
      )
    )
  }, [ganttEvent.changedTask, userId])

  useEffect(() => {
    const handleMouseMove = async (event: MouseEvent) => {
      if (!ganttEvent.changedTask || !point || !svg?.current) return
      event.preventDefault()
      if (ganttEvent.changedTask.repeat_id) {
        globalNxController.showMsg({
          content: I18N.common.recurringMattersTemporarily
        })

        return true
      }
      if (ganttEvent.changedTask.matter_type === MatterType.meeting) {
        const curStamp = await timeGetter.getDate()

        if (ganttEvent.changedTask.finish_time) {
          globalNxController.showMsg({
            content: I18N.common.meeting_ended_cannot_modify
          })

          return true
        }

        if (
          ganttEvent.changedTask?.start_time &&
          ganttEvent.changedTask?.start_time < curStamp
        ) {
          globalNxController.showMsg({
            content: I18N.common.meeting_in_progress_cannot_modify
          })
          return true
        }
      }

      if (ganttEvent.changedTask?.finish_time) {
        globalNxController.showMsg({
          msgType: '消息',
          content: I18N.common.completedItems
        })
        return
      }

      if (notMyBusiness) {
        globalNxController.showMsg({
          msgType: '错误',
          content: I18N.common.notInvolvedInMatters
        })
        return
      }

      point.x = event.clientX
      const cursor = point.matrixTransform(
        svg?.current.getScreenCTM()?.inverse()
      )

      const { isChanged, changedTask } = handleTaskBySVGMouseEvent(
        cursor.x,
        ganttEvent.action as FullViewBarMoveAction,
        ganttEvent.changedTask,
        xStep,
        timeStep,
        initEventX1Delta,
        rtl
      )
      if (isChanged) {
        setGanttEvent({ action: ganttEvent.action, changedTask })
      }
    }

    const handleMouseUp = async (event: MouseEvent) => {
      const { action, originalSelectedTask, changedTask } = ganttEvent
      if (!changedTask || !point || !svg?.current || !originalSelectedTask)
        return
      event.preventDefault()

      point.x = event.clientX
      const cursor = point.matrixTransform(
        svg?.current.getScreenCTM()?.inverse()
      )
      const { changedTask: newChangedTask } = handleTaskBySVGMouseEvent(
        cursor.x,
        action as FullViewBarMoveAction,
        changedTask,
        xStep,
        timeStep,
        initEventX1Delta,
        rtl
      )
      const notMyBusiness =
        !!userId &&
        !isInTask(newChangedTask.takers, userId, newChangedTask.creator_id)
      const isNotLikeOriginal =
        originalSelectedTask.start !== newChangedTask.start ||
        originalSelectedTask.end !== newChangedTask.end ||
        originalSelectedTask.progress !== newChangedTask.progress

      // remove listeners
      svg.current.removeEventListener('mousemove', handleMouseMove)
      svg.current.removeEventListener('mouseup', handleMouseUp)
      svg.current.removeEventListener('mouseleave', handleMouseUp)
      setGanttEvent({ action: '' })
      setIsMoving(false)

      // custom operation start
      let operationSuccess = true
      if (
        (action === 'move' || action === 'end' || action === 'start') &&
        onDateChange &&
        isNotLikeOriginal
      ) {
        if (newChangedTask.repeat_id) {
          if (newChangedTask.repeat_id) {
            return true
          }
        }
        if (newChangedTask.finish_time) {
          return
        }

        if (notMyBusiness) {
          return
        }

        try {
          const result = await onDateChange(
            newChangedTask,
            newChangedTask.barChildren
          )
          if (result !== undefined) {
            operationSuccess = result
          }
        } catch (error) {
          operationSuccess = false
        }
      } else if (onProgressChange && isNotLikeOriginal) {
        try {
          const result = await onProgressChange(
            newChangedTask,
            newChangedTask.barChildren
          )
          if (result !== undefined) {
            operationSuccess = result
          }
        } catch (error) {
          operationSuccess = false
        }
      }

      // If operation is failed - return old state
      if (!operationSuccess) {
        setFailedTask(originalSelectedTask)
      }
    }

    if (
      !isMoving &&
      (ganttEvent.action === 'move' ||
        ganttEvent.action === 'end' ||
        ganttEvent.action === 'start' ||
        ganttEvent.action === 'progress') &&
      svg?.current
    ) {
      svg.current.addEventListener('mousemove', handleMouseMove)
      svg.current.addEventListener('mouseup', handleMouseUp)
      svg.current.addEventListener('mouseleave', handleMouseUp)
      setIsMoving(true)
    }
  }, [
    ganttEvent,
    xStep,
    initEventX1Delta,
    onProgressChange,
    timeStep,
    onDateChange,
    svg,
    isMoving,
    point,
    rtl,
    setFailedTask,
    setGanttEvent,
    userId,
    notMyBusiness
  ])

  /**
   * Method is Start point of task change
   */
  const handleBarEventStart = async (
    action: FullViewGanttContentMoveAction,
    task: IFullViewBarTask,
    event?: React.MouseEvent | React.KeyboardEvent
  ) => {
    if (!event) {
      if (action === 'select') {
        setSelectedTask(task.id)
      }
    }
    // Keyboard events
    else if (isKeyboardEvent(event)) {
      if (action === 'delete') {
        if (onDelete) {
          try {
            const result = await onDelete(task)
            if (result !== undefined && result) {
              setGanttEvent({ action, changedTask: task })
            }
          } catch (error) {
            console.error('Error on Delete. ' + error)
          }
        }
      }
    }
    // Mouse Events
    else if (action === 'mouseenter') {
      if (!ganttEvent.action) {
        setGanttEvent({
          action,
          changedTask: task,
          originalSelectedTask: task
        })
      }
    } else if (action === 'mouseleave') {
      if (ganttEvent.action === 'mouseenter') {
        setGanttEvent({ action: '' })
      }
    } else if (action === 'dblclick') {
      !!onDoubleClick && onDoubleClick(task)
    } else if (action === 'click') {
      !!onClick && onClick(task)
    }
    // Change task event start
    else if (action === 'move') {
      if (!svg?.current || !point) return
      point.x = event.clientX
      const cursor = point.matrixTransform(
        svg.current.getScreenCTM()?.inverse()
      )
      setInitEventX1Delta(cursor.x - task.x1)
      setGanttEvent({
        action,
        changedTask: task,
        originalSelectedTask: task
      })
    } else {
      setGanttEvent({
        action,
        changedTask: task,
        originalSelectedTask: task
      })
    }
  }

  return (
    <g className="content">
      <g className="bar" fontFamily={fontFamily} fontSize={fontSize}>
        {tasks.map((task) => {
          if (!task.start_time && !task.end_time) return null
          return (
            <TaskItem
              task={task}
              arrowIndent={arrowIndent}
              taskHeight={taskHeight}
              isProgressChangeable={!!onProgressChange && !task.isDisabled}
              isDateChangeable={!!onDateChange && !task.isDisabled}
              isDelete={!task.isDisabled}
              onEventStart={handleBarEventStart}
              key={task.id}
              isSelected={!!selectedTask && task.id === selectedTask.id}
              rtl={rtl}
              svg={svg}
              isShowDrop={isMoving}
              scrollX={scrollX}
              setScrollX={setScrollX}
            />
          )
        })}
      </g>
    </g>
  )
}
