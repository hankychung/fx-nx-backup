import React, { useEffect, useMemo, useRef, useState } from 'react'
import { IFullViewBarTask, Task } from '@flyele-nx/types'
import { FullViewGanttContentMoveAction } from '@flyele-nx/constant'
import { Bar } from './bar/bar'
import { BarSmall } from './bar/bar-small'
import { Milestone } from './milestone/milestone'
import { Project } from './project/project'
import style from './task-list.module.css'
import { useMemoizedFn } from 'ahooks'
import cs from 'classnames'
import dayjs from 'dayjs'
import { useGanttList } from '../../hooks/useScheduleList'
import { getEnFormat } from '@flyele-nx/utils'
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
  isShowDrop: boolean
  scrollX: number
  setScrollX: (num: number) => void
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
    svg,
    scrollX,
    setScrollX
  } = {
    ...props
  }
  // const defaultLayout = {
  //   bar: null
  // }
  const textRef = useRef<SVGTextElement>(null)
  const [taskItem, setTaskItem] = useState<JSX.Element>(<div />)
  const [isTextInside, setIsTextInside] = useState(true)
  const { hoverId } = useGanttList()
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
  const a = useMemoizedFn(() => {
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
  })
  useEffect(() => {
    a()
  }, [a, task])

  useEffect(() => {
    if (textRef.current) {
      setIsTextInside(textRef.current.getBBox().width < task.x2 - task.x1)
    }
  }, [textRef, task])

  const getX = useMemo(() => {
    return task.x1 + 20
    // if (rtl && textRef.current) {
    //   return (
    //     task.x1 -
    //     textRef.current.getBBox().width -
    //     arrowIndent * +hasChild -
    //     arrowIndent * 0.2
    //   )
    // } else {
    //   return task.x1 + width + arrowIndent * +hasChild + arrowIndent * 0.2
    // }
  }, [task.x1])
  const getLeft = useMemo(() => {
    return scrollX
    // if (rtl && textRef.current) {
    //   return (
    //     task.x1 -
    //     textRef.current.getBBox().width -
    //     arrowIndent * +hasChild -
    //     arrowIndent * 0.2
    //   )
    // } else {
    //   return task.x1 + width + arrowIndent * +hasChild + arrowIndent * 0.2
    // }
  }, [scrollX])

  const timeTooltip = useMemo(() => {
    const start = task.start_time
      ? getEnFormat(
          dayjs(task.start),
          `MM月DD日 ${task.start_time_full_day === 2 ? '' : 'HH:mm'}`,
          `MMM D ${task.start_time_full_day === 2 ? '' : 'h:mm A'}`
        )
      : ''
    const end = task.end_time
      ? getEnFormat(
          dayjs(task.end),
          `MM月DD日 ${task.start_time_full_day === 2 ? '' : 'HH:mm'}`,
          `MMM D ${task.start_time_full_day === 2 ? '' : 'h:mm A'}`
        )
      : ''
    return `${start}${start && end ? '-' : ''}${end}`
  }, [task])

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
        className={style.blockTitle}
      >
        {
          <g
            className={style.timeTip}
            x={task.y < 40 ? task.x1 - 240 : getX}
            y={task.y < 40 ? task.y : task.y - 50}
          >
            <foreignObject
              x={task.y < 40 ? task.x1 - 240 : getX}
              y={task.y < 40 ? task.y : task.y - 50}
              width="240"
              height="130"
            >
              <div className={style.TrBubble}>{timeTooltip}</div>
            </foreignObject>
          </g>
        }
        {taskItem}
        <text
          x={getX}
          y={task.y + taskHeight * 0.5}
          className={cs(style.barLabel, {
            [style.overColor]: !!task.finish_time || !!task.complete_at
          })}
          ref={textRef}
          color="rgba(189, 189, 189, 1)"
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
