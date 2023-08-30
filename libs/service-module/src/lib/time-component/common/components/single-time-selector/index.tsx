import React, { useState } from 'react'
import dayjs, { Dayjs } from 'dayjs'
import styles from './index.module.scss'
import { timeGetter, getMatterTimeText } from '@flyele-nx/utils'
import { useMount } from 'ahooks'
import { TimeBox } from '../time-selector/components/time-box'

interface IProps {
  time?: Dayjs
  onTimeChange: (date: Dayjs) => void
  isSpanEnd?: boolean
}

const _SingleTimeSelector = ({ time, onTimeChange, isSpanEnd }: IProps) => {
  const [cur, setCur] = useState(dayjs())

  useMount(() => {
    timeGetter.getDate().then((cur) => {
      setCur(dayjs.unix(cur))
    })
  })

  return (
    <div className={styles.wrap}>
      {!time && <div className={styles.tips}>请先选择时间哦~</div>}
      {time && (
        <div className={styles.info}>
          <div className={styles.date}>
            {getMatterTimeText(time, cur.unix())}
          </div>
          <TimeBox
            date={time}
            showTime={true}
            placeholder="点击选择时间"
            onChange={onTimeChange}
            showClear={false}
          />
          {isSpanEnd ? <div className={styles.tip}>超过截止时间</div> : null}
        </div>
      )}
    </div>
  )
}

export const SingleTimeSelector = React.memo(_SingleTimeSelector)
