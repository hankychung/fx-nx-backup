import React, {
  useEffect,
  useRef,
  forwardRef,
  useImperativeHandle,
  ForwardRefRenderFunction,
  useMemo
} from 'react'
import { BizApi } from '@flyele-nx/service'
import styles from './schedule-list.module.scss'
import { useMemoizedFn } from 'ahooks'
import { ScheduleTask } from './components/schedule-task'
import InfiniteScroll from 'react-infinite-scroller'
import dayjs from 'dayjs'
import { ListHandler } from './utils/listHandler'
import timeGetter from '../global/timeGetter'
import classNames from 'classnames'
import { ScheduleListProps, IScheduleListRef } from './types'
import { useScheduleList } from './utils/hooks/useScheduleList'
import { EmptyData } from './components/empty-data'

const _ScheduleList: ForwardRefRenderFunction<
  IScheduleListRef,
  ScheduleListProps
> = (
  {
    date,
    isFinished: _isFinished,
    isVipWin = false,
    isBoard,
    getFinishListTotal,
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
    pageRecord,
    pageRef,
    finishPageRef,
    loading,
    setLoading,
    pageFetchFinished,
    setPageFetchFinished,
    finishPageFetchFinished,
    setFinishPageFetchFinished,
    isError,
    setIsError,
    finishTotal,
    setFinishTotal
  } = useScheduleList({
    date
  })

  const isInit = useRef(false)

  const isFinished = useMemo(() => {
    const curTime = timeGetter.getDateRoughly()
    return _isFinished || dayjs.unix(curTime).isAfter(dayjs(date), 'date')
  }, [_isFinished, date])

  const decentList = useMemo(() => {
    return isFinished ? finishList : list
  }, [finishList, isFinished, list])

  const reloaderId = useRef(date + isFinished + isBoard)

  const fetchList = useMemoizedFn(async () => {
    if (loading) return
    setLoading(true)

    const pRef = isFinished ? finishPageRef : pageRef
    const fetchFinishedRef = isFinished
      ? finishPageFetchFinished
      : pageFetchFinished

    if (fetchFinishedRef) {
      console.log(`${isFinished ? '已完成' : '未完成'}事项列表已经加载完成`)
      return
    }

    const res = await BizApi.getScheduleList({
      type: 'today',
      day: date,
      pageRecord: pageRecord.current,
      pageNumber: pRef.current,
      queryType: isFinished ? 3 : 1
    })

    const list = res.data?.schedule || []

    getFinishListTotal?.(res.data?.schedule_complete_total || 0)

    setFinishTotal(res.data?.schedule_complete_total || 0)

    const { keys } = batchUpdateTask(list, { isFinished })

    updateList({
      date,
      list: keys,
      isInit: pRef.current === 1,
      isFinished
    })

    if (list.length < pageRecord.current) {
      isFinished ? setFinishPageFetchFinished(true) : setPageFetchFinished(true)
    } else {
      pRef.current += 1
    }

    setLoading(false)
  })

  const reload = useMemoizedFn(async () => {
    pageRef.current = 1
    finishPageRef.current = 1
    setPageFetchFinished(false)
    setFinishPageFetchFinished(false)
    try {
      await fetchList()
    } catch (error) {
      setIsError(true)
    }
  })

  useEffect(() => {
    const id = reloaderId.current

    ListHandler.collectReloader(id, reload)

    return () => {
      ListHandler.removeReloader(id)
    }
  }, [reload])

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

  return (
    <div
      className={classNames(styles['container'], overlayClassName)}
      style={{ backgroundColor: isDarkMode ? 'unset' : '#f4f4f4' }}
    >
      {(decentList ?? []).length ? (
        <InfiniteScroll
          loadMore={fetchList}
          useWindow={false}
          hasMore
          initialLoad={false}
          className={styles.scroller}
        >
          {decentList.map((i) => (
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
        </InfiniteScroll>
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
    </div>
  )
}

export const ScheduleList = React.memo(forwardRef(_ScheduleList))
