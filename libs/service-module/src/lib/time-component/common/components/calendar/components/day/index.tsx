import React from 'react'
import { ITimeDay } from '@flyele-nx/types'
import { Dayjs } from 'dayjs'
import cs from 'classnames'
import styles from '../../index.module.scss'

const getClassNames = ({
  startDate,
  endDate,
  day
}: {
  startDate?: Dayjs
  endDate?: Dayjs
  day: ITimeDay
}) => {
  let position = ''

  if (startDate && day.date.isSame(startDate, 'day')) {
    position = 'start'
  }
  //是尾天
  else if (endDate && day.date.isSame(endDate, 'day')) {
    position = 'end'
  }
  //在中间
  else if (
    startDate &&
    endDate &&
    day.date.isBetween(startDate, endDate, 'day', '[]')
  ) {
    position = 'between'
  }

  //需判断是完整选择区间（有开始有结束，否则为仅选择开始日）
  const isStart =
    position === 'start' && endDate && !endDate.isSame(startDate, 'day')
      ? styles.start_bg
      : ''
  const isEnd = position === 'end' && endDate ? styles.end_bg : ''

  const isFirstDayInLine =
    //当前日为周日或月初时，左侧需要加圆角样式
    day.date.day() === 0 || day.date.date() === 1 ? styles.be_first : ''
  const isLastDayInLine =
    //当前日为周六或月末时，左侧需要加圆角样式
    day.date.day() === 6 || day.date.date() === day.date.daysInMonth()
      ? styles.be_last
      : ''

  //头尾两日需要有选中样式
  const isSelDay = ['start', 'end'].includes(position) ? styles.sel_item : ''

  return cs(
    styles[position],
    isFirstDayInLine,
    isLastDayInLine,
    isSelDay,
    isStart,
    isEnd
  )
}

const _Day = ({
  day,
  maxDate,
  minDate,
  startDate,
  endDate,
  onSelect
}: {
  day: ITimeDay
  maxDate: Dayjs
  minDate: Dayjs
  startDate?: Dayjs
  endDate?: Dayjs
  onSelect?: (day: ITimeDay) => void
}) => {
  return (
    <li
      className={cs({
        [styles.invisible]: day.dayInMonth !== 'current',
        [styles.before_cur]: day.dayInMonth === 'previous',
        [styles.disabled]:
          (minDate && maxDate && day.date.isBefore(minDate)) ||
          day.date.isAfter(maxDate)
      })}
      key={day.dayInMonth + day.date.format('YYYY-MM-DD')}
      onClick={() => onSelect?.(day)}
    >
      <div className={getClassNames({ startDate, endDate, day })}>
        <div
          className={cs(styles.date_item, {
            [styles.isCurrent]: day.isToday
          })}
        >
          {day.isToday ? '今' : day.date.format('D')}
        </div>
      </div>
    </li>
  )
}

export const Day = React.memo(_Day)
