import { FC, useMemo, useState } from 'react'
import style from './index.module.scss'
import { Schedule } from './components/schedule'
import { TodayInfo } from './components/today-info'
import { TaskCreator } from './components/task-creator'
import { SelectDateCtx } from './context/select-date'
import { CurTimeContext } from './context/current-time'
import { timeGetter, useCurTime } from '@flyele-nx/utils'
import { useMount } from 'ahooks'
import dayjs from 'dayjs'

export const DayView: FC = () => {
  const defaultDate = timeGetter.getDateRoughly()
  const [selectedDate, setSelectedDate] = useState(defaultDate)

  const curTime = useCurTime({ needRefresh: true })

  const selectDateCtx = useMemo(() => {
    return {
      selectedDate,
      handleSelectDate: setSelectedDate
    }
  }, [selectedDate])

  useMount(async () => {
    const curTime = await timeGetter.getDate()

    setSelectedDate(dayjs(dayjs.unix(curTime).format('YYYY-M-D')).unix())
  })

  return (
    <CurTimeContext.Provider value={curTime.unix()}>
      <div className={style.dayview}>
        {/* left */}
        <div className={style.lft}>
          <SelectDateCtx.Provider value={selectDateCtx}>
            <TodayInfo />
            <TaskCreator />
            <Schedule />
          </SelectDateCtx.Provider>
        </div>

        {/* right */}
        <div>rgt</div>
      </div>
    </CurTimeContext.Provider>
  )
}
