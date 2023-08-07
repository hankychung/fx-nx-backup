import React, {
  FC,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState
} from 'react'
import { DayExecution } from '@flyele-nx/service-module'
import styles from './index.module.scss'
import { useClickAway, useMemoizedFn } from 'ahooks'
import { SelectDateCtx } from '../../context/select-date'
import { CurTimeContext } from '../../context/current-time'
import dayjs from 'dayjs'
import { UsercApi } from '@flyele-nx/service'
import { getWeatherIcon, clearIcon } from './utils/weatherDict'
import { ArrowDownIcon } from '@flyele-nx/icon'
import CalendarMonth from '../calendar-month'

export const TodayInfo: FC = () => {
  const { selectedDate, handleSelectDate } = useContext(SelectDateCtx)
  const curTime = useContext(CurTimeContext)

  const [soup, setSoup] = useState('好心情每天照常营业，坏心情永远打烊')
  const [weatherIcon, setWeatherIcon] = useState(clearIcon)
  const [stepsShow, setStepsShow] = useState(false)
  const [isBeforeToday, setIsBeforeToday] = useState(false)
  const [temp, setTemp] = useState('')
  const [desc, setDesc] = useState('')
  const [showCalendar, setShowCalendar] = useState(false)

  const curDateRef = useRef('')

  /**
   * 关闭日历
   */
  const onCloseCalendar = useMemoizedFn(() => {
    setShowCalendar(false)
  })

  useClickAway(onCloseCalendar, [
    () => document.getElementById('show-month'),
    () => document.getElementById('month-calendar')
  ])

  /**
   * 初始化信息
   */
  const init = useMemoizedFn(() => {
    UsercApi.getWeather().then((res) => {
      const { code, temperature, wind_describe, message } = res.data

      setWeatherIcon(getWeatherIcon(code))
      setDesc(wind_describe)
      if (message) {
        setSoup(message)
      }
      setTemp(temperature)
    })
  })

  /**
   * 回到今日
   */
  const backToToday = useMemoizedFn(() => {
    handleSelectDate(dayjs(curDateRef.current).unix())
  })

  const onShow = useMemoizedFn((show: boolean) => {
    setStepsShow(show)
  })

  useEffect(() => {
    const curDate = dayjs.unix(curTime).format('YYYY-M-D')

    if (curDateRef.current === curDate) return

    curDateRef.current = curDate

    handleSelectDate(dayjs(curDateRef.current).unix())

    init()
  }, [curTime, init, handleSelectDate])

  useEffect(() => {
    const isBefore = dayjs
      .unix(selectedDate)
      .isBefore(dayjs(curDateRef.current), 'date')

    if (isBefore) {
      setStepsShow(false)
    }

    setIsBeforeToday(isBefore)
  }, [selectedDate])

  const isToday = useMemo(() => {
    return dayjs(curDateRef.current).isSame(dayjs.unix(selectedDate), 'date')
  }, [selectedDate])

  const dateStr = useMemo(() => {
    const curDate = dayjs.unix(selectedDate)

    const prefix = !curDate.isSame(curDateRef.current, 'date')
      ? `${curDate.format('YYYY年')}`
      : ''

    return `${prefix}${curDate.format('M月D日')} ${
      prefix ? '' : curDate.format('ddd')
    }`
  }, [selectedDate])

  return (
    <div className={styles.todayInfoRoot}>
      <div className={styles.todayContainer}>
        <CalendarMonth show={showCalendar} />
        <div className={styles.left}>
          <div>
            <div className={styles.date}>{dateStr}</div>
            <div
              id="show-month"
              className={styles.arrow}
              onClick={() => {
                setShowCalendar((v) => !v)
              }}
              style={showCalendar ? { transform: 'rotate(180deg)' } : {}}
            >
              <ArrowDownIcon width={12} height={14} color={'#030303'} />
            </div>
            {!isToday && !showCalendar && (
              <div className={styles.btn} onClick={backToToday}>
                回到今日
              </div>
            )}
          </div>
          <div className={styles.soup}>{soup}</div>
        </div>
        <div className={styles.right}>
          <img src={weatherIcon} alt="" className={styles.weatherBg} />
          <div className={styles.whether}>
            {temp && (
              <div className={styles.wind}>
                {temp}
                <span>&#8451;</span>
                &nbsp;
                {desc}
              </div>
            )}
          </div>
        </div>
      </div>
      {!isBeforeToday && (
        <DayExecution
          date={selectedDate}
          onShow={onShow}
          rootClassName={stepsShow ? styles.showListHeight : ''}
          subtractHeight={250}
        />
      )}
    </div>
  )
}
