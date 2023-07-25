import { AllScheduleList } from '@flyele-nx/service-module'
import { timeGetter } from '@flyele-nx/utils'
import dayjs from 'dayjs'
import { FC, memo } from 'react'
import style from './index.module.scss'

const _Schedule: FC = () => {
  return (
    <div className={style.schedule}>
      <AllScheduleList
        date={dayjs.unix(timeGetter.getDateRoughly()).format('YYYY-MM-DD')}
      />
    </div>
  )
}

export const Schedule = memo(_Schedule)
