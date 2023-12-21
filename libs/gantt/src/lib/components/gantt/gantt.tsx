import { I18N } from '@flyele-nx/i18n'
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
import { StandardTooltipContent } from '../other/tooltip'
import { TaskListProps, TaskList } from '../task-list/task-list'
import { TaskGantt } from './task-gantt'
import { convertToBarTasks } from '../../helpers/bar-helper'
import { getEnFormat } from '@flyele-nx/utils'
import styles from './gantt.module.scss'
import { ReactComponent as HideList } from '../../../assets/icons/hide_list.svg'
import { ReactComponent as GanttLeft } from '../../../assets/icons/gantt_left.svg'
import { ReactComponent as GanttRight } from '../../../assets/icons/gantt_right.svg'
import { ReactComponent as ArrowDown } from '../../../assets/icons/arrow_down.svg'
import { ReactComponent as ArrowUp } from '../../../assets/icons/arrow_up.svg'
import { ReactComponent as ArrowSelect } from '../../../assets/icons/arrow_select.svg'
import { useGanttList } from '../../hooks/useScheduleList'
import { useMemoizedFn } from 'ahooks'
import dayjs from 'dayjs'
import { useDisplayEffect } from '@flyele/flyele-components'
import { debounce } from 'lodash'
import { Popover } from 'antd'
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
  onExpanderClick,
  fetchList,
  pageParams,
  loading,
  setFullShowMode,
  setView
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
  const [svgContainerClientWidth, setSvgContainerClientWidth] = useState(0)
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
  // console.log(svgContainerWidth,'svgContainerWidth');

  const [selectedTask, setSelectedTask] = useState<IFullViewBarTask>()
  const [failedTask, setFailedTask] = useState<IFullViewBarTask | null>(null)
  const leftRef = useRef<HTMLDivElement>(null)
  const rightRef = useRef<HTMLDivElement>(null)
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

  const loadmoreDebounce = useMemo(
    () => debounce(async (callBack: () => void) => await callBack(), 10),
    []
  )

  const handleWheel = useMemoizedFn((event: WheelEvent) => {
    if (event.shiftKey || event.deltaX) {
      const scrollMove = event.deltaX ? event.deltaX : event.deltaY
      let newScrollX = scrollX + scrollMove
      if (newScrollX < 0) {
        newScrollX = 0
      } else if (newScrollX > svgWidth) {
        newScrollX = svgWidth
      }
      setScrollX(newScrollX)
      event.preventDefault()
    } else if (ganttHeight) {
      let newScrollY = scrollY + event.deltaY
      if (newScrollY < 0) {
        newScrollY = 0
      } else if (newScrollY > ganttFullHeight) {
        newScrollY = ganttFullHeight
      }
      if (newScrollY !== scrollY) {
        setScrollY(newScrollY)
        if (leftRef.current) {
          // verticalGanttContainerRef.current.scrollLeft = scrollX
          leftRef.current.scrollTop = newScrollY || 0
        }
        if (rightRef.current) {
          // verticalGanttContainerRef.current.scrollLeft = scrollX
          rightRef.current.scrollTop = newScrollY || 0
        }

        // event.preventDefault()
      }
    }
    if (wrapperRef.current) {
      const isScrollingDown = event.deltaY > 0
      const isAtBottom =
        wrapperRef.current?.scrollTop + wrapperRef.current?.clientHeight >=
        wrapperRef.current?.scrollHeight

      if (isScrollingDown && isAtBottom) {
        if (loading.current) return

        loadmoreDebounce(() => {
          pageParams.current.page_number++
          fetchList()
        })
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

  //   const handleScroll = useMemoizedFn((event) => {
  //   console.log(event)

  // })

  // useEffect(() => {
  //   // subscribe if scroll is necessary
  //   wrapperRef.current?.addEventListener('scroll', handleScroll, {
  //     passive: false
  //   })
  //   return () => {
  //     // eslint-disable-next-line react-hooks/exhaustive-deps
  //     wrapperRef.current?.removeEventListener('scroll', handleScroll)
  //   }
  // }, [wrapperRef, handleScroll])

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
    onDelete,
    scrollX,
    setScrollX
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
    isChecked,
    setFullShowMode
  }

  //顶部月份变化
  useEffect(() => {
    const res = Math.floor(
      scrollX /
        (viewMode === FullViewModeEnum.Week ? columnWidth * 4 : columnWidth)
    )

    const dates = dateSetup.dates
    if (!dates[res]) return
    const date = getEnFormat(dayjs(dates[res]), 'YYYY-MM', 'MMM D')

    setCurrentDate(date)
  }, [
    setCurrentDate,
    columnWidth,
    dateSetup.dates,
    scrollX,
    taskDict,
    taskList,
    viewMode
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
  useEffect(() => {
    toTodayView()
  }, [toTodayView, viewMode, dateSetup.dates, columnWidth])

  const viewText = useMemo(() => {
    let str = ''
    switch (viewMode) {
      case FullViewModeEnum.Day:
        str = '日视图'
        break
      case FullViewModeEnum.Week:
        str = '周视图'
        break
      case FullViewModeEnum.Year:
        str = '年视图'
        break
      default:
        break
    }
    return str
  }, [viewMode])
  const currentText = useMemo(() => {
    let str = ''
    switch (viewMode) {
      case FullViewModeEnum.Day:
        str = I18N.common.todayWord
        break
      case FullViewModeEnum.Week:
        str = '本周'
        break
      case FullViewModeEnum.Year:
        str = '本年'
        break
      default:
        break
    }
    return str
  }, [viewMode])
  const viewList = [
    {
      key: FullViewModeEnum.Day,
      name: '日'
    },
    {
      key: FullViewModeEnum.Week,
      name: '周'
    }
    // {
    //   key: FullViewModeEnum.Year,
    //   name: '年'
    // }
  ]

  const [showArrow, setShowArrow] = useState(false)
  const handleOpenChange = (newOpen: boolean) => {
    setShowArrow(newOpen)
  }

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
          setSvgContainerClientWidth={setSvgContainerClientWidth}
        />

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
                {currentText}
              </div>
            )}
          </div>
        )}
        {taskHeaderWidth && (
          <Popover
            content={() => (
              <div className={styles.viewContent}>
                {viewList.map((_) => {
                  return (
                    <div
                      key={_.key}
                      className={styles.viewItem}
                      onClick={() => {
                        setView(_.key)
                        setShowArrow(false)
                      }}
                      style={{
                        background: _.key === viewMode ? '#F8F8F8' : ''
                      }}
                    >
                      <span>{_.name}</span>
                      {_.key === viewMode && <ArrowSelect></ArrowSelect>}
                    </div>
                  )
                })}
              </div>
            )}
            trigger="click"
            open={showArrow}
            arrow={false}
            onOpenChange={handleOpenChange}
          >
            <div className={styles.changeView}>
              <div className={styles.currentView}>{viewText}</div>
              {showArrow ? <ArrowUp></ArrowUp> : <ArrowDown></ArrowDown>}
            </div>
          </Popover>
        )}
        {barTasks && barTasks.length > 0 && (
          <div
            className={styles.leftList}
            style={{
              left: `${isChecked ? taskHeaderWidth || taskListWidth : 40}px`,
              top: '76px'
            }}
            ref={leftRef}
          >
            {barTasks.map((_) => {
              return (
                <div
                  key={_.task_id}
                  className={styles.leftItem}
                  onClick={() => {
                    setScrollX(_.x1 - columnWidth)
                  }}
                >
                  <GanttLeft
                    style={{ display: _.x1 < scrollX ? 'block' : 'none' }}
                  ></GanttLeft>
                </div>
              )
            })}
          </div>
        )}
        {barTasks && barTasks.length > 0 && (
          <div
            className={styles.rightList}
            style={{
              top: '74px'
            }}
            ref={rightRef}
          >
            {barTasks.map((_) => {
              return (
                <div key={_.task_id} className={styles.leftItem}>
                  <GanttRight
                    style={{
                      display:
                        _.x2 > svgContainerClientWidth + scrollX
                          ? 'block'
                          : 'none'
                    }}
                    onClick={() => {
                      setScrollX(_.x2 - svgContainerClientWidth + columnWidth)
                    }}
                  ></GanttRight>
                </div>
              )
            })}
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
