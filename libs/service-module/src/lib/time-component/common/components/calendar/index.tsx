import React, {
  useCallback,
  useEffect,
  useState,
  forwardRef,
  createRef,
  useImperativeHandle,
  ForwardRefRenderFunction,
  memo,
  useRef
} from 'react'
import dayjs, { Dayjs } from 'dayjs'
import cs from 'classnames'
import { VariableSizeList as List } from 'react-window'
import { DAY_DICT, timeGetter } from '@flyele-nx/utils'
import { useMemoizedFn } from 'ahooks'
import styles from './index.module.scss'
import { globalNxController } from '@flyele-nx/global-processor'
import { ITimeDay } from '@flyele-nx/types'
import { generateCalendarData } from '@flyele-nx/utils'
import { Day } from './components/day'

export type Ref = {
  scrollIntoView: (date: Dayjs) => void
}

//固定内容
const weekHead = DAY_DICT.map((t) => {
  return (
    <div className={styles.header_week_item} key={t}>
      {t}
    </div>
  )
})

export interface Props {
  maxDate: Dayjs
  minDate: Dayjs
  startDate?: Dayjs
  endDate?: Dayjs
  prefix?: string
  height?: number
  width?: number | string
  headerClass?: string
  disabled?: boolean
  autoScroll?: boolean
  onDateSelect?: (date: Dayjs) => void
  getRenderCell?: (date: Dayjs) => React.ReactNode
}

const Calendar: ForwardRefRenderFunction<Ref, Props> = (props, CalendarRef) => {
  const {
    maxDate,
    minDate,
    startDate,
    endDate,
    height = 300,
    width = '100%',
    disabled,
    headerClass,
    autoScroll = true,
    onDateSelect,
    getRenderCell
  } = props

  //生成全部月份数据，通过maxDate和minDate的月份差值来扩展
  //TODO: 需要改成操作数字或者字符串，不需要用moment
  const [monthList, setMonthList] = useState<string[]>()

  useEffect(() => {
    const beginNum = minDate.month()
    const list = Array(maxDate.diff(minDate, 'month'))
      .fill(null)
      .map((_, i) => {
        return minDate
          .clone()
          .month(i + beginNum)
          .format('YYYY-MM')
      })

    setMonthList(list)
  }, [maxDate, minDate])

  const listRef = createRef<List>()
  const [currentDate, setCurrentDate] = useState(dayjs())

  // 只允许自动跳转一次
  const intoViewState = useRef(false)

  const intoView = useCallback(
    (date: Dayjs) => {
      monthList &&
        listRef.current?.scrollToItem(
          monthList.indexOf(date.format('YYYY-MM')),
          'start'
        )

      intoViewState.current = true
    },
    [listRef, monthList]
  )

  useImperativeHandle(
    CalendarRef,
    () => {
      return {
        scrollIntoView: intoView
      }
    },
    [intoView]
  )

  //获取准确当前日期
  useEffect(() => {
    timeGetter
      .getDate()
      .then((time) => {
        setCurrentDate(dayjs.unix(time).startOf('day'))
      })
      .catch((e) => {
        console.error(e)
      })
  }, [])

  useEffect(() => {
    if (
      autoScroll &&
      !intoViewState.current &&
      listRef.current &&
      (startDate || currentDate) &&
      monthList
    ) {
      intoView(startDate || currentDate)
    }
  }, [autoScroll, currentDate, intoView, listRef, monthList, startDate])

  const getRowHeight = useCallback(
    (index: number) => {
      const outSideHeight = 13 + 16 + 10
      const month = dayjs(monthList![index]).startOf('month')
      const days = month.daysInMonth() + month.day()
      const rows = Math.ceil(days / 7)

      return outSideHeight + rows * 36 // 36为具体日期的高度
    },
    [monthList]
  )

  const onSelect = useMemoizedFn((day: ITimeDay) => {
    if (day.dayInMonth !== 'current') {
      return
    }

    if (day.date.isBefore(minDate) || day.date.isAfter(maxDate)) {
      return
    }

    if (disabled) return
    if (disabled) {
      globalNxController.showMsg({
        msgType: '消息',
        content: '当前日期不可选'
      })
      return
    }
    onDateSelect && onDateSelect(day.date.clone())
  })

  return (
    <div className={cs(styles.calendar_wrap)}>
      <div className={cs(styles.header_week, headerClass)}>{weekHead}</div>
      {monthList?.length && (
        <List
          className={styles.scrollList}
          ref={listRef}
          width={width}
          height={height}
          itemCount={monthList.length}
          itemSize={getRowHeight}
          itemData={monthList}
        >
          {({ style, index, data }) => {
            const month = dayjs(data[index])
            const monthData = generateCalendarData(month, currentDate)

            return (
              <div className={styles.month_box} style={style}>
                <h1 className={styles.month_box__title}>
                  {month.format('YYYY年MM月')}
                </h1>
                <ul className={styles.day_box}>
                  {monthData.map((day) => {
                    return getRenderCell ? (
                      getRenderCell(day.date)
                    ) : (
                      <Day
                        key={day.dayInMonth + day.date.format('YYYY-MM-DD')}
                        day={day}
                        minDate={minDate}
                        maxDate={maxDate}
                        startDate={startDate}
                        endDate={endDate}
                        onSelect={onSelect}
                      />
                    )
                  })}
                </ul>
              </div>
            )
          }}
        </List>
      )}
    </div>
  )
}

export default memo(forwardRef(Calendar))
