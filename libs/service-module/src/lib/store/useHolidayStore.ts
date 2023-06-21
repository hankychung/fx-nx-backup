import { create } from 'zustand'
import { IHoliday, ScheduleTaskConst } from '@flyele-nx/service'

export interface IState {
  holidayValue: {
    all: IHoliday[]
    realHolidays: IHoliday[]
    dutyHoliday: IHoliday[]
  }
}

interface IMutation {
  updateData: (data: IHoliday[]) => void
}

const useHolidayStore = create<IState & IMutation>((set) => {
  return {
    /**
     *  接口返回的全部数据
     */
    holidayValue: {
      all: [],
      realHolidays: [],
      dutyHoliday: []
    },

    updateData(data) {
      // 去掉补班的假期, 真放假的时候。
      const realHolidays = data.filter(
        (item) => item.state === ScheduleTaskConst.HolidayState.FURLOUGH
      )
      // 补班
      const dutyHoliday = data.filter(
        (item) => item.state === ScheduleTaskConst.HolidayState.DUTY
      )

      set((state) => ({
        holidayValue: {
          all: data,
          realHolidays: realHolidays,
          dutyHoliday: dutyHoliday
        }
      }))
    }
  }
})

export { useHolidayStore }
