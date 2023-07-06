import { useScheduleStore } from '../store/useScheduleStore'

export const useNxStore = () => {
  const todayFinishCount = useScheduleStore((state) => state.todayFinishCount)

  console.log('NX innser count', todayFinishCount)

  return {
    todayFinishCount
  }
}
