import React, { useState, useMemo, useRef, useEffect } from 'react'
import styles from './index.module.scss'
import { useMemoizedFn, useMount } from 'ahooks'
import { TaskApi } from '@flyele-nx/service'
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
}

const _DayExecution = ({ date, onShow, onMount, rootClassName }: IProps) => {
  const [loading, setLoading] = useState<boolean>(false)
  const [show, setShow] = useState(false)
  const isFetchFinished = useRef<boolean>(false)

  const todayExecution = useScheduleStore((state) => state.todayExecution)
  const { total, completeTotal } = useScheduleStore(
    (state) => state.todayExecutionCount
  ).todayExecutionCount
  const updateTodayExecutionList = useScheduleStore(
    (state) => state.updateTodayExecutionList
  )
  const updateTodayExecutionCount = useScheduleStore(
    (state) => state.updateTodayExecutionCount
  )

  const pageNumber = useRef(1)
  const pageRecord = useRef(20)

  /**
   * 列表事项日期
   */
  const day = useMemo(
    () => date && dayjs.unix(date).format('YYYY-MM-DD'),
    [date]
  )

  /**
   * 获取列表
   */
  const fetchDayList = useMemoizedFn(async (reset = false) => {
    if (loading || day === 0 || isFetchFinished.current) return
    setLoading(true)

    if (reset) {
      pageNumber.current = 1
    } else {
      pageNumber.current++
    }

    try {
      const { complete_total, total, data } = await TaskApi.getToDayTask({
        day,
        pageNumber: pageNumber.current,
        pageRecord: pageRecord.current
      })

      updateTodayExecutionCount({
        date: day,
        data: {
          completeTotal: complete_total || 0,
          total: total || 0
        }
      })
      if (data.length) {
        updateTodayExecutionList({
          date: day,
          list: data,
          isInit: reset,
          isFinished: false
        })
        ExecutionHandler.updateTasks(data)
        if (data.length < pageRecord.current) {
          isFetchFinished.current = true
        }
      } else {
        isFetchFinished.current = true
      }
    } catch (e) {
      console.error('获取日程列表失败', e)
    } finally {
      setLoading(false)
    }
  })

  /**
   * 初始化
   */
  const init = useMemoizedFn(() => {
    isFetchFinished.current = false
    fetchDayList(true)
  })

  /**
   * 事项总数 = 待处理事项 + 已完成事项
   */
  const taskTotal = useMemo(() => total + completeTotal, [total, completeTotal])

  /**
   * 整理今日的数据
   * 用于渲染
   **/
  const todayList = useMemo(() => {
    const list = todayExecution[day] || []
    return disposalTodayList(list)
  }, [day, todayExecution])

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
      <div className={cs(styles.content, { [styles.contentHide]: !show })}>
        {total ? (
          <>
            <div className={styles.scroller}>
              <InfiniteScroll
                hasMore={true}
                useWindow={false}
                initialLoad={false}
                loadMore={() => fetchDayList(false)}
                className={styles.timelineTaskListRoot}
              >
                {day !== 0 && (
                  <TimelineTaskList timeList={todayList} day={day} />
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
