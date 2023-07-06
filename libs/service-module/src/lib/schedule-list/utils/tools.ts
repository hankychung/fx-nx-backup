import { IScheduleTask } from '@flyele-nx/service'
import dayjs from 'dayjs'
import timeGetter from '../../global/timeGetter'

export function isHighlight(item: IScheduleTask, curTime: number) {
  const { start_time, execute_at, end_time = 0 } = item

  const startTime = execute_at || start_time || 0

  const endTime = startTime > end_time ? 0 : end_time

  const diff = 60 * 5

  return (
    (startTime && curTime >= startTime - diff && curTime <= startTime + diff) ||
    (endTime && curTime >= endTime - diff && curTime <= endTime)
  )
}

export function getDateOfToday() {
  return dayjs.unix(timeGetter.getDateRoughly()).format('YYYY-MM-DD')
}
