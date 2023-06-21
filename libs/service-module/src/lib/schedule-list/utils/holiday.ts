import { useHolidayStore } from '../../store/useHolidayStore'
import dayjs from 'dayjs'
import { ScheduleTaskConst, TaskApi } from '@flyele-nx/service'

/**
 * 获取节假日
 * */
export const getHoliday = async () => {
  const storeData = useHolidayStore.getState().holidayValue

  if (!storeData || storeData.all.length === 0) {
    const updateData = useHolidayStore.getState().updateData
    const year = dayjs().get('year')
    const { data } = await TaskApi.getHoliday(year)
    updateData(data)
    // 去掉补班的假期, 真放假的时候。
    const realHolidays = data.filter(
      (item) => item.state === ScheduleTaskConst.HolidayState.FURLOUGH
    )
    // 补班
    const dutyHoliday = data.filter(
      (item) => item.state === ScheduleTaskConst.HolidayState.DUTY
    )

    return {
      all: data,
      realHolidays: realHolidays,
      dutyHoliday: dutyHoliday
    }
  }

  return {
    ...storeData
  }
}
