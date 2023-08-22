import React from 'react'
import { MatterCreateCell } from '@flyele-nx/ui'
import styles from './index.module.scss'
import { NoticeIcon } from '@flyele-nx/icon'
import { useMemoizedFn } from 'ahooks'

const _RemindPicker = () => {
  const showPicker = useMemoizedFn(() => {
    console.log('showPicker')
  })

  return (
    <MatterCreateCell
      isMatterCreate
      onClick={showPicker}
      img={() => <NoticeIcon width={16} height={16} />}
    >
      <div className={styles.remindPicker}>remind</div>
    </MatterCreateCell>
  )
}

export const RemindPicker = React.memo(_RemindPicker)
