import React, {
  useEffect,
  useRef,
  forwardRef,
  useImperativeHandle,
  ForwardRefRenderFunction,
  useMemo,
  useState
} from 'react'
import { QueryType } from '@flyele-nx/sql-store'
// import { BizApi } from '@flyele-nx/service'
import styles from '../schedule-list.module.scss'
import { useMemoizedFn, useUpdateEffect } from 'ahooks'
import { ScheduleTask } from '../components/schedule-task'
import InfiniteScroll from 'react-infinite-scroller'
import dayjs from 'dayjs'
import { ListHandler } from '../utils/listHandler'
import classNames from 'classnames'
import { ScheduleListProps, IScheduleListRef } from '../types'
import { FinishNumBtn } from '../components/finish-num-btn'
import { useScheduleList } from '../utils/hooks/useScheduleList'
import { EmptyData } from '../components/empty-data'
import { globalNxController } from '../../global/nxController'
import { useScheduleStore } from '../../store/useScheduleStore'

/**
 * 请求全部未完成和已完成事项的列表
 * 先请求 未完成
 * 未完成列表结束后 再请求 已完成
 */
const _AllScheduleList: ForwardRefRenderFunction<
  IScheduleListRef,
  ScheduleListProps
> = (
  {
    date,
    isFinished: _isFinished,
    isVipWin = false,
    isBoard,
    overlayClassName,
    isDarkMode
  },
  ref
) => {
  const {
    list,
    finishList,
    updateList,
    batchUpdateTask,
    loading,
    setLoading,
    pageFetchFinished,
    isError,
    setIsError,
    finishTotal
  } = useScheduleList({
    date
  })

  const isInit = useRef(false)

  const [showFinished, setShowFinished] = useState(false)

  const isFinished = useMemo(() => {
    return pageFetchFinished
  }, [pageFetchFinished])

  const reloaderId = useMemo(
    () => date + isFinished + isBoard,
    [date, isFinished, isBoard]
  )

  const onToggleShowFinished = useMemoizedFn((show: boolean) => {
    setShowFinished(!show)
  })

  const fetchList = useMemoizedFn(async () => {
    if (loading) return
    setLoading(true)

    const tasks =
      (
        await globalNxController.getDayView({
          day: date,
          queryType: QueryType.participate
        })
      ).data || []

    const { keys } = batchUpdateTask(tasks, { isFinished: false })

    updateList({
      date,
      list: keys,
      isInit: true,
      isFinished: false
    })

    const finishTasks =
      (
        await globalNxController.getDayView({
          day: date,
          queryType: QueryType.completed
        })
      ).data || []

    const { keys: finishKeys } = batchUpdateTask(finishTasks, {
      isFinished: true
    })

    updateList({
      date,
      list: finishKeys,
      isInit: true,
      isFinished: true
    })

    useScheduleStore.setState({
      todayFinishCount: finishTasks.length || 0
    })

    setLoading(false)
  })

  const reload = useMemoizedFn(async () => {
    try {
      await fetchList()
    } catch {
      setIsError(true)
    }
  })

  useEffect(() => {
    ListHandler.collectReloader(reloaderId, reload)

    return () => {
      ListHandler.removeReloader(reloaderId)
    }
  }, [reload, reloaderId])

  useImperativeHandle(ref, () => {
    return {
      reload
    }
  })

  useEffect(() => {
    if (!isInit.current) {
      isInit.current = true

      reload()
    }
  }, [reload])

  useUpdateEffect(() => {
    // 日期改变重载
    reload()
  }, [date])

  return (
    <div className={classNames(styles['container'], overlayClassName)}>
      <InfiniteScroll
        loadMore={() => {
          // do nothing
        }}
        useWindow={false}
        hasMore
        initialLoad={false}
        className={styles.scroller}
      >
        {(list ?? []).map((i) => (
          // curTime 应该读取后端的，参考原来的代码 app/utils/timeGetter.ts
          <ScheduleTask
            date={date}
            key={i}
            taskKey={i}
            topId={i}
            curTime={dayjs().unix()}
            isVipWin={isVipWin}
            isBoard={isBoard}
            isDarkMode={isDarkMode}
          />
        ))}

        {!!finishTotal && pageFetchFinished ? (
          <>
            <FinishNumBtn
              show={showFinished}
              count={finishTotal}
              isDarkMode={isDarkMode}
              onToggleShow={onToggleShowFinished}
            />
            {showFinished &&
              (finishList || []).map((i) => (
                // curTime 应该读取后端的，参考原来的代码 app/utils/timeGetter.ts
                <ScheduleTask
                  date={date}
                  key={i}
                  taskKey={i}
                  topId={i}
                  curTime={dayjs().unix()}
                  isVipWin={isVipWin}
                  isBoard={isBoard}
                  isDarkMode={isDarkMode}
                />
              ))}
          </>
        ) : (
          <EmptyData
            isError={isError}
            listType={isFinished ? 'COMPLETE' : 'NORMAL'}
            isBoard={!!isBoard}
            noTask={!finishList?.length && !list?.length}
            allFinished={!!finishTotal && !list?.length}
            loading={loading}
          />
        )}
      </InfiniteScroll>
    </div>
  )
}

export const AllScheduleList = React.memo(forwardRef(_AllScheduleList))
