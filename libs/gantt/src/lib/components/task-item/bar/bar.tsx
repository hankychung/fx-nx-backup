import React, { useMemo } from 'react'
// import { getProgressPoint } from '../../../helpers/bar-helper'
import { BarDisplay } from './bar-display'
import { BarDateHandle } from './bar-date-handle'
// import { BarProgressHandle } from './bar-progress-handle'
import { TaskItemProps } from '../task-item'
import styles from './bar.module.css'
import { useUserInfoStore } from '@flyele-nx/zustand-store'
import { isInTask } from '../../../utils'
// import { createSVG } from '../../../utils'
// import { createRoot } from 'react-dom/client'

export const Bar = ({
  task,
  isProgressChangeable,
  isDateChangeable,
  rtl,
  onEventStart,
  isSelected
}: TaskItemProps) => {
  // const progressPoint = getProgressPoint(
  //   +!rtl * task.progressWidth + task.progressX,
  //   task.y,
  //   task.height
  // )
  const handleHeight = task.height - 2

  // const group = createSVG('g', {
  //   class: 'bar-wrapper',
  //   'data-id': task.task_id
  // })

  // const root = createRoot(createSVG("g", {
  //     class: "bar-group",
  //     append_to: group,
  //   }))
  // root.render(
  //   <g className={styles.barWrapper} tabIndex={0}>
  //     <BarDisplay
  //       task={task}
  //       x={task.x1}
  //       y={task.y}
  //       width={task.x2 - task.x1}
  //       height={task.height}
  //       progressX={task.progressX}
  //       progressWidth={task.progressWidth}
  //       barCornerRadius={task.barCornerRadius}
  //       styles={task.styles}
  //       isSelected={isSelected}
  //       onMouseDown={(e) => {
  //         isDateChangeable && onEventStart('move', task, e)
  //       }}
  //     />
  //     <g className="handleGroup">
  //       {isDateChangeable && (
  //         <g>
  //           {/* left */}
  //           <BarDateHandle
  //             x={task.x1 + 1}
  //             y={task.y + 1}
  //             width={task.handleWidth}
  //             height={handleHeight}
  //             barCornerRadius={task.barCornerRadius}
  //             onMouseDown={(e) => {
  //               onEventStart('start', task, e)
  //             }}
  //           />
  //           {/* right */}
  //           <BarDateHandle
  //             x={task.x2 - task.handleWidth - 1}
  //             y={task.y + 1}
  //             width={task.handleWidth}
  //             height={handleHeight}
  //             barCornerRadius={task.barCornerRadius}
  //             onMouseDown={(e) => {
  //               onEventStart('end', task, e)
  //             }}
  //           />
  //         </g>
  //       )}
  //       {/* {isProgressChangeable && (
  //       <BarProgressHandle
  //         progressPoint={progressPoint}
  //         onMouseDown={(e) => {
  //           onEventStart('progress', task, e)
  //         }}
  //       />
  //     )} */}
  //     </g>
  //   </g>
  // )

  const userId = useUserInfoStore((state) => state.userInfo.user_id)
  const notMyBusiness = useMemo(() => {
    return !!userId && !isInTask(task?.takers, userId, task?.creator_id)
  }, [userId, task])

  return (
    <g className={styles.barWrapper} tabIndex={0}>
      <BarDisplay
        task={task}
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
        {isDateChangeable && (
          <g>
            {/* left */}
            <BarDateHandle
              x={task.x1 + 1}
              y={task.y + 1}
              width={task.handleWidth}
              height={handleHeight}
              barCornerRadius={task.barCornerRadius}
              isFinish={!!task.finish_time}
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
              onMouseDown={(e) => {
                onEventStart('end', task, e)
              }}
            />
          </g>
        )}
        {/* {isProgressChangeable && (
      <BarProgressHandle
        progressPoint={progressPoint}
        onMouseDown={(e) => {
          onEventStart('progress', task, e)
        }}
      />
    )} */}
      </g>
    </g>
  )
  // return {group}
}
