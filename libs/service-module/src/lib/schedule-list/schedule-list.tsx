import React, {
  useEffect,
  useRef,
  forwardRef,
  useImperativeHandle,
  ForwardRefRenderFunction
} from 'react'
import { BizApi } from '@flyele-nx/service'
import styles from './schedule-list.module.scss'
import { useMemoizedFn } from 'ahooks'
import { useScheduleStore } from '../store/useScheduleStore'
import { ScheduleTask } from './components/schedule-task'
import InfiniteScroll from 'react-infinite-scroller'
import dayjs from 'dayjs'

interface ScheduleListProps {
  date: string
  isFinished?: boolean
  getFinishListTotal?: (total: number) => void
}

interface IScheduleListRef {
  reload: () => Promise<void>
}

const _ScheduleList: ForwardRefRenderFunction<
  IScheduleListRef,
  ScheduleListProps
> = ({ date, isFinished, getFinishListTotal }, ref) => {
  const list = useScheduleStore((state) => state.schedule[date])
  const finishList = useScheduleStore((state) => state.finishSchedule[date])

  const decentList = isFinished ? finishList : list

  const isInit = useRef(false)
  const pageRef = useRef(1)
  const finishPageRef = useRef(1)

  const updateList = useScheduleStore((state) => state.updateList)
  const batchUpdateTask = useScheduleStore((state) => state.batchUpdateTask)

  const reload = useMemoizedFn(async () => {
    pageRef.current = 1
    finishPageRef.current = 1
    await fetchList()
  })

  useImperativeHandle(ref, () => {
    return {
      reload
    }
  })

  const fetchList = useMemoizedFn(async () => {
    const res = await BizApi.getScheduleList({
      type: 'today',
      day: date,
      pageNumber: pageRef.current,
      queryType: isFinished ? 3 : 1
    })

    const list = res.data?.schedule || []

    getFinishListTotal?.(res.data?.schedule_complete_total || 0)

    const { keys } = batchUpdateTask(list)

    const pRef = isFinished ? finishPageRef : pageRef

    updateList({
      date,
      list: keys,
      isInit: pRef.current === 1,
      isFinished
    })

    pRef.current += 1
  })

  useEffect(() => {
    if (!isInit.current) {
      isInit.current = true

      reload()
    }
  }, [reload])

  return (
    <div className={styles['container']}>
      <InfiniteScroll
        loadMore={fetchList}
        useWindow={false}
        hasMore
        initialLoad={false}
        className={styles.scroller}
      >
        {(decentList || []).map((i) => (
          // curTime 应该读取后端的，参考原来的代码 app/utils/timeGetter.ts
          <ScheduleTask
            date={date}
            key={i}
            taskKey={i}
            topId={i}
            curTime={dayjs().unix()}
          />
        ))}
      </InfiniteScroll>
    </div>
  )
}

export const ScheduleList = React.memo(forwardRef(_ScheduleList))

export { IScheduleListRef }
