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
import dayjs from 'dayjs'
import { ListHandler } from './utils/listHandler'
import classNames from 'classnames'
import { ScheduleListProps, IScheduleListRef } from './types'
import { useScheduleList } from './utils/hooks/useScheduleList'
import { EmptyData } from './components/empty-data'
import { globalNxController } from '@flyele-nx/global-processor'
import { QueryType } from '@flyele-nx/sql-store'
import { Draggable } from 'react-beautiful-dnd'
import { timeGetter } from '@flyele-nx/utils'

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
    isDarkMode,
    opacity,
    scheduleType
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

    const { keys, repeatDict } = batchUpdateTask(list, { isFinished })

    if (!isFinished) {
      ListHandler.updateDateRepeatDict({ date, repeatDict })
    }

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

  return (
    <div
      className={classNames(styles['container'], overlayClassName)}
      style={{ backgroundColor: isDarkMode ? 'unset' : '#F6F8FA' }}
    >
      {(decentList ?? []).length ? (
        <>
          {decentList.map((i, index) =>
            // curTime 应该读取后端的，参考原来的代码 app/utils/timeGetter.ts
            scheduleType === 'WEEKLY' ? (
              <Draggable key={i} draggableId={`${i}-${date}`} index={index}>
                {(provided, snapshot) => (
                  <ScheduleTask
                    date={date}
                    key={i}
                    taskKey={i}
                    topId={i}
                    curTime={dayjs().unix()}
                    isVipWin={isVipWin}
                    isBoard={isBoard}
                    isDarkMode={isDarkMode}
                    style={provided.draggableProps.style}
                    dragProvided={provided}
                    opacity={opacity}
                    scheduleType={scheduleType}
                  />
                )}
              </Draggable>
            ) : (
              <ScheduleTask
                date={date}
                key={i}
                taskKey={i}
                topId={i}
                curTime={dayjs().unix()}
                isVipWin={isVipWin}
                isBoard={isBoard}
                isDarkMode={isDarkMode}
                opacity={opacity}
              />
            )
          )}
        </>
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
