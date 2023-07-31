import { useScheduleStore } from '@flyele-nx/zustand-store'

export const useNxStore = () => {
  const todayFinishCount = useScheduleStore((state) => state.todayFinishCount)

  return {
    todayFinishCount
  }
}
