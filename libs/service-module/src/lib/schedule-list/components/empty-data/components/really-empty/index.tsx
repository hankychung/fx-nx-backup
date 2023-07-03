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
        <div>暂无事项安排</div>
      </div>
    )
  }

  return (
    <div className={styles.other}>
      <img src={nullIconImg} alt="" className={styles.icon} />
      <div>今日暂无事项</div>
      <div>快来创建属于你的日常</div>
    </div>
  )
}

export default ReallyEmpty
