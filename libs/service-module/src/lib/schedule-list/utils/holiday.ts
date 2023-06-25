import { useHolidayStore } from '../../store/useHolidayStore'

/**
 * 获取节假日
 * */
export const getHoliday = async () => {
  const storeData = useHolidayStore.getState().holidayValue

  return {
    ...storeData
  }
}
