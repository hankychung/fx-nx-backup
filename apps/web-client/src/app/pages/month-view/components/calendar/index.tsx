import React, { useMemo } from 'react'
import style from './index.module.scss'
import dayjs from 'dayjs'
import { generateMonthArr } from '../../utils/generateMonthArr'
import { Cell } from '../cell'
import classNames from 'classnames'

const Calendar: React.FC = () => {
  const monthArr = useMemo(() => {
    return generateMonthArr(dayjs())
  }, [])

  return (
    <div className={classNames(style.calendar, 'calendar-wrapper')}>
      {monthArr.map((row, index) => (
        <div key={index} className={style.row}>
          {row.map((cell) => {
            const date = cell.format('YYYY-MM-DD')

            return <Cell date={date} key={date} />
          })}
        </div>
      ))}
    </div>
  )
}

export { Calendar }
