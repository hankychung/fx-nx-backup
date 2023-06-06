import React from 'react'
import { BizApi } from '@flyele-nx/service'
import styles from './schedule-list.module.scss'
import { useMemoizedFn } from 'ahooks'
import { useScheduleStore } from './utils/useScheduleStore'
import { ScheduleTask } from './components/schedule-task'

interface ScheduleListProps {
  date: string
}

const _ScheduleList: React.FC<ScheduleListProps> = ({ date }) => {
  const initList = useScheduleStore((state) => state.initList)
  const updateTask = useScheduleStore((state) => state.updateTask)

  const list = useScheduleStore((state) => state.schedule[date])

  const fetchList = useMemoizedFn(() => {
    BizApi.getScheduleList({ type: 'today', day: date }).then((res) => {
      console.log('bizres', res)

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

      initList({ date, list: keys })
    })
  })

  return (
    <div className={styles['container']}>
      <span onClick={fetchList}>init</span>
      <span>{date}</span>

      <div>
        {(list || []).map((i) => (
          <ScheduleTask date={date} key={i} taskKey={i} />
        ))}
      </div>
    </div>
  )
}

export const ScheduleList = React.memo(_ScheduleList)
