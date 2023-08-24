import React from 'react'
import dayjs, { Dayjs } from 'dayjs'
import { TimePicker } from 'antd'
import styles from './index.module.scss'
import cs from 'classnames'

const formatHours = 'HH'
const formatMinutes = 'mm'

interface ITimeBoxProps {
  date: Dayjs
  placeholder?: string
  warpClass?: string
}

const _TimeBox = ({
  date,
  placeholder = '请输入',
  warpClass
}: ITimeBoxProps) => {
  const onChangeHour = (time: Dayjs | null, timeStr: string) => {
    console.log('onChangeHour', time, timeStr)
  }

  const onChangeMinutes = (time: Dayjs | null, timeStr: string) => {
    console.log('onChangeMinutes', time, timeStr)
  }

  return (
    <div className={cs(styles.timeBoxRoot, warpClass)}>
      <TimePicker
        placeholder={placeholder}
        defaultValue={dayjs('12', formatHours)}
        format={formatHours}
        bordered={false}
        allowClear={false}
        suffixIcon={undefined}
        showNow={false}
        changeOnBlur={true}
        onChange={onChangeHour}
        popupClassName={styles.pickerPopup}
      />
      <div>:</div>
      <TimePicker
        placeholder={placeholder}
        defaultValue={dayjs('08', formatMinutes)}
        format={formatMinutes}
        bordered={false}
        allowClear={false}
        suffixIcon={undefined}
        showNow={false}
        changeOnBlur={true}
        onChange={onChangeMinutes}
        popupClassName={styles.pickerPopup}
      />
    </div>
  )
}

export const TimeBox = React.memo(_TimeBox)
