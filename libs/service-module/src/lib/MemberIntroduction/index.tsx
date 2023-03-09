import React from 'react'
import styles from './index.module.scss'
import { IntroductionBox } from './components/IntroductionBox'
import { memberPowerStaticData } from '@flyele-nx/consts'

export const MemberIntroduction = () => {
  const onClickBtn = (key: string) => {
    console.log('onClickBtn', key)
  }

  return (
    <div className={styles.memberIntroduction}>
      {memberPowerStaticData.map((item) => {
        return (
          <IntroductionBox
            key={item.key}
            info={item}
            onClickBtn={() => onClickBtn(item.key)}
          />
        )
      })}
    </div>
  )
}
