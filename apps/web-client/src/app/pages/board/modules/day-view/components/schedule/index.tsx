import { AllScheduleList } from '@flyele-nx/service-module'
import dayjs from 'dayjs'
import { FC, memo, useContext, useMemo } from 'react'
import style from './index.module.scss'
import { SelectDateCtx } from '../../context/select-date'

const _Schedule: FC = () => {
  const { selectedDate } = useContext(SelectDateCtx)

  const date = useMemo(
    () => dayjs.unix(selectedDate).format('YYYY-MM-DD'),
    [selectedDate]
  )

  return (
    <div className={style.schedule}>
      <AllScheduleList isBoard={true} date={date} />
    </div>
  )
}

export const Schedule = memo(_Schedule)
