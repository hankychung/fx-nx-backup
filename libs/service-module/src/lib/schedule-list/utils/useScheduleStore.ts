import { create } from 'zustand'
import { IScheduleTask } from '@flyele-nx/service'
import { produce } from 'immer'

interface IState {
  schedule: { [k: string]: IScheduleTask[] }
}

const useScheduleStore = create<
  IState & {
    initDate: (options: { date: string; list: IScheduleTask[] }) => void
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
