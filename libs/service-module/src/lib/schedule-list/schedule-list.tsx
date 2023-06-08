import React, { useEffect, useRef } from 'react'
import { BizApi } from '@flyele-nx/service'
import styles from './schedule-list.module.scss'
import { useMemoizedFn } from 'ahooks'
import { useScheduleStore } from './utils/useScheduleStore'
import { ScheduleTask } from './components/schedule-task'
import InfiniteScroll from 'react-infinite-scroller'
import dayjs from 'dayjs'

interface ScheduleListProps {
  date: string
}

const _ScheduleList: React.FC<ScheduleListProps> = ({ date }) => {
  const list = useScheduleStore((state) => state.schedule[date])
  const finishList = useScheduleStore((state) => state.finishSchedule[date])

  const isInit = useRef(false)
  const pageRef = useRef(1)
  const finishPageRef = useRef(1)

  const updateList = useScheduleStore((state) => state.updateList)
  const updateTask = useScheduleStore((state) => state.updateTask)

  const reload = useMemoizedFn(() => {
    pageRef.current = 1
    finishPageRef.current = 1
    fetchList()
    fetchList({ finish: true })
  })

  const fetchList = useMemoizedFn(async (options?: { finish?: boolean }) => {
    const res = await BizApi.getScheduleList({
      type: 'today',
      day: date,
      pageNumber: pageRef.current,
      queryType: options?.finish ? 3 : 1
    })

    const list = res.data?.schedule || []

    const keys: string[] = []

    list.forEach((item) => {
      const { ref_task_id, repeat_id, finish_time } = item

      // 循环事项且已经完成, 以taskId + repeatId为key
      const key =
        repeat_id && finish_time ? `${ref_task_id}-${repeat_id}` : ref_task_id

      updateTask({ key, task: item })

      keys.push(key)
    })

    const pRef = options?.finish ? finishPageRef : pageRef

    updateList({
      date,
      list: keys,
      isInit: pRef.current === 1,
      isFinished: options?.finish
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
    <>
      <div className={styles['container']}>
        <span>{date}</span>

        <InfiniteScroll
          loadMore={() => {
            fetchList()
          }}
          useWindow={false}
          hasMore
          initialLoad={false}
          className={styles.scroller}
        >
          {(list || []).map((i) => (
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

      <div className={styles['container']}>
        <div>已完成</div>
        <InfiniteScroll
          loadMore={() => {
            fetchList({ finish: true })
          }}
          useWindow={false}
          hasMore
          initialLoad={false}
          className={styles.scroller}
        >
          {(finishList || []).map((i) => (
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
    </>
  )
}

export const ScheduleList = React.memo(_ScheduleList)
