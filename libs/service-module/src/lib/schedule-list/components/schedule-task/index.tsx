import React, {
  FC,
  memo,
  useMemo,
  CSSProperties,
  PropsWithChildren,
  useRef
} from 'react'
import { shallow } from 'zustand/shallow'
import { TaskApi, ScheduleTaskConst } from '@flyele-nx/service'
import { useScheduleStore } from '../../../store/useScheduleStore'
import { getChildrenDict } from '../../utils'
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
import { contextMenuTool } from '../../../../index'

export interface IProps {
  taskKey: string
  date: string
  topId: string
  curTime: number // 当前时间, 今天的时间
  userId: string
  isDarkMode?: boolean
  style?: CSSProperties
  isSimple?: boolean
}

const _ScheduleTask: FC<PropsWithChildren<IProps>> = ({
  taskKey,
  date,
  topId,
  curTime,
  userId,
  isDarkMode,
  style,
  isSimple = false
}) => {
  const domRef = useRef<HTMLDivElement>(null)
  const data = useScheduleStore((state) => state.taskDict[taskKey])

  const children = useScheduleStore((state) => state.childrenDict[taskKey])
  const isExpanded = useScheduleStore((state) => {
    const dict = state.expandedDict[date]

    if (!dict) return false

    return Boolean(dict[taskKey])
  })

  const isHovering = useHover(domRef)

  const { menuActions } = useMenuActions({ data, userId })

  // 记录是否为卡片顶级事项
  const isTopTask = topId === taskKey

  // 右键的锚点, 只有自己的事项 && 顶级事项卡片才有右键
  // 团队卡片没有右键
  // 事项分组没有右键
  // 如果以后还有其他条件的话往这上面拼
  const isShowMenu = useMemo(() => {
    return ![
      ScheduleTaskConst.MatterType.timeCollect,
      ScheduleTaskConst.MatterType.calendar
    ].includes(data.matter_type)
  }, [data.matter_type])

  // 只有今日，周，小挂件有置顶
  // 目前它的逻辑和是否显示菜单是包含的
  const isTopMost = !!data?.topmost_at && !data?.finish_time && isShowMenu

  const { updateExpandedDict, batchUpdateChildDict, batchUpdateTask } =
    useScheduleStore(
      (state) => ({
        batchUpdateTask: state.batchUpdateTask,
        updateExpandedDict: state.updateExpandedDict,
        batchUpdateChildDict: state.batchUpdateChildDict
      }),
      shallow
    )

  const toggleOpen = useMemoizedFn(async () => {
    if (!data) return

    const { ref_task_id } = data

    const shouldRequest =
      !isExpanded && !useScheduleStore.getState().childrenDict[ref_task_id]

    if (shouldRequest) {
      const { data: tasks } = await TaskApi.getScheduleTree({
        taskId: ref_task_id
      })

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
    (event: React.MouseEvent<HTMLDivElement>) => {
      if (!isShowMenu) return

      event.preventDefault()
      event.stopPropagation()
      const parentRect = domRef.current?.getBoundingClientRect()
      if (!parentRect) return
      const x = event.clientX - parentRect.left || 0
      const y = event.clientY - parentRect.top || 0

      contextMenuTool.open({
        x,
        y,
        action: menuActions
      })
    }
  )

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
      case ScheduleTaskConst.QuadrantValue.important_urgent: {
        return styles.ImportantUrgent
      }
      case ScheduleTaskConst.QuadrantValue.important_no_urgent: {
        return styles.ImportantNoUrgent
      }
      case ScheduleTaskConst.QuadrantValue.urgent_no_important: {
        return styles.UrgentNoImportant
      }
      default:
        return ''
    }
  }, [data?.priority_level])

  if (!data) return null

  return (
    <div
      ref={domRef}
      className={cs(styles.scheduleTaskRoot, styles.boardSchedule, {
        [styles.priorityLevel]: isTopTask,
        [priorityLevelClass]: isTopTask,
        [styles.finish]: !!data?.finish_time,
        [styles.darkMode]: isDarkMode
      })}
      style={{
        background: isDarkMode ? '#3b3e4b' : '#fff',
        ...style
      }}
      data-id={taskKey}
      onContextMenu={handleContextMenu}
    >
      <div
        className={cs(styles.topHover, styles.boardSchedulePadding, {
          [styles.darkModeHover]: isDarkMode,
          [styles.remind]: isRemind
        })}
      >
        {/* 2.1 pc-4745加入日程置顶 */}
        {isTopMost && (
          <div className={styles.iconTop}>
            <TopMostIcon width={10} height={10} />
          </div>
        )}

        {!isSimple && <Workflow taskId={taskKey} />}

        {!isSimple && <ParentInfo taskId={taskKey} isDarkMode />}

        <div className={styles.scheduleInfo}>
          <Indent task={data} isTopTask={isTopTask} />
          <div className={styles.wrapper}>
            <StatusBox task={data} />
            <div className={styles.main}>
              <div className={styles.head}>
                <div className={styles.headLeft}>
                  <FlyTextTooltip
                    mountNode={() => document.body}
                    isDynamic
                    wrapClassName={cs(styles.title, {
                      [styles.titleDarkMode]: isDarkMode
                    })}
                    text={data.title || ''}
                  />
                  <Follow isFollow={data?.is_follow || data?.has_follow} />
                </div>
                <div className={styles.headRight}>
                  <ScheduleType matterType={data.matter_type} />
                  {data.has_child && !data.finish_time ? (
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

              {!isSimple && (
                <div className={styles.info}>
                  <div className={styles.infoMain}>
                    <div className={styles.singleLine}>
                      <Time
                        taskId={taskKey}
                        curTime={curTime}
                        userId={userId}
                        dateStr={date}
                        isDarkMode={isDarkMode}
                      />
                      <Takers
                        taskId={taskKey}
                        userId={userId}
                        isDarkMode={isDarkMode}
                      />
                      <Tags taskId={taskKey} userId={userId} />
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
      {children && isExpanded && (
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
              userId={userId}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export const ScheduleTask = memo(_ScheduleTask)
