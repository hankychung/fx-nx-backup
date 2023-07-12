import React, {
  useEffect,
  useRef,
  forwardRef,
  useImperativeHandle,
  ForwardRefRenderFunction,
  useMemo
} from 'react'
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
import { globalNxController } from '../global/nxController'
import { QueryType } from '@flyele-nx/sql-store'

const _ScheduleList: ForwardRefRenderFunction<
  IScheduleListRef,
  ScheduleListProps
> = (
  {
    date,
    isFinished: _isFinished,
    isVipWin = false,
    isBoard,
    // getFinishListTotal,
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
    isError,
    setIsError,
    finishTotal
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

    const r = await globalNxController.getDayView({
      day: date,
      queryType: isFinished ? QueryType.completed : QueryType.participate
    })

    const list = r.data.list || []

    const { keys } = batchUpdateTask(list, { isFinished })

    updateList({
      date,
      list: keys,
      isInit: true,
      isFinished
    })

    setLoading(false)
  })

  const reload = useMemoizedFn(async () => {
    try {
      await fetchList()
    } catch (error) {
      console.error(error)
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
          loadMore={() => {
            // do nothing
          }}
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
