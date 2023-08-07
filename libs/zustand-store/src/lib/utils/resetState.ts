import { initContact, useContactStore } from '../useContactStore'
import { initHoliday, useHolidayStore } from '../useHolidayStore'
import { initSchedule, useScheduleStore } from '../useScheduleStore'
import { initUserInfo, useUserInfoStore } from '../useUserInfoStore'
import { initGanttState, useGanttStore } from '../useGanttStore'

export const resetState = () => {
  useScheduleStore.setState(initSchedule)
  useContactStore.setState(initContact)
  useHolidayStore.setState(initHoliday)
  useUserInfoStore.setState(initUserInfo)
  useGanttStore.setState(initGanttState)
}
