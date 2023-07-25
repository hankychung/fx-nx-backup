import { FC } from 'react'
import { AllScheduleList } from '@flyele-nx/service-module'
import { timeGetter } from '@flyele-nx/utils'
import dayjs from 'dayjs'
import style from './index.module.scss'

export const DayView: FC = () => {
  return (
    <div className={style.dayview}>
      <AllScheduleList
        date={dayjs.unix(timeGetter.getDateRoughly()).format('YYYY-MM-DD')}
      />
    </div>
  )
}
