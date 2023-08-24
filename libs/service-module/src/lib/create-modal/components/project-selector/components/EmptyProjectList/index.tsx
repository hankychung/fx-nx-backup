/**
 author: william   email:362661044@qq.com
 create_at:2022/9/2 14:14
 **/

import React from 'react'
// import emptyImg from 'assets/images/project/empty.png'
import styles from './index.module.scss'

type IProps = {
  onClick: () => void
}

export function EmptyProjectList(props: IProps) {
  const { onClick } = props

  return (
    <div className={styles.box}>
      {/* <img src={emptyImg} alt="img" /> //TODO:JC.....*/}
      <p>暂无项目</p>
      <div className={styles.btn} onClick={onClick}>
        点击创建
      </div>
    </div>
  )
}
