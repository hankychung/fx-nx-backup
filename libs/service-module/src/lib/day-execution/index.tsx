import React, { useState, useMemo, useRef, useEffect } from 'react'
import styles from './index.module.scss'
import { useMemoizedFn, useMount } from 'ahooks'
import { IScheduleTask, TaskApi } from '@flyele-nx/service'
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

interface IProps {
  date: number
  onShow?: (show: boolean) => void
  onMount?: () => void
  rootClassName?: string
}

const _DayExecution = ({ date, onShow, onMount, rootClassName }: IProps) => {
  const [total, setTotal] = useState<number>(0) // 事项总数
  const [completeTotal, setCompleteTotal] = useState<number>(0) //已完成
  const [dayList, setDayList] = useState<IScheduleTask[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [show, setShow] = useState(false)
  const isFetchFinished = useRef<boolean>(false)

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

      setTotal(total || 0)
      setCompleteTotal(complete_total || 0)
      if (data.length) {
        if (reset) {
          setDayList(data)
        } else {
          setDayList((prevState) => {
            return [...prevState, ...data]
          })
        }
        if (data.length < pageRecord.current) {
          isFetchFinished.current = true
        }
        ExecutionHandler.updateTasks(data)
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
    setDayList([])
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
    return disposalTodayList(dayList.sort((a, b) => b.create_at - a.create_at))
  }, [dayList])

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
