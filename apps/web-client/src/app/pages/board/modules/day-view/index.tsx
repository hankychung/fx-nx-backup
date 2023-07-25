import { FC } from 'react'
import { AllScheduleList } from '@flyele-nx/service-module'
import { timeGetter } from '@flyele-nx/utils'
import dayjs from 'dayjs'

export const DayView: FC = () => {
  return (
    <div>
      <AllScheduleList
        date={dayjs.unix(timeGetter.getDateRoughly()).format('YYYY-MM-DD')}
      />
    </div>
  )
}
