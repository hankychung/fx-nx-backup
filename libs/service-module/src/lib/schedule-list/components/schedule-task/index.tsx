import {
  FC,
  memo,
  useMemo,
  CSSProperties,
  PropsWithChildren,
  useRef,
  MouseEvent
} from 'react'
import { shallow } from 'zustand/shallow'
import { TaskApi } from '@flyele-nx/service'
import { useScheduleStore } from '@flyele-nx/global-processor'
import { getChildrenDict, getKey } from '../../utils'
import { StatusBox } from '../../../status-box'
import styles from './index.module.scss'
import expandStyles from './components/expand/index.module.scss'
import { useMemoizedFn, useHover } from 'ahooks'
import cs from 'classnames'
import { isHighlight } from '../../utils/tools'
import dayjs from 'dayjs'
import { TopMostIcon } from '@flyele-nx/icon'
import { FlyTextTooltip } from '@flyele/flyele-components'
import { Follow } from './components/follow'
import { ScheduleType } from './components/schedule-type'
import { Expand } from './components/expand'
import { Indent } from './components/indent'
import { Workflow } from './components/workflow'
import { ParentInfo } from './components/parentInfo'
import { Time } from './components/time'
import { Tags } from './components/tags'
import { Takers } from './components/takers'
import { MenuBtn } from './components/menu/components/btn'
import { useMenuActions } from './components/menu/hooks/useMenuActions'
import { ChildrenTask } from './children-task'
import { TaskHandler, contextMenuTool } from '../../../../index'
import { globalNxController } from '@flyele-nx/global-processor'
import {
  MatterType,
  QuadrantValue,
  Enter_page_detail
} from '@flyele-nx/constant'
import { changeCompleteState } from '../../../status-box/utils'

export interface IProps {
  taskKey: string
  date: string
  topId: string
  curTime: number // 当前时间, 今天的时间
  isDarkMode?: boolean
  style?: CSSProperties
  isSimple?: boolean
  isVipWin?: boolean // 是否小挂件窗体
  isBoard?: boolean
  isTimeLine?: boolean
  dragProvided?: any
  opacity?: boolean
  scheduleType?: 'WEEKLY'
}

const _ScheduleTask: FC<PropsWithChildren<IProps>> = ({
  taskKey,
  date,
  topId,
  curTime,
  isDarkMode,
  style,
  isSimple = false,
  isVipWin = false,
  isBoard = false,
  isTimeLine = false,
  dragProvided = {},
  opacity,
  scheduleType
}) => {
  const domRef = useRef<HTMLDivElement>(null)

  const rawData = useScheduleStore((state) => state.taskDict[taskKey])

  const allRepeatData = useScheduleStore((state) => state.dateRepeatDict)

  const d = allRepeatData[date] || {}

  const repeatData = rawData.finish_time ? undefined : d[taskKey]

  // 整合符合当前日期下的循环周期
  const data = useMemo(() => {
    if (!repeatData) {
      return rawData
    }

    const { cycle, cycle_date } = repeatData

    return {
      ...rawData,
      cycle,
      cycle_date
    }
  }, [rawData, repeatData])

  const children = useScheduleStore((state) => state.childrenDict[taskKey])
  const isExpanded = useScheduleStore((state) => {
    const dict = state.expandedDict[date]

    if (!dict) return false

    return Boolean(dict[taskKey])
  })

  const changeStatus = useMemoizedFn(() => {
    TaskHandler.batchModify({
      keys: [data.ref_task_id],
      keysWithRepeatIds: [getKey(data)],
      diff: {
        finish_time: data.finish_time ? 0 : dayjs().unix(),
        state: changeCompleteState(data.state)
      }
    })
  })

  const { updateExpandedDict, batchUpdateChildDict, batchUpdateTask } =
    useScheduleStore(
      (state) => ({
        batchUpdateTask: state.batchUpdateTask,
        updateExpandedDict: state.updateExpandedDict,
        batchUpdateChildDict: state.batchUpdateChildDict
      }),
      shallow
    )

  const isHovering = useHover(domRef)

  if (!data) {
    console.error('taskKey not found', taskKey, useScheduleStore.getState())
  }

  // 记录是否为卡片顶级事项
  const isTopTask = useMemo(() => {
    return topId === taskKey
  }, [taskKey, topId])

  // 右键的锚点, 只有自己的事项
  // 团队卡片没有右键
  // 事项分组没有右键
  // 如果以后还有其他条件的话往这上面拼
  const isShowMenu = useMemo(() => {
    return ![MatterType.timeCollect, MatterType.calendar].includes(
      data.matter_type
    )
  }, [data.matter_type])

  // 只有今日，周，小挂件有置顶
  // 目前它的逻辑和是否显示菜单是包含的
  const isTopMost = useMemo(() => {
    return !!data?.topmost_at && !data?.finish_time && isShowMenu && isTopTask
  }, [data?.finish_time, data?.topmost_at, isShowMenu, isTopTask])

  const isFollow = useMemo(() => {
    const value = data?.is_follow || data?.has_follow
    return !!value
  }, [data?.has_follow, data?.is_follow])

  const { menuActions } = useMenuActions({ data, isVipWin, isTopTask })

  const toggleOpen = useMemoizedFn(async () => {
    if (!data) return

    const { ref_task_id } = data

    if (!isExpanded) {
      const { data: tasks } = await TaskApi.getScheduleTree({
        taskId: ref_task_id
      })

      // TODO: 中台查询子事项数据有偏差, 调用旧借口处理
      // const queryChildren = await globalNxController.getDayView({
      //   parentId: `${data.parent_id ? `${data.parent_id},` : ''}${ref_task_id}`
      // })

      // console.log('@querychildren', queryChildren, tasks)

      const childrenDict = getChildrenDict({
        tasks,
        originalId: ref_task_id
      })

      // 更新事项字典
      batchUpdateTask(
        tasks.map((child) => ({
          ...child,
          has_child: Boolean(childrenDict[child.ref_task_id])
        }))
      )

      batchUpdateChildDict(childrenDict)
    }

    updateExpandedDict({ date, taskId: taskKey, isExpanded: !isExpanded })
  })

  /**
   * 打开右键菜单
   */
  const handleContextMenu = useMemoizedFn(
    (event: MouseEvent<HTMLDivElement>) => {
      event.preventDefault()
      event.stopPropagation()

      if (!isShowMenu) return

      contextMenuTool.open({
        x: event.clientX,
        y: event.clientY,
        action: menuActions
      })
    }
  )

  const onClickTask = useMemoizedFn((e: MouseEvent) => {
    e.stopPropagation()

    /**
     * 如果存在右键菜单，先把菜单关闭了，因为上面阻止冒泡了，所以触发不了关闭右键菜单
     */
    const contextMenuVisible = contextMenuTool.getVisible()
    if (contextMenuVisible) {
      contextMenuTool.close()
      return
    }

    globalNxController.openTaskDetailWindow({
      task: data,
      enterPage: Enter_page_detail.日程列表
    })
  })

  const isToday = useMemo(() => {
    if (date) {
      const selectedDate = dayjs(date).unix()
      return dayjs.unix(selectedDate).isSame(dayjs.unix(curTime), 'date')
    }
    return false
  }, [curTime, date])

  // 是否提醒，只判断当天顶级事项
  const isRemind = useMemo(() => {
    return Boolean(
      isTopTask && isToday && !data.finish_time && isHighlight(data, curTime)
    )
  }, [curTime, data, isToday, isTopTask])

  const priorityLevelClass = useMemo(() => {
    switch (data?.priority_level) {
      case QuadrantValue.important_urgent: {
        return styles.ImportantUrgent
      }
      case QuadrantValue.important_no_urgent: {
        return styles.ImportantNoUrgent
      }
      case QuadrantValue.urgent_no_important: {
        return styles.UrgentNoImportant
      }
      default:
        return ''
    }
  }, [data?.priority_level])

  if (!data) return null
  return (
    <div
      ref={dragProvided ? dragProvided.innerRef : undefined}
      {...dragProvided.draggableProps}
      {...dragProvided.dragHandleProps}
      className={cs(styles.scheduleTaskRoot, {
        [styles.boardSchedule]: isBoard,
        [styles.priorityLevel]: isTopTask,
        [priorityLevelClass]: isTopTask,
        [styles.finish]: !!data?.finish_time,
        [styles.darkMode]: isDarkMode
      })}
      style={{
        backgroundColor: opacity
          ? isDarkMode
            ? 'rgba(59, 62, 75, 0.1)'
            : 'rgba(255, 255, 255, 0.1)'
          : isDarkMode
          ? '#3b3e4b'
          : '#fff',
        ...style
      }}
      data-id={taskKey}
      onContextMenu={handleContextMenu}
      onClick={onClickTask}
    >
      <div
        ref={domRef}
        className={cs({
          [styles.topHover]: !isTimeLine && !opacity,
          [styles.darkModeHover]: isDarkMode && !opacity,
          [styles.opacityHover]: opacity,
          [styles.remind]: isRemind,
          [styles.complexSchedulePadding]: !isBoard && !isTimeLine,
          [styles.boardSchedulePadding]: isBoard,
          [styles.timeLineSchedule]: isTimeLine
        })}
      >
        {/* 2.1 pc-4745加入日程置顶 */}
        {isTopMost && (
          <div className={styles.iconTop}>
            <TopMostIcon width={10} height={10} />
          </div>
        )}

        {!isSimple && !isTimeLine && (
          <Workflow
            taskId={taskKey}
            opacity={opacity}
            isDarkMode={isDarkMode}
          />
        )}

        {(!isSimple || isTimeLine) && (
          <ParentInfo
            taskId={taskKey}
            isDarkMode={isDarkMode}
            opacity={opacity}
          />
        )}

        <div className={styles.scheduleInfo}>
          <Indent task={data} isTopTask={isTopTask || isTimeLine} />
          <div className={styles.wrapper}>
            <StatusBox
              task={data}
              isVipWin={isVipWin}
              changeStatus={changeStatus}
            />
            <div className={styles.main}>
              <div className={styles.head}>
                <div
                  className={styles.headLeft}
                  style={{
                    color: opacity
                      ? isDarkMode
                        ? 'rgba(255, 255, 255, 0.8)'
                        : 'rgba(51, 51, 51, 0.8)'
                      : ''
                  }}
                >
                  <FlyTextTooltip
                    mountNode={() => document.body}
                    isDynamic
                    wrapClassName={cs(styles.title, {
                      [styles.titleDarkMode]: isDarkMode && !opacity
                    })}
                    text={data.title || ''}
                  />
                  <Follow isFollow={isFollow} />
                </div>
                <div className={styles.headRight}>
                  <ScheduleType matterType={data.matter_type} />
                  {data.has_child && !data.finish_time && !isTimeLine ? (
                    <Expand
                      task={data}
                      isExpanded={isExpanded}
                      toggleOpen={toggleOpen}
                      isDarkMode={isDarkMode}
                    />
                  ) : (
                    <div className={expandStyles.nullChild} />
                  )}
                </div>
              </div>

              {(!isSimple || isTimeLine) && (
                <div className={styles.info}>
                  <div className={styles.infoMain}>
                    <div
                      className={
                        isBoard ? styles.singleLine : styles.reverseSort
                      }
                    >
                      <Time
                        taskId={taskKey}
                        curTime={curTime}
                        dateStr={date}
                        isDarkMode={isDarkMode}
                        isTimeLine={isTimeLine}
                        opacity={opacity}
                      />
                      {!isBoard && !isTimeLine && (
                        <Tags
                          taskId={taskKey}
                          wrapClassName={styles.tags}
                          isBoard={isBoard}
                          isVipSmallTool={isVipWin}
                        />
                      )}
                      {!isTimeLine && (
                        <Takers
                          taskId={taskKey}
                          isDarkMode={isDarkMode}
                          isVipWin={isVipWin}
                          isBoard={isBoard}
                          opacity={opacity}
                        />
                      )}
                      {isBoard && !isTimeLine && (
                        <Tags
                          taskId={taskKey}
                          wrapClassName={styles.tags}
                          isBoard={isBoard}
                          isVipSmallTool={isVipWin}
                        />
                      )}
                    </div>
                  </div>
                  {isShowMenu && (
                    <MenuBtn
                      visible={isHovering}
                      isDarkMode={isDarkMode}
                      openMenu={handleContextMenu}
                    />
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {children && isExpanded && !isTimeLine && (
        <div>
          {children.map((i) => (
            <ChildrenTask
              key={i}
              date={date}
              taskKey={i}
              topId={taskKey}
              curTime={curTime}
              isDarkMode={isDarkMode}
              style={style}
              isVipWin={isVipWin}
              opacity={opacity}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export const ScheduleTask = memo(_ScheduleTask)
