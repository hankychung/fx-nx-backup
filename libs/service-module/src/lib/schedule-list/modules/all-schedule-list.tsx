import React, {
  useEffect,
  forwardRef,
  useImperativeHandle,
  ForwardRefRenderFunction,
  useMemo,
  useState,
  useRef,
  useContext
} from 'react'
import styles from '../schedule-list.module.scss'
import { useMemoizedFn } from 'ahooks'
import { ScheduleTask } from '../components/schedule-task'
import dayjs from 'dayjs'
import { ListHandler } from '../utils/listHandler'
import classNames from 'classnames'
import { ScheduleListProps, IScheduleListRef } from '../types'
import { FinishNumBtn } from '../components/finish-num-btn'
import { useScheduleList } from '../utils/hooks/useScheduleList'
import { EmptyData } from '../components/empty-data'
import { IInitTodayList, initTodayList } from '../utils/initTodayList'
import { useCurTime } from '@flyele-nx/utils'

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
    isFinished,
    isVipWin = false,
    isBoard,
    overlayClassName,
    isDarkMode,
    opacity
  },
  ref
) => {
  const {
    list,
    finishList,
    loading,
    setLoading,
    isError,
    setIsError,
    finishTotal
  } = useScheduleList({
    date
  })

  const [showFinished, setShowFinished] = useState(false)
  const curTime = useCurTime({ needRefresh: true })

  const isInit = useRef(true)

  const reloaderId = useMemo(
    () => date + isFinished + isBoard,
    [date, isFinished, isBoard]
  )

  const onToggleShowFinished = useMemoizedFn((show: boolean) => {
    setShowFinished(!show)
  })

  const fetchList = useMemoizedFn(async (params: IInitTodayList) => {
    if (loading) return

    if (isInit.current) {
      setLoading(true)
      isInit.current = false
    }

    const res = await initTodayList(params)

    setLoading(false)

    return res
  })

  const reload = useMemoizedFn(async (params?: IInitTodayList) => {
    try {
      return await fetchList(params ? { ...params, date } : { date })
    } catch {
      setIsError(true)
    }
  })

  useEffect(() => {
    ListHandler.collectReloader(reloaderId, reload)

    return () => {
      ListHandler.removeReloader(reloaderId)
    }
  }, [reload, reloaderId, date])

  useImperativeHandle(ref, () => {
    return {
      reload: () => {
        console.log('主动reload', date)

        return reload()
      }
    }
  })

  return (
    <div className={classNames(styles['container'], overlayClassName)}>
      {(list ?? []).map((i) => (
        // curTime 应该读取后端的，参考原来的代码 app/utils/timeGetter.ts
        <ScheduleTask
          date={date}
          key={i}
          taskKey={i}
          topId={i}
          curTime={curTime.unix()}
          isVipWin={isVipWin}
          isBoard={isBoard}
          isDarkMode={isDarkMode}
          opacity={opacity}
        />
      ))}

      {!list?.length && (
        <EmptyData
          isError={isError}
          listType={isFinished ? 'COMPLETE' : 'NORMAL'}
          isBoard={!!isBoard}
          noTask={!finishList?.length}
          allFinished={!!finishTotal}
          loading={loading}
          date={date}
        />
      )}
      <FinishNumBtn
        show={showFinished}
        count={finishTotal}
        isDarkMode={isDarkMode}
        onToggleShow={onToggleShowFinished}
        opacityModal={opacity}
      />
      {showFinished &&
        (finishList || []).map((i) => (
          // curTime 应该读取后端的，参考原来的代码 app/utils/timeGetter.ts
          <ScheduleTask
            date={date}
            key={i}
            taskKey={i}
            topId={i}
            curTime={curTime.unix()}
            isVipWin={isVipWin}
            isBoard={isBoard}
            isDarkMode={isDarkMode}
            opacity={opacity}
          />
        ))}
    </div>
  )
}

export const AllScheduleList = React.memo(forwardRef(_AllScheduleList))
