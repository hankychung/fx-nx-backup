import React from 'react'
import { BizApi } from '@flyele-nx/service'
import styles from './schedule-list.module.scss'
import { useMemoizedFn } from 'ahooks'
import { useScheduleStore } from './utils/useScheduleStore'
import { ScheduleTask } from './components/schedule-task'
import { getKey } from './utils'

interface ScheduleListProps {
  date: string
}

const _ScheduleList: React.FC<ScheduleListProps> = ({ date }) => {
  const initDate = useScheduleStore((state) => state.initDate)
  const list = useScheduleStore((state) => state.schedule[date])

  const initList = useMemoizedFn(() => {
    BizApi.getScheduleList({ type: 'today', day: date }).then((res) => {
      console.log('bizres', res)

      initDate({ date, list: res.data?.schedule || [] })
    })
  })

  return (
    <div className={styles['container']}>
      <span onClick={initList}>init</span>
      <span>{date}</span>

      <div>
        {(list || []).map((i) => (
          <ScheduleTask data={i} date={date} key={getKey(i)} />
        ))}
      </div>
    </div>
  )
}

export const ScheduleList = React.memo(_ScheduleList)
