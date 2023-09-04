import React, { useEffect, useState } from 'react'
import { Modal } from 'antd'
import styles from './index.module.scss'
import { Close } from '@flyele-nx/icon'
import Calendar from '../common/components/calendar'
import { uniqueId } from 'lodash'
import { SingleTimeSelector } from '../common/components/single-time-selector'
import { BottomBar } from '../common/components/bottom-bar'
import dayjs, { Dayjs } from 'dayjs'
import { useMemoizedFn } from 'ahooks'
import { defaultMaxDate, defaultMinDate } from '@flyele-nx/utils'

interface IProps {
  open: boolean
  onClose: () => void
  onConfirm: (date: Dayjs | undefined) => void
  defaultValue?: number
  calendarMinDate?: Dayjs
  calendarMaxDate?: Dayjs
}

const _RemindTimeSelector = ({
  open,
  defaultValue,
  onClose,
  onConfirm,
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

  useEffect(() => {
    if (defaultValue) {
      setInnerTimeData(dayjs.unix(defaultValue))
    }
  }, [defaultValue])

  return (
    <Modal
      open={open}
      centered
      width={375}
      mask={false}
      footer={null}
      destroyOnClose
      onCancel={onClose}
      className={styles.modalRoot}
    >
      <div className={styles.remindTimeSelectorRoot}>
        <div className={styles.headerBox}>
          <h1 className={styles.title}>自定义提醒时间</h1>
          <div className={styles.close_box} onClick={onClose}>
            <Close width={12} height={12} color="rgba(147, 147, 147, 1)" />
          </div>
        </div>
        <div className={styles.content}>
          <div className={styles.calendarBox}>
            <Calendar
              maxDate={calendarMaxDate}
              minDate={calendarMinDate}
              startDate={innerTimeData}
              endDate={undefined}
              onDateSelect={onDateSelect}
              prefix={uniqueId('remindTime_')}
              headerClass={styles.calendarHeaderCla}
            />
          </div>
          <SingleTimeSelector
            time={innerTimeData}
            onTimeChange={onTimeChange}
            isSpanEnd={false}
          />
          <BottomBar
            onCancel={onClose}
            onConfirm={onConfirmBtn}
            onClear={onClear}
          />
        </div>
      </div>
    </Modal>
  )
}

export const RemindTimeSelector = React.memo(_RemindTimeSelector)
