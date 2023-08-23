import React from 'react'
import { MatterCreateCell } from '@flyele-nx/ui'
import styles from './index.module.scss'
import { RepeatIcon } from '@flyele-nx/icon'
import { useMemoizedFn } from 'ahooks'

const _RepeatPicker = () => {
  const showPicker = useMemoizedFn(() => {
    console.log('showPicker')
  })

  return (
    <MatterCreateCell
      isMatterCreate
      onClick={showPicker}
      img={() => <RepeatIcon width={16} height={16} />}
    >
      <div className={styles.repeatPicker}>repeat</div>
    </MatterCreateCell>
  )
}

export const RepeatPicker = React.memo(_RepeatPicker)
