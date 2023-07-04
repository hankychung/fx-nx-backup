import { useScheduleStore } from '../store/useScheduleStore'

export const useNxStore = () => {
  const todayFinishCount = useScheduleStore((state) => state.todayFinishCount)

  return {
    todayFinishCount
  }
}
