import React from 'react'
import { MatterCreateCell } from '@flyele-nx/ui'
import styles from './index.module.scss'
import { TimeIcon } from '@flyele-nx/icon'
import { useMemoizedFn } from 'ahooks'

const _DatePicker = () => {
  const showDatePicker = useMemoizedFn(() => {
    console.log('showDatePicker')
  })

  return (
    <MatterCreateCell
      isMatterCreate
      onClick={showDatePicker}
      img={() => <TimeIcon width={16} height={16} />}
    >
      <div className={styles.datePicker}>111</div>
    </MatterCreateCell>
  )
}

export const DatePicker = React.memo(_DatePicker)
