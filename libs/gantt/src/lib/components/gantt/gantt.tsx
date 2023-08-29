import React, {
  useState,
  SyntheticEvent,
  useRef,
  useEffect,
  useMemo
} from 'react'
import {
  IFullViewGanttProps,
  Task,
  IFullViewDateSetup,
  IFullViewGanttEvent,
  IFullViewBarTask
} from '@flyele-nx/types'
import { FullViewModeEnum } from '@flyele-nx/constant'
import { GridProps } from '../grid/grid'
import { ganttDateRange, seedDates } from '../../helpers/date-helper'
import { CalendarProps } from '../calendar/calendar'
import { TaskGanttContentProps } from './task-gantt-content'
import { TaskListHeaderDefault } from '../task-list/task-list-header'
import { TaskListTableDefault } from '../task-list/task-list-table'
import { StandardTooltipContent, Tooltip } from '../other/tooltip'
import { VerticalScroll } from '../other/vertical-scroll'
import { TaskListProps, TaskList } from '../task-list/task-list'
import { TaskGantt } from './task-gantt'
import { convertToBarTasks } from '../../helpers/bar-helper'
import { HorizontalScroll } from '../other/horizontal-scroll'
// import { removeHiddenTasks, sortTasks } from '../../helpers/other-helper'
import styles from './gantt.module.scss'
import { ReactComponent as HideList } from '../../../assets/icons/hide_list.svg'
import { useGanttList } from '../../hooks/useScheduleList'
import { useMemoizedFn } from 'ahooks'
import dayjs from 'dayjs'
import { useDisplayEffect } from '@flyele/flyele-components'
export const Gantt: React.FunctionComponent<IFullViewGanttProps> = ({
  tasks,
  headerHeight = 32,
  columnWidth = 48,

  rowHeight = 42,
  ganttHeight = 640,
  viewMode = FullViewModeEnum.Day,
  preStepsCount = 1,
  locale = 'en-GB',
  barFill = 80,
  barCornerRadius = 3,
  barProgressColor = '#a3a3ff',
  barProgressSelectedColor = '#8282f5',
  barBackgroundColor = '#b8c2cc',
  barBackgroundSelectedColor = '#aeb8c2',
  projectProgressColor = '#7db59a',
  projectProgressSelectedColor = '#59a985',
  projectBackgroundColor = '#fac465',
  projectBackgroundSelectedColor = '#f7bb53',
  milestoneBackgroundColor = '#f1c453',
  milestoneBackgroundSelectedColor = '#f29e4c',
  rtl = false,
  handleWidth = 8,
  timeStep = 300000,
  arrowColor = 'grey',
  fontFamily = 'Arial, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue',
  fontSize = '14px',
  arrowIndent = 0,
  todayColor = 'rgba(252, 248, 227, 0.5)',
  viewDate,
  TooltipContent = StandardTooltipContent,
  TaskListHeader = TaskListHeaderDefault,
  TaskListTable = TaskListTableDefault,
  onDateChange,
  onProgressChange,
  onDoubleClick,
  onClick,
  onDelete,
  onSelect,
  onExpanderClick
}) => {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const taskListRef = useRef<HTMLDivElement>(null)
  const taskHeaderRef = useRef<HTMLDivElement>(null)
  const [dateSetup, setDateSetup] = useState<IFullViewDateSetup>(() => {
    const [startDate, endDate] = ganttDateRange(tasks, viewMode, preStepsCount)
    return { viewMode, dates: seedDates(startDate, endDate, viewMode) }
  })
  const [currentViewDate, setCurrentViewDate] = useState<Date | undefined>(
    undefined
  )

  const [listCellWidth, setListCellWidth] = useState('150px')
  const [taskListWidth, setTaskListWidth] = useState(0)
  const [taskListHeight, setTaskListHeight] = useState(0)
  const [taskHeaderWidth, setTaskHeaderWidth] = useState(0)
  const [isChecked, setIsChecked] = React.useState(true) //收合列表
  const [svgContainerWidth, setSvgContainerWidth] = useState(0)
  const [currentDate, setCurrentDate] = useState('')
  const [svgContainerHeight, setSvgContainerHeight] = useState(ganttHeight)
  const [barTasks, setBarTasks] = useState<IFullViewBarTask[]>([])
  const [ganttEvent, setGanttEvent] = useState<IFullViewGanttEvent>({
    action: ''
  })
  const taskHeight = useMemo(
    () => (rowHeight * barFill) / 100,
    [rowHeight, barFill]
  )

  const [selectedTask, setSelectedTask] = useState<IFullViewBarTask>()
  const [failedTask, setFailedTask] = useState<IFullViewBarTask | null>(null)

  const svgWidth = dateSetup.dates.length * columnWidth
  const ganttFullHeight = barTasks.length * rowHeight

  const [scrollY, setScrollY] = useState(0)
  const [scrollX, setScrollX] = useState(0)
  // const scrollX = use
  const [ignoreScrollEvent, setIgnoreScrollEvent] = useState(false)
  const { taskDict, childrenDict, expandDict, taskList } = useGanttList()

  useEffect(() => {
    if (isChecked) {
      setListCellWidth('155px')
    } else {
      setListCellWidth('')
    }
  }, [isChecked])

  // task change events
  useEffect(() => {
    const filteredTasks: Task[] = []
    const modifyExpend: string[] = []

    if (tasks && tasks.length > 0) {
      for (const key in expandDict) {
        if (expandDict[key]) modifyExpend.push(key)
      }
      const sum = (key: string) => {
        childrenDict[key] &&
          childrenDict[key].forEach((a) => {
            const i = taskDict[a]
            const item = {
              ...taskDict[a],
              start: i.start_time ? new Date(i.start_time * 1000) : new Date(),
              end: i.end_time ? new Date(i.end_time * 1000) : new Date(),
              name: i.title,
              id: i.task_id,
              type: 'task',
              hideChildren: false,
              displayOrder: 1
            }
            if (modifyExpend.includes(key)) {
              filteredTasks.push(item as Task)
            }
            if (childrenDict[a]) {
              sum(a)
            }
          })
      }
      taskList.forEach((key) => {
        const i = taskDict[key]
        const item = {
          ...taskDict[key],
          start: i.start_time ? new Date(i.start_time * 1000) : new Date(),
          end: i.end_time ? new Date(i.end_time * 1000) : new Date(),
          name: i.title,
          id: i.task_id,
          type: 'task',
          hideChildren: false,
          displayOrder: 1
        }
        if (modifyExpend.includes(key)) {
          filteredTasks.push(item as Task)
          sum(key)
          return
        }
        filteredTasks.push(item as Task)
      })
    }
    const [startDate, endDate] = ganttDateRange(
      filteredTasks,
      viewMode,
      preStepsCount
    )
    const newDates = seedDates(startDate, endDate, viewMode)
    setDateSetup({ dates: newDates, viewMode })

    setBarTasks(
      convertToBarTasks(
        filteredTasks,
        newDates,
        columnWidth,
        rowHeight,
        taskHeight,
        barCornerRadius,
        handleWidth,
        rtl,
        barProgressColor,
        barProgressSelectedColor,
        barBackgroundColor,
        barBackgroundSelectedColor,
        projectProgressColor,
        projectProgressSelectedColor,
        projectBackgroundColor,
        projectBackgroundSelectedColor,
        milestoneBackgroundColor,
        milestoneBackgroundSelectedColor
      )
    )
  }, [
    viewMode,
    preStepsCount,
    rowHeight,
    barCornerRadius,
    columnWidth,
    taskHeight,
    handleWidth,
    barProgressColor,
    barProgressSelectedColor,
    barBackgroundColor,
    barBackgroundSelectedColor,
    projectProgressColor,
    projectProgressSelectedColor,
    projectBackgroundColor,
    projectBackgroundSelectedColor,
    milestoneBackgroundColor,
    milestoneBackgroundSelectedColor,
    rtl,
    taskDict,
    expandDict,
    taskList,
    childrenDict,
    tasks
  ])

  useEffect(() => {
    if (
      viewMode === dateSetup.viewMode &&
      ((viewDate && !currentViewDate) ||
        (viewDate && currentViewDate?.valueOf() !== viewDate.valueOf()))
    ) {
      const dates = dateSetup.dates
      const index = dates.findIndex(
        (d, i) =>
          viewDate.valueOf() >= d.valueOf() &&
          i + 1 !== dates.length &&
          viewDate.valueOf() < dates[i + 1].valueOf()
      )
      if (index === -1) {
        return
      }
      setCurrentViewDate(viewDate)
      setScrollX(columnWidth * index)
    }
  }, [
    viewDate,
    columnWidth,
    dateSetup.dates,
    dateSetup.viewMode,
    viewMode,
    currentViewDate,
    setCurrentViewDate
  ])

  useEffect(() => {
    const { changedTask, action } = ganttEvent
    if (changedTask) {
      if (action === 'delete') {
        setGanttEvent({ action: '' })
        setBarTasks(barTasks.filter((t) => t.id !== changedTask.id))
      } else if (
        action === 'move' ||
        action === 'end' ||
        action === 'start' ||
        action === 'progress'
      ) {
        const prevStateTask = barTasks.find((t) => t.id === changedTask.id)
        if (
          prevStateTask &&
          (prevStateTask.start.getTime() !== changedTask.start.getTime() ||
            prevStateTask.end.getTime() !== changedTask.end.getTime() ||
            prevStateTask.progress !== changedTask.progress)
        ) {
          // actions for change
          const newTaskList = barTasks.map((t) =>
            t.id === changedTask.id ? changedTask : t
          )
          setBarTasks(newTaskList)
        }
      }
    }
  }, [ganttEvent, barTasks])

  useEffect(() => {
    if (failedTask) {
      setBarTasks(
        barTasks.map((t) => (t.id !== failedTask.id ? t : failedTask))
      )
      setFailedTask(null)
    }
  }, [failedTask, barTasks])

  useDisplayEffect(() => {
    if (taskHeaderRef.current) {
      setTaskHeaderWidth(taskHeaderRef.current?.offsetWidth)
    }
  }, taskHeaderRef.current)

  useEffect(() => {
    if (!listCellWidth) {
      setTaskListWidth(0)
    }
    if (taskListRef.current) {
      setTaskListWidth(taskListRef.current.offsetWidth)
    }
    if (taskHeaderRef.current) {
      setTaskHeaderWidth(taskHeaderRef.current?.offsetWidth)
    }
  }, [
    taskListRef,
    listCellWidth,
    taskDict,
    taskList,
    tasks,
    currentDate,
    taskHeaderRef
  ])

  useEffect(() => {
    if (wrapperRef.current) {
      setSvgContainerWidth(wrapperRef.current.offsetWidth - taskListWidth)
    }
  }, [wrapperRef, taskListWidth])

  useEffect(() => {
    // if (ganttHeight) {
    //   setSvgContainerHeight(ganttHeight + headerHeight)
    // } else {
    //   setSvgContainerHeight(tasks.length * rowHeight + headerHeight)
    // }
    setSvgContainerHeight(tasks.length * rowHeight + headerHeight * 2)
  }, [ganttHeight, tasks, headerHeight, rowHeight])
  const handleWheel = useMemoizedFn((event: WheelEvent) => {
    event.stopPropagation()
    if (event.shiftKey || event.deltaX) {
      const scrollMove = event.deltaX ? event.deltaX : event.deltaY
      let newScrollX = scrollX + scrollMove
      if (newScrollX < 0) {
        newScrollX = 0
      } else if (newScrollX > svgWidth) {
        newScrollX = svgWidth
      }
      setScrollX(newScrollX)
    } else if (ganttHeight) {
      let newScrollY = scrollY + event.deltaY
      if (newScrollY < 0) {
        newScrollY = 0
      } else if (newScrollY > ganttFullHeight) {
        newScrollY = ganttFullHeight
      }
      if (newScrollY !== scrollY) {
        setScrollY(newScrollY)
      }
    }

    setIgnoreScrollEvent(true)
  })

  // scroll events
  useEffect(() => {
    // subscribe if scroll is necessary
    wrapperRef.current?.addEventListener('wheel', handleWheel, {
      passive: false
    })
    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      wrapperRef.current?.removeEventListener('wheel', handleWheel)
    }
  }, [wrapperRef, handleWheel])

  const handleScrollY = (event: SyntheticEvent<HTMLDivElement>) => {
    if (scrollY !== event.currentTarget.scrollTop && !ignoreScrollEvent) {
      setScrollY(event.currentTarget.scrollTop)
      setIgnoreScrollEvent(true)
    } else {
      setIgnoreScrollEvent(false)
    }
  }

  const handleScrollX = useMemoizedFn(
    (event: SyntheticEvent<HTMLDivElement>) => {
      if (scrollX !== event.currentTarget.scrollLeft && !ignoreScrollEvent) {
        setScrollX(event.currentTarget.scrollLeft)
        setIgnoreScrollEvent(true)
      } else {
        setIgnoreScrollEvent(false)
      }
    }
  )

  /**
   * Handles arrow keys events and transform it to new scroll
   */
  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    event.preventDefault()
    let newScrollY = scrollY
    let newScrollX = scrollX
    let isX = true
    switch (event.key) {
      case 'Down': // IE/Edge specific value
      case 'ArrowDown':
        newScrollY += rowHeight
        isX = false
        break
      case 'Up': // IE/Edge specific value
      case 'ArrowUp':
        newScrollY -= rowHeight
        isX = false
        break
      case 'Left':
      case 'ArrowLeft':
        newScrollX -= columnWidth
        break
      case 'Right': // IE/Edge specific value
      case 'ArrowRight':
        newScrollX += columnWidth
        break
    }
    if (isX) {
      if (newScrollX < 0) {
        newScrollX = 0
      } else if (newScrollX > svgWidth) {
        newScrollX = svgWidth
      }
      setScrollX(newScrollX)
    } else {
      if (newScrollY < 0) {
        newScrollY = 0
      } else if (newScrollY > ganttFullHeight - ganttHeight) {
        newScrollY = ganttFullHeight - ganttHeight
      }
      setScrollY(newScrollY)
    }
    setIgnoreScrollEvent(true)
  }

  /**
   * Task select event
   */
  const handleSelectedTask = (taskId: string) => {
    const newSelectedTask = barTasks.find((t) => t.id === taskId)
    const oldSelectedTask = barTasks.find(
      (t) => !!selectedTask && t.id === selectedTask.id
    )
    if (onSelect) {
      if (oldSelectedTask) {
        onSelect(oldSelectedTask, false)
      }
      if (newSelectedTask) {
        onSelect(newSelectedTask, true)
      }
    }
    setSelectedTask(newSelectedTask)
  }
  const handleExpanderClick = (task: Task) => {
    if (onExpanderClick && task.hideChildren !== undefined) {
      onExpanderClick({ ...task, hideChildren: !task.hideChildren })
    }
  }
  const gridProps: GridProps = {
    columnWidth,
    svgWidth,
    tasks: barTasks,
    rowHeight,
    dates: dateSetup.dates,
    todayColor,
    rtl
  }
  const calendarProps: CalendarProps = {
    dateSetup,
    locale,
    viewMode,
    headerHeight,
    columnWidth,
    fontFamily,
    fontSize,
    rtl
  }
  const barProps: TaskGanttContentProps = {
    tasks: barTasks,
    dates: dateSetup.dates,
    ganttEvent,
    selectedTask,
    rowHeight,
    taskHeight,
    columnWidth,
    arrowColor,
    timeStep,
    fontFamily,
    fontSize,
    arrowIndent,
    svgWidth,
    rtl,
    setGanttEvent,
    setFailedTask,
    setSelectedTask: handleSelectedTask,
    onDateChange,
    onProgressChange,
    onDoubleClick,
    onClick,
    onDelete
  }

  const tableProps: TaskListProps = {
    rowHeight,
    rowWidth: listCellWidth,
    fontFamily,
    fontSize,
    tasks: barTasks,
    locale,
    headerHeight,
    scrollY,
    ganttHeight,
    horizontalContainerClass: styles.horizontalContainer,
    selectedTask,
    taskListRef,
    taskHeaderRef,
    setSelectedTask: handleSelectedTask,
    onExpanderClick: handleExpanderClick,
    TaskListHeader,
    TaskListTable,
    setIsChecked,
    isChecked
  }

  //顶部月份变化
  useEffect(() => {
    const res = Math.floor(scrollX / columnWidth)

    const dates = dateSetup.dates
    if (!dates[res]) return
    const date = dayjs(dates[res]).format('YYYY-MM')

    setCurrentDate(date)
  }, [
    setCurrentDate,
    columnWidth,
    dateSetup.dates,
    scrollX,
    taskDict,
    taskList
  ])

  const toTodayView = useMemoizedFn(() => {
    const initDate = new Date()
    const dates = dateSetup.dates
    const index = dates.findIndex(
      (d, i) =>
        initDate.valueOf() >= d.valueOf() &&
        i + 1 !== dates.length &&
        initDate.valueOf() < dates[i + 1].valueOf()
    )
    if (index === -1) {
      return
    }
    setCurrentViewDate(initDate)
    setScrollX(columnWidth * index - columnWidth * 2)
  })
  useEffect(() => {
    if (!dateSetup.dates || !columnWidth || currentDate) return
    toTodayView()
  }, [columnWidth, currentDate, dateSetup.dates, toTodayView])

  return (
    <div>
      <div
        className={styles.wrapper}
        // onKeyDown={handleKeyDown}
        tabIndex={0}
        ref={wrapperRef}
      >
        {listCellWidth && <TaskList {...tableProps} />}
        {!listCellWidth && (
          <div
            style={{
              width: '40px',
              height: `${taskListHeight}px`,
              padding: '16px',
              border: taskListHeight
                ? '1px solid rgba(232, 232, 232, 0.5)'
                : '',
              boxSizing: 'border-box'
            }}
          >
            <HideList onClick={() => setIsChecked(!isChecked)}></HideList>
          </div>
        )}
        <TaskGantt
          gridProps={gridProps}
          calendarProps={calendarProps}
          barProps={barProps}
          ganttHeight={ganttHeight}
          scrollY={scrollY}
          scrollX={scrollX}
          currentDate={currentDate}
          taskListWidth={taskListWidth}
          setScrollX={setScrollX}
        />

        {/* {ganttEvent.changedTask && (
          <Tooltip
            arrowIndent={arrowIndent}
            rowHeight={rowHeight}
            svgContainerHeight={svgContainerHeight}
            svgContainerWidth={svgContainerWidth}
            fontFamily={fontFamily}
            fontSize={fontSize}
            scrollX={scrollX}
            scrollY={scrollY}
            task={ganttEvent.changedTask}
            headerHeight={headerHeight}
            taskListWidth={taskListWidth}
            TooltipContent={TooltipContent}
            rtl={rtl}
            svgWidth={svgWidth}
          />
        )} */}
        {taskHeaderWidth && (
          <div
            className={styles.fixedss}
            style={{
              left: `${isChecked ? taskHeaderWidth || taskListWidth : 40}px`
            }}
          >
            <div className={styles.currentDate}>{currentDate}</div>
            {currentDate && (
              <div className={styles.today} onClick={toTodayView}>
                今天
              </div>
            )}
          </div>
        )}
        {/* <VerticalScroll
          ganttFullHeight={ganttFullHeight}
          ganttHeight={ganttHeight}
          headerHeight={headerHeight}
          scroll={scrollY}
          onScroll={handleScrollY}
          rtl={rtl}
        /> */}
        {/* <HorizontalScroll
          svgWidth={svgWidth}
          taskListWidth={taskListWidth}
          scroll={scrollX}
          rtl={rtl}
          onScroll={handleScrollX}
        /> */}
      </div>
    </div>
  )
}
