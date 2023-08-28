import React, { useMemo } from 'react'
// import { getProgressPoint } from '../../../helpers/bar-helper'
import { BarDisplay } from './bar-display'
// import { BarProgressHandle } from './bar-progress-handle'
import { TaskItemProps } from '../task-item'
import styles from './bar.module.css'
import { BarDateHandle } from './bar-date-handle'
import { useUserInfoStore } from '@flyele-nx/zustand-store'
import { isInTask } from '../../../utils'

export const BarSmall: React.FC<TaskItemProps> = ({
  task,
  isProgressChangeable,
  isDateChangeable,
  onEventStart,
  isSelected,
  isShowDrop
}) => {
  const handleHeight = task.height - 2
  return (
    <g className={styles.barWrapper} tabIndex={0}>
      <BarDisplay
        x={task.x1}
        y={task.y}
        width={task.x2 - task.x1}
        height={task.height}
        progressX={task.progressX}
        progressWidth={task.progressWidth}
        barCornerRadius={task.barCornerRadius}
        styles={task.styles}
        isFinish={!!task.finish_time}
        isSelected={isSelected}
        onMouseDown={(e) => {
          isDateChangeable && onEventStart('move', task, e)
        }}
      />
      <g className="handleGroup">
        {/* {isProgressChangeable && (
          <BarProgressHandle
            progressPoint={progressPoint}
            onMouseDown={(e) => {
              onEventStart('progress', task, e)
            }}
          />
        )} */}

        <g>
          {/* left */}
          <BarDateHandle
            x={task.x1 + 1}
            y={task.y + 1}
            width={task.handleWidth}
            height={handleHeight}
            barCornerRadius={task.barCornerRadius}
            isFinish={!!task.finish_time}
            isShowDrop={isShowDrop}
            onMouseDown={(e) => {
              onEventStart('start', task, e)
            }}
          />
          {/* right */}
          <BarDateHandle
            x={task.x2 - task.handleWidth - 1}
            y={task.y + 1}
            width={task.handleWidth}
            height={handleHeight}
            barCornerRadius={task.barCornerRadius}
            isFinish={!!task.finish_time}
            isShowDrop={isShowDrop}
            onMouseDown={(e) => {
              onEventStart('end', task, e)
            }}
          />
        </g>
      </g>
    </g>
  )
}
