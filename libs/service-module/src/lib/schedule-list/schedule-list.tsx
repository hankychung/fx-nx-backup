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
import { Draggable, DraggingStyle, NotDraggingStyle } from 'react-beautiful-dnd'

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

  const isInit = useRef(true)

  const isFinished = useMemo(() => {
    const curTime = timeGetter.getDateRoughly()
    return _isFinished || dayjs.unix(curTime).isAfter(dayjs(date), 'date')
  }, [_isFinished, date])

  const decentList = useMemo(() => {
    return isFinished ? finishList : list
  }, [finishList, isFinished, list])

  const reloaderId = useRef(date + isFinished + isBoard)

  const fetchList = useMemoizedFn(async () => {
    if (loading) return undefined

    if (isInit.current) {
      setLoading(true)
    }

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
      return await fetchList()
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
    if (isInit.current) {
      isInit.current = false

      reload()
    }
  }, [reload])

  const getItemStyle = (
    _isDragging: boolean,
    draggableStyle: DraggingStyle | NotDraggingStyle | undefined
  ): React.CSSProperties => ({
    // some basic styles to make the items look a bit nicer
    userSelect: 'none',
    background: _isDragging
      ? 'linear-gradient(180deg, #EDEDED 0%, rgba(237, 237, 237, 0.5) 100%)'
      : 'transparent',

    // styles we need to apply on draggables
    ...draggableStyle
  })

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
          {decentList.map((i, index) => (
            // curTime 应该读取后端的，参考原来的代码 app/utils/timeGetter.ts
            <Draggable
              // isDragDisabled={fa}
              key={i}
              draggableId={i}
              index={index}
            >
              {(provided, snapshot) => (
                <div
                  className={styles.group}
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  // {...provided.dragHandleProps}
                  style={getItemStyle(
                    snapshot.isDragging,
                    provided.draggableProps.style
                  )}
                >
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
                </div>
              )}
            </Draggable>
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
          date={date}
        />
      )}
    </div>
  )
}

export const ScheduleList = React.memo(forwardRef(_ScheduleList))
