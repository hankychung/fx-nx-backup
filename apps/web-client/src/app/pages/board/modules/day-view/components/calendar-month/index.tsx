import React, {
  useEffect,
  useState,
  useContext,
  useCallback,
  useRef,
  useMemo
} from 'react'
import cs from 'classnames'
import { SelectDateCtx } from '../../context/select-date'
import { CurTimeContext } from '../../context/current-time'
import dayjs, { Dayjs } from 'dayjs'
import { getDates, IDateInfo, isActive, IDotDict } from './utils'
import style from './index.module.scss'
import { DAY_DICT } from '@flyele-nx/utils'

const minMonth = dayjs('2020-5-1')

interface IProps {
  show: boolean
}

const CalendarMonth = ({ show }: IProps) => {
  const [dates, setDates] = useState<IDateInfo[][]>([])
  const [title, setTitle] = useState({ month: 0, year: 0 })
  const [month, setMonth] = useState<Dayjs>()
  const monthRef = useRef<Dayjs>()
  const [today, setToday] = useState(0)
  const todayRef = useRef(0)
  const { selectedDate, handleSelectDate } = useContext(SelectDateCtx)
  const curTime = useContext(CurTimeContext)
  const [disPre, setDisPre] = useState(false)
  const [disNext, setDisNext] = useState(false)
  const [dotDict, setDotDict] = useState<IDotDict>({})

  const updateMonth = useCallback((selectedDate: number) => {
    const { monthInfo, dates } = getDates(selectedDate, (newDict) => {
      setDotDict((dict) => ({
        ...dict,
        ...newDict
      }))
    })

    setMonth((monthRef.current = monthInfo))

    setDisPre(monthInfo.isSame(minMonth, 'month'))

    setDisNext(
      monthInfo.isSame(
        dayjs.unix(todayRef.current).add(2, 'year').set('month', 11),
        'month'
      )
    )

    setTitle({
      month: monthInfo.get('month') + 1,
      year: monthInfo.get('year')
    })

    setDates(dates)
  }, [])

  useEffect(() => {
    const dateStamp = dayjs(dayjs.unix(curTime).format('YYYY-M-D')).unix()

    if (dateStamp === todayRef.current) return

    setToday((todayRef.current = dateStamp))
  }, [curTime])

  useEffect(() => {
    if (
      monthRef.current &&
      dayjs.unix(selectedDate).isSame(monthRef.current, 'month')
    ) {
      return
    }

    updateMonth(selectedDate)
  }, [updateMonth, selectedDate])

  function backToToday() {
    handleSelectDate(today)
    updateMonth(today)
  }

  function preMonth() {
    if (disPre) return
    updateMonth(month!.subtract(1, 'month').unix())
  }

  function nextMonth() {
    if (disNext) return
    updateMonth(month!.add(1, 'month').unix())
  }

  function showDot(date: IDateInfo) {
    return dotDict[date.stamp]?.is_task && !isActive(date.stamp, selectedDate)
  }

  const showBackToToday = useMemo(() => {
    const todayDj = dayjs.unix(today)

    return (
      !todayDj.isSame(month!, 'month') ||
      !dayjs.unix(selectedDate).isSame(dayjs.unix(today), 'date')
    )
  }, [month, selectedDate, today])

  return show ? (
    <div className={style.calendar} id="month-calendar">
      <div className={style.head}>
        <div className={style.selector}>
          <i
            className={cs(
              'icon-shijiankongjian_zuo',
              'iconfont',
              style['arrow-icon'],
              { [style['arrow-icon_disable']]: disPre }
            )}
            onClick={preMonth}
          />
          <span>
            <span className="bold">{`${title.year}年`}</span>
            <span className="bold">{`${title.month}月`}</span>
          </span>
          <i
            className={cs(
              'icon-shijiankongjian_you',
              'iconfont',
              style['arrow-icon'],
              { [style['arrow-icon_disable']]: disNext }
            )}
            onClick={nextMonth}
          />
        </div>
        {showBackToToday && (
          <div className={style.btn} onClick={backToToday} id="back">
            回到今日
          </div>
        )}
      </div>

      <div className={style.content}>
        <div className={style.week}>
          {DAY_DICT.map((item) => (
            <div key={item}>{item}</div>
          ))}
        </div>

        <div className={style.date}>
          {dates.map((week, idx) => (
            <div key={idx}>
              {week.map((date) => (
                <div
                  key={date.day}
                  className={cs({
                    [style.hide]: date.day < 0,
                    [style.active]: isActive(date.stamp, selectedDate),
                    [style.dot]: showDot(date),
                    [style.dot_gray]: showDot(date) && date.stamp < today
                  })}
                  onClick={() => {
                    handleSelectDate(date.stamp)
                  }}
                >
                  {date.stamp === today ? '今' : date.day}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  ) : null
}

export default React.memo(CalendarMonth)
