import { BizApi } from '@flyele-nx/service'
import styles from './schedule-list.module.scss'
import { useMemoizedFn } from 'ahooks'
import { useScheduleStore } from './utils/useScheduleStore'

interface ScheduleListProps {
  date: string
}

export function ScheduleList({ date }: ScheduleListProps) {
  const initDate = useScheduleStore((state) => state.initDate)
  const list = useScheduleStore((state) => state.schedule[date])

  const initList = useMemoizedFn(() => {
    BizApi.getScheduleList({ type: 'today', day: date }).then((res) => {
      console.log('bizres', res)
      const list = res.data?.schedule || []

      initDate({ date, list })
    })
  })

  return (
    <div className={styles['container']} onClick={initList}>
      <span>init</span>
      <span>{date}</span>

      <div>
        {(list || []).map((i) => (
          <div key={i.ref_task_id + (i.repeat_id || '')}>{i.title}</div>
        ))}
      </div>
    </div>
  )
}
