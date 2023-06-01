import { create } from 'zustand'
import { ISchedule } from '@flyele-nx/service'
import { produce } from 'immer'

interface IState {
  schedule: { [k: string]: ISchedule[] }
}

const useScheduleStore = create<
  IState & {
    initDate: (options: { date: string; list: ISchedule[] }) => void
  }
>((set) => {
  return {
    schedule: {},
    initDate({ date, list }) {
      set(
        produce((state: IState) => {
          state.schedule[date] = list
        })
      )
    }
  }
})

export { useScheduleStore }
