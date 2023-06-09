import React, { FC, memo, useMemo, CSSProperties } from 'react'
import { shallow } from 'zustand/shallow'
import { TaskApi, ScheduleTaskConst } from '@flyele-nx/service'
import { useScheduleStore } from '../../utils/useScheduleStore'
import { getChildrenDict } from '../../utils'
import { StatusBox } from '../../../status-box'
import styles from './index.module.scss'
import expandStyles from './components/expand/index.module.scss'
import { useMemoizedFn } from 'ahooks'
import cs from 'classnames'
import { isHighlight } from '../../utils/tools'
import dayjs from 'dayjs'
import { TopMostIcon } from '@flyele-nx/icon'
import { FlyTextTooltip } from '@flyele/flyele-components'
import { Follow } from './components/follow'
import { ScheduleType } from './components/schedule-type'
import { Expand } from './components/expand'
import { Indent } from './components/indent'

interface IProps {
  taskKey: string
  date: string
  topId: string
  curTime: number // 当前时间, 今天的时间
  isDarkMode?: boolean
  style?: CSSProperties
}

const _ScheduleTask: FC<IProps> = ({
  taskKey,
  date,
  topId,
  curTime,
  isDarkMode,
  style
}) => {
  const _data = useScheduleStore((state) => state.taskDict[taskKey])
  const dataWithoutRepeatId = useScheduleStore(
    (state) => state.taskDict[taskKey.split('-')[0]]
  )

  const data = _data || dataWithoutRepeatId

  const children = useScheduleStore((state) => state.childrenDict[taskKey])
  const isExpanded = useScheduleStore((state) => {
    const dict = state.expandedDict[date]

    if (!dict) return false

    return Boolean(dict[taskKey])
  })

  // 记录是否为卡片顶级事项
  const isTopTask = topId === taskKey

  // 只有今日，周，小挂件有置顶
  // 目前它的逻辑和是否显示菜单是包含的
  // isShowMenu 的相关逻辑可等后面数据再看
  // const isTopMost = !!data?.topmost_at && !data?.finish_time && isShowMenu
  const isTopMost = !!data?.topmost_at && !data?.finish_time

  const { updateExpandedDict, batchUpdateChildDict, updateTask } =
    useScheduleStore(
      (state) => ({
        updateTask: state.updateTask,
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

      tasks.forEach((child) => {
        updateTask({
          key: child.ref_task_id,
          task: {
            ...child,
            has_child: Boolean(childrenDict[child.ref_task_id])
          }
        })
      })

      batchUpdateChildDict(childrenDict)
    }

    updateExpandedDict({ date, taskId: taskKey, isExpanded: !isExpanded })
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

        {/*<Workflow taskId={taskId} />*/}

        {/*<ParentInfo taskId={taskId} />*/}

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
                  {data.has_child ? (
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

              <div className={styles.info}>
                <div className={styles.infoMain}>
                  <div className={styles.singleLine}>
                    {/*<Time taskId={taskId} date={date} />*/}
                    {/*<Takers taskId={taskId} />*/}
                    {/*<Tags task={task} taskId={taskId} />*/}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {children && isExpanded && (
        <div>
          {children.map((i) => (
            <ScheduleTask
              date={date}
              key={i}
              taskKey={i}
              topId={taskKey}
              curTime={curTime}
              isDarkMode={isDarkMode}
              style={style}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export const ScheduleTask = memo(_ScheduleTask)
