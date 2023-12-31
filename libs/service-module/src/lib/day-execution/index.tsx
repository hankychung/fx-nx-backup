import { I18N, isCN } from '@flyele-nx/i18n'
import React, { useState, useMemo, useEffect } from 'react'
import styles from './index.module.scss'
import { useMemoizedFn, useMount, useUpdateEffect } from 'ahooks'
import dayjs from 'dayjs'
import cs from 'classnames'
import { Progress } from 'antd'
import InfiniteScroll from 'react-infinite-scroller'
import { Loading } from '@flyele-nx/ui'
import { disposalTodayList } from './utils'
import { TimelineTaskList } from './components/timeline-task-list'
import { Nodata } from './components/no-data'
import { ExecutionHandler } from '../schedule-list/utils/executionHandler'
import { useScheduleStore } from '@flyele-nx/global-processor'
import { emitter } from '@flyele-nx/utils'
import { CircleArrowUp } from '@flyele-nx/icon'

interface IProps {
  date: number
  onShow?: (show: boolean) => void
  onMount?: () => void
  rootClassName?: string
  subtractHeight?: number
  manualInitInMount?: boolean
}

const _DayExecution = ({
  date,
  onShow,
  onMount,
  rootClassName,
  subtractHeight = 0,
  manualInitInMount = false
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

  const doInit = useMemoizedFn(() => {
    !!day && init()
  })

  /**
   * 内容区样式
   */
  const contentStyle = useMemo(() => {
    return {
      height: show ? `calc(100vh - ${subtractHeight}px)` : 0,
      display: show ? 'block' : 'none'
    }
  }, [subtractHeight, show])

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
        tTimeTxt: I18N.common.completed,
        taskItems: list.sort(
          (a, b) =>
            (b.finish_time || b.create_at) - (a.finish_time || a.create_at)
        )
      }
    ]
  }, [day, taskDict, todayCompletedExecution])

  // 切换日期刷新列表
  useUpdateEffect(() => {
    doInit()
  }, [day])

  useEffect(() => {
    if (onShow) {
      onShow(show)
    }
  }, [onShow, show])

  useMount(() => {
    if (onMount) {
      onMount()
    }
    if (manualInitInMount) {
      doInit()
    }
    emitter.on('cacheWorkerInited', () => {
      doInit()
    })
  })

  return (
    <div className={cs(styles.dayExecutionRoot, rootClassName)}>
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <div className={styles.text}>
            {`${I18N.common.today_schedule}:${isCN ? '' : ' '}`}
            {taskTotal ? `${completeTotal}/${taskTotal}` : I18N.common.none}
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
              {`${I18N.common.residue}:`}
              <span className={styles.total}>{total}</span>
            </>
          )}
          <div
            className={cs(styles.arrowIcon, { [styles.arrowIconUp]: show })}
            onClick={() => setShow((show) => !show)}
          >
            <CircleArrowUp width={17} height={17} />
          </div>
        </div>
      </div>
      <div className={styles.content} style={contentStyle}>
        {taskTotal ? (
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
                {loading && <Loading text={I18N.common.loading2} top={10} />}
              </InfiniteScroll>
            </div>
            {show && (
              <div className={styles.footer}>
                <div
                  className={styles.hideBtn}
                  onClick={() => setShow((show) => !show)}
                >
                  {I18N.common.fold}
                  <div
                    className={cs(styles.arrowIcon, {
                      [styles.arrowIconUp]: show
                    })}
                  >
                    <CircleArrowUp width={17} height={17} />
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
