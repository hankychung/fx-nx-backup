import React, { useEffect, useRef } from 'react'
import { BizApi } from '@flyele-nx/service'
import styles from './schedule-list.module.scss'
import { useMemoizedFn } from 'ahooks'
import { useScheduleStore } from './utils/useScheduleStore'
import { ScheduleTask } from './components/schedule-task'
import InfiniteScroll from 'react-infinite-scroller'

interface ScheduleListProps {
  date: string
}

const _ScheduleList: React.FC<ScheduleListProps> = ({ date }) => {
  const updateList = useScheduleStore((state) => state.updateList)
  const updateTask = useScheduleStore((state) => state.updateTask)
  const isInit = useRef(false)

  const pageRef = useRef(1)

  const reload = useMemoizedFn(() => {
    pageRef.current = 1
    fetchList()
  })

  useEffect(() => {
    if (!isInit.current) {
      isInit.current = true

      reload()
    }
  }, [reload])

  const list = useScheduleStore((state) => state.schedule[date])

  const fetchList = useMemoizedFn(async () => {
    const res = await BizApi.getScheduleList({
      type: 'today',
      day: date,
      pageNumber: pageRef.current
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

    updateList({ date, list: keys })

    pageRef.current += 1
  })

  return (
    <div className={styles['container']}>
      <span>{date}</span>

      <InfiniteScroll
        loadMore={fetchList}
        useWindow={false}
        hasMore
        initialLoad={false}
        className={styles.scroller}
      >
        {(list || []).map((i) => (
          <ScheduleTask date={date} key={i} taskKey={i} />
        ))}
      </InfiniteScroll>
    </div>
  )
}

export const ScheduleList = React.memo(_ScheduleList)
