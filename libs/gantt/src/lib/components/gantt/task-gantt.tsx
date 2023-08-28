import React, { useRef, useEffect, ReactChild, useState } from 'react'
import { GridProps, Grid } from '../grid/grid'
import { CalendarProps, Calendar } from '../calendar/calendar'
import { TaskGanttContentProps, TaskGanttContent } from './task-gantt-content'
import styles from './gantt.module.scss'
import cs from 'classnames'
import { useMemoizedFn } from 'ahooks'
export type TaskGanttProps = {
  gridProps: GridProps
  calendarProps: CalendarProps
  barProps: TaskGanttContentProps
  ganttHeight: number
  scrollY: number
  scrollX: number
  currentDate: string
  taskListWidth: number
  setScrollTime: (num: number) => void
}
export const TaskGantt: React.FC<TaskGanttProps> = ({
  gridProps,
  calendarProps,
  barProps,
  ganttHeight,
  scrollY,
  scrollX,
  currentDate,
  taskListWidth,
  setScrollTime
}) => {
  const ganttSVGRef = useRef<SVGSVGElement>(null)
  const horizontalContainerRef = useRef<HTMLDivElement>(null)
  const verticalGanttContainerRef = useRef<HTMLDivElement>(null)
  // const setTodayLine: ReactChild[] = []
  const [todayLine, setTodayLine] = useState<ReactChild[]>([])
  const newBarProps = { ...barProps, svg: ganttSVGRef }
  const _gridProps = { ...gridProps, setTodayLine }
  useEffect(() => {
    if (horizontalContainerRef.current) {
      horizontalContainerRef.current.scrollTop = scrollY
    }
  }, [scrollY])

  useEffect(() => {
    if (verticalGanttContainerRef.current) {
      verticalGanttContainerRef.current.scrollLeft = scrollX
    }
  }, [scrollX])

  const handleScroll = useMemoizedFn((event) => {
    // console.log(event,event.target,verticalGanttContainerRef?.current?.scrollLeft);

    setScrollTime(event.target.timeStamp)
  })

  useEffect(() => {
    // subscribe if scroll is necessary
    verticalGanttContainerRef.current?.addEventListener('scroll', handleScroll)
    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      verticalGanttContainerRef.current?.removeEventListener(
        'scroll',
        handleScroll
      )
    }
  }, [verticalGanttContainerRef, handleScroll])
  return (
    <div
      className={styles.ganttVerticalContainer}
      ref={verticalGanttContainerRef}
      dir="ltr"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={gridProps.svgWidth - 42}
        height={41}
        fontFamily={barProps.fontFamily}
      >
        <Calendar {...calendarProps} isTop={true} headerHeight={40} />
      </svg>

      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={gridProps.svgWidth}
        height={calendarProps.headerHeight + 2}
        fontFamily={barProps.fontFamily}
      >
        <Calendar {...calendarProps} isTop={false} />
      </svg>
      <div
        ref={horizontalContainerRef}
        className={cs(styles.horizontalContainer)}
        style={
          ganttHeight
            ? { height: `calc(100% - 74px)`, width: gridProps.svgWidth }
            : { width: gridProps.svgWidth }
        }
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={gridProps.svgWidth}
          height={barProps.rowHeight * barProps.tasks.length}
          fontFamily={barProps.fontFamily}
          ref={ganttSVGRef}
        >
          <Grid {..._gridProps} />
          <TaskGanttContent {...newBarProps} />
          <g className="ticks">{todayLine}</g>
        </svg>
      </div>
      {/* <div
        className={styles.fixedss}
        style={{
          left: `${taskListWidth + 20}px`
        }}
      >
        {currentDate}
      </div> */}
    </div>
  )
}
