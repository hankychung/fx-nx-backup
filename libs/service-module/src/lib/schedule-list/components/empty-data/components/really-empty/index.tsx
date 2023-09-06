import { I18N } from '@flyele-nx/i18n'
import React from 'react'
import styles from './index.module.scss'
import nullIcon from '../../../../../../assets/schedule/null.png'
import nullIconImg from '../../../../../../assets/schedule/image_empty@2x.png'

type TProsp = {
  isBoard: boolean
}

const ReallyEmpty = (props: TProsp) => {
  const { isBoard } = props

  if (isBoard) {
    return (
      <div className={styles.board}>
        <img src={nullIcon} alt="" className={styles.icon} />
        <div>{I18N.common.noTaskAtTheMoment}</div>
      </div>
    )
  }

  return (
    <div className={styles.other}>
      <img src={nullIconImg} alt="" className={styles.icon} />
      <div>{I18N.common.noTaskToday}</div>
      <div>{I18N.common.createAGenus}</div>
    </div>
  )
}

export default ReallyEmpty
