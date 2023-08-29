import React from 'react'
import { Dayjs } from 'dayjs'
import styles from './index.module.scss'
// import Calendar from '../common/components/calendar'
// import { uniqueId } from 'lodash'
import { defaultMaxDate, defaultMinDate } from '@flyele-nx/utils'
import { useMemoizedFn } from 'ahooks'
import { BottomBar } from '../common/components/bottom-bar'

interface IProps {
  // value: Dayjs
  onClose: () => void
  onConfirm: (date: Dayjs) => void
  calendarMinDate?: Dayjs
  calendarMaxDate?: Dayjs
}

const _ExecuteAtSelector = ({
  // value,
  onClose,
  onConfirm,
  calendarMaxDate = defaultMaxDate,
  calendarMinDate = defaultMinDate
}: IProps) => {
  /**
   * 选择日期
   */
  const onDateSelect = useMemoizedFn((date: Dayjs) => {
    console.log('@@@ onDateSelect', date)
  })

  /**
   * 确认
   **/
  const onConfirmBtn = useMemoizedFn(() => {
    // onConfirm(value)
  })

  /**
   * 清空
   */
  const onClear = useMemoizedFn(() => {
    console.log('@@@ onClear')
  })

  return (
    <div className={styles.executeAtSelectorRoot}>
      <div className={styles.calendarBox}>
        {/*<Calendar*/}
        {/*  maxDate={calendarMaxDate}*/}
        {/*  minDate={calendarMinDate}*/}
        {/*  startDate={value}*/}
        {/*  endDate={undefined}*/}
        {/*  onDateSelect={onDateSelect}*/}
        {/*  prefix={uniqueId('scroller_')}*/}
        {/*/>*/}
      </div>
      <BottomBar
        onCancel={onClose}
        onConfirm={onConfirmBtn}
        onClear={onClear}
      />
    </div>
  )
}

export const ExecuteAtSelector = React.memo(_ExecuteAtSelector)
