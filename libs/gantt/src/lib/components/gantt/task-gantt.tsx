import React, { useRef, useEffect, ReactChild, useState } from 'react'
import { GridProps, Grid } from '../grid/grid'
import { CalendarProps, Calendar } from '../calendar/calendar'
import { TaskGanttContentProps, TaskGanttContent } from './task-gantt-content'
import styles from './gantt.module.scss'
import cs from 'classnames'
import { useMemoizedFn } from '@flyele/flyele-components'
export type TaskGanttProps = {
  gridProps: GridProps
  calendarProps: CalendarProps
  barProps: TaskGanttContentProps
  ganttHeight: number
  scrollY: number
  scrollX: number
  currentDate: string
  taskListWidth: number
  setSvgContainerClientWidth: (num: number) => void
  setScrollX: (num: number) => void
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
  setSvgContainerClientWidth,
  setScrollX
}) => {
  const ganttSVGRef = useRef<SVGSVGElement>(null)
  const horizontalContainerRef = useRef<HTMLDivElement>(null)
  const verticalGanttContainerRef = useRef<HTMLDivElement>(null)
  // const setTodayLine: ReactChild[] = []
  const [todayLine, setTodayLine] = useState<ReactChild[]>([])
  const newBarProps = { ...barProps, svg: ganttSVGRef, scrollX, setScrollX }
  const _gridProps = { ...gridProps, setTodayLine }
  const isWheel = useRef(false)
  useEffect(() => {
    if (horizontalContainerRef.current) {
      horizontalContainerRef.current.scrollTop = scrollY
    }
  }, [scrollY])
  useEffect(() => {
    setSvgContainerClientWidth(
      verticalGanttContainerRef.current?.clientWidth || 0
    )
  }, [setSvgContainerClientWidth, verticalGanttContainerRef])
  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.target === verticalGanttContainerRef.current) {
          const newWidth = entry.target.clientWidth
          // console.log('新的宽度:', newWidth);
          setSvgContainerClientWidth(newWidth || 0)
        }
      }
    })

    if (verticalGanttContainerRef.current) {
      resizeObserver.observe(verticalGanttContainerRef.current)
    }

    // 清除观察器
    return () => {
      resizeObserver.disconnect()
    }
  }, [setSvgContainerClientWidth])
  useEffect(() => {
    if (verticalGanttContainerRef.current && !isWheel.current) {
      verticalGanttContainerRef.current.scrollLeft = scrollX
    }
  }, [scrollX])

  const handleScroll = useMemoizedFn((event) => {
    if (!isWheel.current) {
      return
    }
    setScrollX(verticalGanttContainerRef?.current?.scrollLeft || 0)
    // timer = setTimeout(() => {
    //   isWheel.current = false
    // }, 200);
  })
  useEffect(() => {
    // subscribe if scroll is necessary
    verticalGanttContainerRef.current?.addEventListener(
      'scroll',
      handleScroll,
      {
        passive: false
      }
    )
    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      verticalGanttContainerRef.current?.removeEventListener(
        'scroll',
        handleScroll
      )
    }
  }, [verticalGanttContainerRef, handleScroll])

  useEffect(() => {
    // subscribe if scroll is necessary
    verticalGanttContainerRef.current?.addEventListener(
      'mousedown',
      function (event) {
        // 当鼠标按下时，将 isDragging 设置为 true
        isWheel.current = true
      }
    )
    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      verticalGanttContainerRef.current?.removeEventListener(
        'mousedown',
        function (event) {
          // 当鼠标按下时，将 isDragging 设置为 true
          isWheel.current = true
        }
      )
    }
  }, [verticalGanttContainerRef])
  useEffect(() => {
    // subscribe if scroll is necessary
    verticalGanttContainerRef.current?.addEventListener(
      'mouseup',
      function (event) {
        // 当鼠标按下时，将 isDragging 设置为 true
        isWheel.current = false
      }
    )
    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      verticalGanttContainerRef.current?.removeEventListener(
        'mouseup',
        function (event) {
          // 当鼠标按下时，将 isDragging 设置为 true
          isWheel.current = false
        }
      )
    }
  }, [verticalGanttContainerRef])

  // const handle = useMemoizedFn((event) => {
  //   event.stopPropagation()
  //   event.preventDefault();
  //   // isWheel.current = true
  //   // clearTimeout(timer)
  //   // timer = setTimeout(() => {
  //   //   console.log(event.deltaX);

  //   //   if (event.deltaX < 0) {
  //   //     // 向上滚动停止的操作
  //   //     console.log('向上滚动停止了');
  //   //     isWheel.current = false
  //   //     // 执行其他操作...
  //   //   } else if (event.deltaX > 0) {
  //   //     // 向下滚动停止的操作
  //   //     isWheel.current = false
  //   //     console.log('向下滚动停止了');
  //   //     // 执行其他操作...
  //   //   }
  //   // }, 1000)
  // })

  // useEffect(() => {
  //   // subscribe if scroll is necessary
  //   verticalGanttContainerRef.current?.addEventListener('wheel', handle, {
  //     passive: false
  //   })
  //   return () => {
  //     // eslint-disable-next-line react-hooks/exhaustive-deps
  //     verticalGanttContainerRef.current?.removeEventListener('wheel', handle)
  //   }
  // }, [verticalGanttContainerRef, handle])

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
    </div>
  )
}
