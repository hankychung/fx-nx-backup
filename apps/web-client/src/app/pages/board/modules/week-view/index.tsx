import {
  IScheduleListRef,
  ListHandler,
  ScheduleList
} from '@flyele-nx/service-module'

export const WeekView = () => {
  return (
    <ScheduleList
      date={'2023-11-23'}
      isFinished
      // scheduleType="WEEKLY"
    />
  )
}
