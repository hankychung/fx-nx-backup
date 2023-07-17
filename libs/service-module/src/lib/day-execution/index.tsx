import React, { useState, useMemo, useEffect } from 'react'
import styles from './index.module.scss'
import { useMemoizedFn, useMount } from 'ahooks'
import dayjs from 'dayjs'
import cs from 'classnames'
import { Progress } from 'antd'
import { CircleArrowUpIcon } from '@flyele-nx/icon'
import InfiniteScroll from 'react-infinite-scroller'
import { Loading } from '@flyele-nx/ui'
import { disposalTodayList } from './utils'
import { TimelineTaskList } from './components/timeline-task-list'
import { Nodata } from './components/no-data'
import { ExecutionHandler } from '../schedule-list/utils/executionHandler'
import { useScheduleStore } from '../store/useScheduleStore'

interface IProps {
  date: number
  onShow?: (show: boolean) => void
  onMount?: () => void
  rootClassName?: string
  contentHeight?: number
}

const _DayExecution = ({
  date,
  onShow,
  onMount,
  rootClassName,
  contentHeight = 0
}: IProps) => {
  const [loading, setLoading] = useState<boolean>(false)
  const [show, setShow] = useState(false)

  const taskDict = useScheduleStore((state) => state.taskDict)
  const todayExecution = useScheduleStore((state) => state.todayExecution)
  const todayCompletedExecution = useScheduleStore(
    (state) => state.todayCompletedExecution
  )
  const todayExecutionCount = useScheduleStore(
    (state) => state.todayExecutionCount
  )

  /**
   * 列表事项日期
   */
  const day = useMemo(
    () => date && dayjs.unix(date).format('YYYY-MM-DD'),
    [date]
  )

  /**
   * 获取列表
   * 未完成 和 已完成
   */
  const fetchDayList = useMemoizedFn(async (isFinished = false) => {
    if (loading || day === 0) return
    setLoading(true)

    try {
      ExecutionHandler.day = day
      await ExecutionHandler.getList({ isFinished })
    } catch (e) {
      console.error('获取日程列表失败', e)
    } finally {
      setLoading(false)
    }
  })

  /**
   * 初始化
   */
  const init = useMemoizedFn(async () => {
    await fetchDayList()
    await fetchDayList(true)
  })

  /**
   * 内容区样式
   */
  const contentStyle = useMemo(() => {
    return {
      height: show ? `calc(100% - ${contentHeight}px)` : 0
    }
  }, [contentHeight, show])

  /**
   * 统计数量
   */
  const total = useMemo(() => {
    return todayExecutionCount[day]?.total || 0
  }, [day, todayExecutionCount])

  const completeTotal = useMemo(() => {
    return todayExecutionCount[day]?.completeTotal || 0
  }, [day, todayExecutionCount])

  /**
   * 事项总数 = 待处理事项 + 已完成事项
   */
  const taskTotal = useMemo(() => total + completeTotal, [total, completeTotal])

  /**
   * 整理今日的数据
   * 用于渲染
   **/
  const todayList = useMemo(() => {
    const idList = todayExecution[day] || []
    const list = idList.map((id) => taskDict[id])

    console.log('@check today', idList, taskDict)

    return disposalTodayList(list)
  }, [day, taskDict, todayExecution])

  /**
   * 整理今日已完成的数据
   * 用于渲染
   */
  const todayCompletedList = useMemo(() => {
    const idList = todayCompletedExecution[day] || []
    const list = idList.map((id) => taskDict[id])

    return [
      {
        tTime: 0,
        tTimeTxt: '已完成',
        taskItems: list.sort((a, b) => a.create_at - b.create_at)
      }
    ]
  }, [day, taskDict, todayCompletedExecution])

  // 切换日期刷新列表
  useEffect(() => {
    !!day && init()
  }, [day, init])

  useEffect(() => {
    if (onShow) {
      onShow(show)
    }
  }, [onShow, show])

  useMount(() => {
    if (onMount) {
      onMount()
    }
  })

  return (
    <div className={cs(styles.dayExecutionRoot, rootClassName)}>
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <div className={styles.text}>
            当日事项：
            {taskTotal ? `${completeTotal}/${taskTotal}` : '无'}
          </div>
          {!!taskTotal && (
            <Progress
              style={{
                width: '77px',
                marginBottom: 0
              }}
              strokeColor="#1DD2C1"
              percent={(completeTotal / taskTotal) * 100}
              size="small"
              showInfo={false}
            />
          )}
        </div>
        <div className={styles.headerRight}>
          {!!taskTotal && (
            <>
              剩余：
              <span className={styles.total}>{total}</span>
            </>
          )}
          <div
            className={cs(styles.arrowIcon, { [styles.arrowIconUp]: show })}
            onClick={() => setShow((show) => !show)}
          >
            <CircleArrowUpIcon width={17} height={17} />
          </div>
        </div>
      </div>
      <div className={cs(styles.content)} style={contentStyle}>
        {total ? (
          <>
            <div className={styles.scroller}>
              <InfiniteScroll
                className={styles.timelineTaskListRoot}
                hasMore={false}
                useWindow={false}
                initialLoad={false}
                loadMore={() => {
                  // do nothing
                }}
              >
                {day !== 0 && (
                  <>
                    {todayList.length > 0 ? (
                      <TimelineTaskList timeList={todayList} day={day} />
                    ) : (
                      <Nodata total={taskTotal} />
                    )}
                    <TimelineTaskList
                      timeList={todayCompletedList}
                      day={day}
                      showTimeText={false}
                    />
                  </>
                )}
                {loading && <Loading text="正在加载" top={10} />}
              </InfiniteScroll>
            </div>
            {show && (
              <div className={styles.footer}>
                <div className={styles.hideBtn}>
                  收起
                  <div
                    className={cs(styles.arrowIcon, {
                      [styles.arrowIconUp]: show
                    })}
                    onClick={() => setShow((show) => !show)}
                  >
                    <CircleArrowUpIcon width={17} height={17} />
                  </div>
                </div>
              </div>
            )}
          </>
        ) : (
          <Nodata total={taskTotal} />
        )}
      </div>
    </div>
  )
}

export const DayExecution = React.memo(_DayExecution)
