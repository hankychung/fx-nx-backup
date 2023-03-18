import React from 'react'
import styles from './index.module.scss'
import {
  MemberIntroduction,
  IdentityEqualComparison,
  SpaceEqualComparison
} from '@flyele-nx/service-module'

const InterestsIntroduction = () => {
  const goToPage = () => {
    window.location.replace('https://www.feixiang.cn/bbxz')
  }

  return (
    <div className={styles.introductionPage}>
      <MemberIntroduction />
      <IdentityEqualComparison />
      <SpaceEqualComparison />

      <div className={styles.useBoxRoot}>
        <div className={styles.useTitle}>立即开始管理你的事项</div>
        <div className={styles.useBtn} onClick={goToPage}>
          免费使用
        </div>
      </div>
    </div>
  )
}

export default InterestsIntroduction
