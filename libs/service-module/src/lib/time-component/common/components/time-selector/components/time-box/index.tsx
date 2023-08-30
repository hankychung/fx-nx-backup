import React, { useMemo, useState } from 'react'
import { Dayjs } from 'dayjs'
import { TimePicker } from 'antd'
import styles from './index.module.scss'
import cs from 'classnames'
import { useMemoizedFn } from 'ahooks'
import { DeleteOrCloseIcon } from '@flyele-nx/icon'

const formatHours = 'HH'
const formatMinutes = 'mm'

interface ITimeBoxProps {
  date: Dayjs
  showTime: boolean
  onChange: (time: Dayjs) => void
  onClear?: () => void
  showClear?: boolean
  placeholder?: string
  warpClass?: string
  disabled?: boolean // 禁用编辑
}

const _TimeBox = ({
  date,
  showTime,
  onChange,
  placeholder = '请输入',
  warpClass,
  onClear,
  showClear = true,
  disabled = false
}: ITimeBoxProps) => {
  const [showPicker, setShowPicker] = useState(false)

  const onChangeHour = useMemoizedFn(
    (time: Dayjs | null, timeString: string) => {
      onChange(date.clone().set('hour', Number(timeString)))
    }
  )

  const onChangeMinutes = useMemoizedFn(
    (time: Dayjs | null, timeString: string) => {
      onChange(date.clone().set('minute', Number(timeString)))
    }
  )

  const showPlaceholder = useMemo(() => {
    return !showTime && !showPicker
  }, [showPicker, showTime])

  if (showPlaceholder) {
    return (
      <div
        className={styles.placeholderText}
        onClick={() => {
          onChange(date)
          setShowPicker(true)
        }}
      >
        {placeholder}
      </div>
    )
  }

  return (
    <div className={cs(styles.timeBoxRoot, warpClass)}>
      <TimePicker
        placeholder={placeholder}
        defaultValue={date}
        format={formatHours}
        bordered={false}
        allowClear={false}
        suffixIcon={undefined}
        showNow={false}
        changeOnBlur={true}
        disabled={disabled}
        onChange={onChangeHour}
        popupClassName={styles.pickerPopup}
      />
      <div>:</div>
      <TimePicker
        placeholder={placeholder}
        defaultValue={date}
        format={formatMinutes}
        bordered={false}
        allowClear={false}
        suffixIcon={undefined}
        showNow={false}
        changeOnBlur={true}
        disabled={disabled}
        onChange={onChangeMinutes}
        popupClassName={styles.pickerPopup}
      />
      {showClear && (
        <div
          className={styles.deleteIcon}
          onClick={() => {
            setShowPicker(false)
            onClear && onClear()
          }}
        >
          <DeleteOrCloseIcon width={14} height={14} color="#060606" />
        </div>
      )}
    </div>
  )
}

export const TimeBox = React.memo(_TimeBox)
