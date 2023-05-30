import styles from './schedule-list.module.scss'

/* eslint-disable-next-line */
export interface ScheduleListProps {}

export function ScheduleList(props: ScheduleListProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to ScheduleList!</h1>
    </div>
  )
}

export default ScheduleList
