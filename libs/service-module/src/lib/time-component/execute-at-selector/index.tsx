import React, { useEffect, useMemo, useState } from 'react'
import dayjs, { Dayjs } from 'dayjs'
import styles from './index.module.scss'
import Calendar from '../common/components/calendar'
import { uniqueId } from 'lodash'
import { defaultMaxDate, defaultMinDate } from '@flyele-nx/utils'
import { useMemoizedFn } from 'ahooks'
import { BottomBar } from '../common/components/bottom-bar'
import { SingleTimeSelector } from '../common/components/single-time-selector'

interface IProps {
  defaultValue?: number
  onClose: () => void
  onConfirm: (date: Dayjs | undefined) => void
  calendarMinDate?: Dayjs
  calendarMaxDate?: Dayjs
  endTime?: Dayjs
}

const _ExecuteAtSelector = ({
  defaultValue,
  onClose,
  onConfirm,
  endTime,
  calendarMaxDate = defaultMaxDate,
  calendarMinDate = defaultMinDate
}: IProps) => {
  const [innerTimeData, setInnerTimeData] = useState<Dayjs>()
  /**
   * 选择日期
   */
  const onDateSelect = useMemoizedFn((date: Dayjs) => {
    setInnerTimeData(date)
  })

  /**
   * 确认
   **/
  const onConfirmBtn = useMemoizedFn(() => {
    onConfirm(innerTimeData)
  })

  /**
   * 清空
   */
  const onClear = useMemoizedFn(() => {
    setInnerTimeData(undefined)
  })

  /**
   * 修改时间 时分
   */
  const onTimeChange = useMemoizedFn((date: Dayjs) => {
    setInnerTimeData(date)
  })

  const isSpanEnd = useMemo(() => {
    return !!endTime && !!defaultValue && defaultValue > endTime.unix()
  }, [defaultValue, endTime])

  useEffect(() => {
    if (defaultValue) {
      setInnerTimeData(dayjs.unix(defaultValue))
    }
  }, [defaultValue])

  return (
    <div className={styles.executeAtSelectorRoot}>
      <div className={styles.calendarBox}>
        <Calendar
          maxDate={calendarMaxDate}
          minDate={calendarMinDate}
          startDate={innerTimeData}
          endDate={undefined}
          onDateSelect={onDateSelect}
          prefix={uniqueId('executeAt_')}
          headerClass={styles.calendarHeaderCla}
        />
      </div>
      <SingleTimeSelector
        time={innerTimeData}
        onTimeChange={onTimeChange}
        isSpanEnd={isSpanEnd}
      />
      <BottomBar
        onCancel={onClose}
        onConfirm={onConfirmBtn}
        onClear={onClear}
      />
    </div>
  )
}

export const ExecuteAtSelector = React.memo(_ExecuteAtSelector)
