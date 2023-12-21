import { useHolidayStore } from '@flyele-nx/global-processor'

/**
 * 获取节假日
 * */
export const getHoliday = () => {
  const storeData = useHolidayStore.getState().holidayValue

  return {
    ...storeData
  }
}
