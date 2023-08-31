import React from 'react'
import { MatterCreateCell } from '@flyele-nx/ui'
import styles from './index.module.scss'
import { Taker } from '@flyele-nx/icon'

const _MemberBar = () => {
  return (
    <div>
      <MatterCreateCell
        isMatterCreate
        img={() => <Taker width={16} height={16} color="rgba(0, 0, 0, 0.88)" />}
      >
        <div className={styles['member-bar']}>协作人</div>
      </MatterCreateCell>
      <div className={styles['member-content']}>
        <div></div>
        <div></div>
      </div>
    </div>
  )
}

export const MemberBar = React.memo(_MemberBar)
