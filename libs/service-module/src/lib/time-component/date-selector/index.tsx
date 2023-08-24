import React, { useEffect, useMemo, useRef, useState } from 'react'
import { BottomBar } from '../common/components/bottom-bar'
import { useMemoizedFn } from 'ahooks'
import styles from './index.module.scss'
import Calendar from '../common/components/calendar'
import dayjs, { Dayjs } from 'dayjs'
import { uniqueId } from 'lodash'
import {
  defaultMaxDate,
  defaultMinDate,
  getCurOnMin,
  getInitMatterTime
} from '@flyele-nx/utils'
import { globalNxController } from '@flyele-nx/global-processor'
import { ITimeProps } from '@flyele-nx/types'
import { TimeSelector } from '../common/components/time-selector'

export interface IRangeData {
  value: [Dayjs?, Dayjs?]
  // 以下这两个参数已经和业务绑定，无法分离
  showStartInfoTime: boolean
  showEndInfoTime: boolean
  onRangeTimeChange: (date: Dayjs, type: 'start' | 'end') => void
  onRangePickerClear: (type: 'start' | 'end') => void
}

export interface IRepeatData {
  finishTime?: number // 循环事项终止时间
}

interface IProps {
  defaultValue?: ITimeProps
  onClose: () => void
  onConfirm: (data: ITimeProps) => void
  calendarMinDate?: Dayjs
  calendarMaxDate?: Dayjs
  disabled?: boolean // 禁用编辑
  wrapHeight?: string // 容器整体高度
  calendarHeaderClass?: string // 日历头部类
  repeatData?: IRepeatData
}

const getCloneDate = (date: Dayjs, hour: number, minute: number) => {
  return date.clone().hour(hour).minute(minute).startOf('minute')
}

const _DateSelector = ({
  defaultValue,
  onClose,
  onConfirm,
  wrapHeight = '520px',
  calendarMaxDate = defaultMaxDate,
  calendarMinDate = defaultMinDate,
  disabled,
  calendarHeaderClass,
  repeatData
}: IProps) => {
  const [innerTimeData, setInnerTimeData] = useState<ITimeProps>(
    getInitMatterTime()
  )
  const isSelected = useRef(false)

  const onClear = useMemoizedFn(async () => {
    const cur = await getCurOnMin()
    const timeData: ITimeProps = {
      ...innerTimeData,
      startTime: cur.clone().add(30, 'minute'),
      endTime: cur.clone().add(60, 'minute'),
      startTimeFullDay: 2, // 默认是全天
      endTimeFullDay: 2,
      isSetTime: false
    }
    setInnerTimeData(timeData)
  })

  /**
   * 检查时间
   */
  const checkDate = (timeData: ITimeProps) => {
    const { startTime, endTime, isSetTime } = timeData

    // 事项开始时间不可以晚于循环结束时间
    if (repeatData?.finishTime) {
      if (dayjs(repeatData.finishTime * 1000).isBefore(startTime, 'day')) {
        globalNxController.showMsg({
          msgType: '消息',
          content: '事项开始日期不可晚于循环结束日期'
        })
        return false
      }
    }

    // 事项不可超过两年
    if (
      isSetTime &&
      endTime.isAfter(startTime, 'day') &&
      endTime.diff(startTime, 'day') > 730
    ) {
      globalNxController.showMsg({
        msgType: '消息',
        content: '事项长度不能超过2年'
      })
      return false
    }
    return true
  }

  /**
   * 整合数据
   */
  const computedTimeData = (date: Dayjs) => {
    const _timeData = { ...innerTimeData, isSetTime: true }
    const { startTime, endTime } = _timeData
    const startHour = startTime.hour()
    const startMinute = startTime.minute()
    const endHour = endTime.hour()
    const endMinute = endTime.minute()

    const isSame = date.isSame(startTime, 'day')
    const isRange = endTime.isAfter(startTime, 'day') // 原本就是区间

    if (isRange) {
      // 本身就是一个时间范围
      _timeData.startTime = getCloneDate(date, startHour, startMinute)
      _timeData.endTime = getCloneDate(date, endHour, endMinute)
      isSelected.current = true
      return _timeData
    }

    if (isSame && innerTimeData.isSetTime) return _timeData
    const isAfter = date.isAfter(startTime, 'day')

    if (!isSelected.current) {
      _timeData.startTime = getCloneDate(date, startHour, startMinute)
      _timeData.endTime = getCloneDate(date, endHour, endMinute)
      isSelected.current = true
      return _timeData
    }
    if (!isAfter) {
      _timeData.startTime = getCloneDate(date, startHour, startMinute)
      _timeData.endTime = getCloneDate(startTime, endHour, endMinute)
    } else {
      _timeData.endTime = getCloneDate(date, endHour, endMinute)
    }

    return _timeData
  }

  /**
   * 选择时间
   */
  const onDateSelect = useMemoizedFn((date: Dayjs) => {
    const timeData = computedTimeData(date)

    if (checkDate(timeData)) {
      setInnerTimeData(timeData)
    }
  })

  const onTimeChange = useMemoizedFn((date: Dayjs, type: 'start' | 'end') => {
    console.log('@@@ onTimeChange', date, type)
    // timeRef.current?.onTimeChange(date, type)
  })

  /**
   * 清空时间
   */
  const onPickerClear = useMemoizedFn((type: 'start' | 'end') => {
    console.log('@@@ onPickerClear', type)
    // timeRef.current?.onTimeClear(type)
  })

  /**
   * 确认
   **/
  const onConfirmBtn = useMemoizedFn(() => {
    onConfirm(innerTimeData)
  })

  const rangeData = useMemo((): IRangeData => {
    const { startTime, endTime, isSetTime, startTimeFullDay, endTimeFullDay } =
      innerTimeData

    return {
      value: [
        isSetTime ? startTime : undefined,
        isSetTime ? endTime : undefined
      ],
      showStartInfoTime: startTimeFullDay === 1,
      showEndInfoTime: endTimeFullDay === 1,
      onRangeTimeChange: onTimeChange,
      onRangePickerClear: onPickerClear
    }
  }, [innerTimeData, onPickerClear, onTimeChange])

  useEffect(() => {
    if (defaultValue) {
      setInnerTimeData(defaultValue)
    }
  }, [defaultValue])

  return (
    <div
      className={styles.timeSelectorRoot}
      style={{
        height: wrapHeight
      }}
    >
      <div className={styles.calendarBox}>
        <Calendar
          maxDate={calendarMaxDate}
          minDate={calendarMinDate}
          startDate={rangeData.value[0]}
          endDate={rangeData.value[1]}
          onDateSelect={onDateSelect}
          prefix={uniqueId('scroller_')}
          disabled={disabled}
          headerClass={calendarHeaderClass}
        />
      </div>
      <TimeSelector
        startTime={rangeData.value[0]}
        endTime={rangeData.value[1]}
        showStartInfoTime={rangeData.showStartInfoTime}
        showEndInfoTime={rangeData.showEndInfoTime}
        onTimeChange={rangeData.onRangeTimeChange}
        onClear={rangeData.onRangePickerClear}
        disabled={disabled}
      />
      <BottomBar
        onCancel={onClose}
        onConfirm={onConfirmBtn}
        onClear={onClear}
      />
    </div>
  )
}

export const DateSelector = React.memo(_DateSelector)
