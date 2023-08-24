import React, { useMemo, useState } from 'react'
import { Dayjs } from 'dayjs'
import { timeGetter, getMatterTimeText } from '@flyele-nx/utils'
import styles from './index.module.scss'
import { useMount } from 'ahooks'
import { TimeBox } from './components/time-box'
import { TimeArrowIcon } from '@flyele-nx/icon'

interface Props {
  startTime?: Dayjs
  showStartInfoTime: boolean
  endTime?: Dayjs
  showEndInfoTime: boolean
  onTimeChange: (date: Dayjs, type: 'start' | 'end') => void
  onClear: (type: 'start' | 'end') => void
  disabled?: boolean // 禁用编辑
}

const _TimeSelector: React.FC<React.PropsWithChildren<Props>> = (props) => {
  const {
    startTime,
    endTime,
    onTimeChange,
    onClear,
    showStartInfoTime,
    showEndInfoTime,
    disabled
  } = props

  const [cur, setCur] = useState(0)

  const singleDate = useMemo(() => {
    if (startTime && endTime) {
      return startTime.isSame(endTime, 'day') ? startTime : null
    }

    return startTime || endTime || null
  }, [startTime, endTime])

  useMount(() => {
    timeGetter
      .getDate()
      .then((time) => {
        setCur(time)
      })
      .catch((e) => {
        console.error(e)
      })
  })

  if (!startTime && !endTime) {
    return (
      <div className={styles.no_settime}>
        如需设置时间，请先在上方选择日期哦
      </div>
    )
  }

  return (
    <div className={styles.time_wrap}>
      {singleDate && (
        <h1 className={styles.single_time}>
          {getMatterTimeText(singleDate, cur)}
        </h1>
      )}

      <div className={styles.arrow}>
        <TimeArrowIcon width={34} height={32} color={'#D3D3D3'} />
      </div>
      <div className={styles.content}>
        <div className={styles.multi_box}>
          {startTime && !singleDate && (
            <div className={styles.date}>
              {getMatterTimeText(startTime, cur)}
            </div>
          )}
          {startTime && (
            <TimeBox
              placeholder="添加开始时间"
              warpClass={styles.mt6}
              date={startTime}
              // showTimeInfo={showStartInfoTime}
              // onChange={(date) => onTimeChange(date, 'start')}
              // onClear={() => onClear('start')}
              // disabled={disabled}
            />
          )}
        </div>
        <div className={styles.multi_box}>
          {endTime && !singleDate && (
            <div className={styles.date}>{getMatterTimeText(endTime, cur)}</div>
          )}
          {endTime && (
            <TimeBox
              placeholder="添加截止时间"
              warpClass={styles.mt6}
              date={endTime}
              // showTimeInfo={showEndInfoTime}
              // onTimeChange={(date) => onTimeChange(date, 'end')}
              // onClear={() => onClear('end')}
              // disabled={disabled}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export const TimeSelector = React.memo(_TimeSelector)
