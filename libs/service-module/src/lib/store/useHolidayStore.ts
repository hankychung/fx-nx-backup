import { create } from 'zustand'
import { IHoliday } from '@flyele-nx/types'
import { HolidayState } from '@flyele-nx/constant'

export interface IHolidayState {
  holidayValue: {
    all: IHoliday[]
    realHolidays: IHoliday[]
    dutyHoliday: IHoliday[]
  }
}

interface IMutation {
  updateData: (data: IHoliday[]) => void
}

const initHoliday = {
  /**
   *  接口返回的全部数据
   */
  holidayValue: {
    all: [],
    realHolidays: [],
    dutyHoliday: []
  }
}

const useHolidayStore = create<IHolidayState & IMutation>((set) => {
  return {
    ...initHoliday,

    updateData(data) {
      // 去掉补班的假期, 真放假的时候。
      const realHolidays = data.filter(
        (item) => item.state === HolidayState.FURLOUGH
      )
      // 补班
      const dutyHoliday = data.filter(
        (item) => item.state === HolidayState.DUTY
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

export { useHolidayStore, initHoliday }
