import React, { useEffect, useRef, useState } from 'react'
import { IFullViewBarTask, Task } from '@flyele-nx/types'
import { FullViewGanttContentMoveAction } from '@flyele-nx/constant'
import { Bar } from './bar/bar'
import { BarSmall } from './bar/bar-small'
import { Milestone } from './milestone/milestone'
import { Project } from './project/project'
import style from './task-list.module.css'
// import { createSVG } from '../../utils'
// import checkboxFinishedIcon from '../../../assets/schedule/check.png'

export type TaskItemProps = {
  task: IFullViewBarTask
  arrowIndent: number
  taskHeight: number
  isProgressChangeable: boolean
  isDateChangeable: boolean
  isDelete: boolean
  isSelected: boolean
  rtl: boolean
  svg?: React.RefObject<SVGSVGElement>
  onEventStart: (
    action: FullViewGanttContentMoveAction,
    selectedTask: IFullViewBarTask,
    event?: React.MouseEvent | React.KeyboardEvent
  ) => any
}

export const TaskItem: React.FC<TaskItemProps> = (props) => {
  const {
    task,
    arrowIndent,
    isDelete,
    taskHeight,
    isSelected,
    rtl,
    onEventStart,
    svg
  } = {
    ...props
  }
  // const defaultLayout = {
  //   bar: null
  // }
  const textRef = useRef<SVGTextElement>(null)
  const [taskItem, setTaskItem] = useState<JSX.Element>(<div />)
  const [isTextInside, setIsTextInside] = useState(true)
  // const layout: any = useRef<{
  //   bar: HTMLElement | null
  // }>(defaultLayout)

  // const setupLayers = () => {
  //   layout.current['bar'] = createSVG('g', {
  //     class: 'bar',
  //     append_to: svg && svg.current
  //   })
  // }
  // const makeBars = () => {
  //   if (layout.current && layout.current.bar) {
  //     const bar = Bar({...props});
  //     layout.current.bar?.appendChild(bar.group);
  //   }
  // };

  // useEffect(() => {
  //   if (svg && svg.current && layout.current) {
  //     svg.current.innerHTML = ''
  //     layout.current = defaultLayout
  //     setupLayers()
  //     makeBars()
  //   }
  // // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [defaultLayout, svg, task])

  useEffect(() => {
    switch (task.typeInternal) {
      case 'milestone':
        setTaskItem(<Milestone {...props} />)
        break
      case 'project':
        setTaskItem(<Project {...props} />)
        break
      case 'smalltask':
        setTaskItem(<BarSmall {...props} />)
        break
      default:
        setTaskItem(<Bar {...props} />)
        break
    }
  }, [task, isSelected, props])

  useEffect(() => {
    if (textRef.current) {
      setIsTextInside(textRef.current.getBBox().width < task.x2 - task.x1)
    }
  }, [textRef, task])

  const getX = () => {
    const width = task.x2 - task.x1
    const hasChild = task.barChildren.length > 0
    if (isTextInside) {
      return task.x1 + width * 0.5
    }
    if (rtl && textRef.current) {
      return (
        task.x1 -
        textRef.current.getBBox().width -
        arrowIndent * +hasChild -
        arrowIndent * 0.2
      )
    } else {
      return task.x1 + width + arrowIndent * +hasChild + arrowIndent * 0.2
    }
  }

  return (
    <>
      <g
        onKeyDown={(e) => {
          switch (e.key) {
            case 'Delete': {
              if (isDelete) onEventStart('delete', task, e)
              break
            }
          }
          e.stopPropagation()
        }}
        onMouseEnter={(e) => {
          onEventStart('mouseenter', task, e)
        }}
        onMouseLeave={(e) => {
          onEventStart('mouseleave', task, e)
        }}
        onDoubleClick={(e) => {
          onEventStart('dblclick', task, e)
        }}
        onClick={(e) => {
          onEventStart('click', task, e)
        }}
        onFocus={() => {
          onEventStart('select', task)
        }}
      >
        {taskItem}
        <text
          x={getX()}
          y={task.y + taskHeight * 0.5}
          className={
            isTextInside
              ? style.barLabel
              : style.barLabel && style.barLabelOutside
          }
          ref={textRef}
          color="#262626"
        >
          {task.name}
        </text>
      </g>

      {/* {childrenDict[t.task_id] &&
        childrenDict[t.task_id].map((item) => {
          const task = taskDict[item] as Task
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
            />
          )
        })} */}
    </>
  )
}
