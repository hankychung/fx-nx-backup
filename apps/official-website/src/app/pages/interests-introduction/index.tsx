import React, { useState } from 'react'
import styles from './index.module.scss'
import {
  MemberIntroduction,
  IdentityEqualComparison,
  SpaceEqualComparison
} from '@flyele-nx/service-module'
import { useMount } from 'ahooks'

const InterestsIntroduction = () => {
  // 在移动端ui没出来之前，暂时直接把宽度拉大 临时方案
  const [widthStyle, setWidthStyle] = useState('100%')
  // 权益身份对比切换状态true为身份权益对比,false为空间权益对比
  const [showComparison, setShowComparison] = useState(true)

  const goToPage = () => {
    window.location.replace('https://www.feixiang.cn/bbxz')
  }

  useMount(() => {
    const bodyWidth = document.body.clientWidth
    const width = bodyWidth < 1020 ? '1020px' : '100%'
    setWidthStyle(width)
  })

  const handleMoreEquitySpace = () => {
    setShowComparison(false)
    const targetElement = document.querySelector('#ComparsionTitle-element')
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className={styles.introductionPage}>
      <MemberIntroduction
        widthStyle={widthStyle}
        handleMoreEquitySpace={handleMoreEquitySpace}
      />
      <div className={styles.ComparsionTitle} id="ComparsionTitle-element">
        <div
          // className={styles.useTitle}
          onClick={() => {
            setShowComparison(true)
          }}
        >
          <span
            className={showComparison ? styles.useTitle : styles.unUseTitle}
          >
            身份权益对比
          </span>
        </div>
        <div
          // className={styles.useTitle}
          onClick={() => {
            setShowComparison(false)
          }}
        >
          <span
            className={showComparison ? styles.unUseTitle : styles.useTitle}
          >
            空间权益对比
          </span>
        </div>
      </div>
      {showComparison ? <IdentityEqualComparison /> : <SpaceEqualComparison />}

      <div className={styles.useBoxRoot} style={{ width: widthStyle }}>
        <div className={styles.useTitle}>立即开始管理你的事项</div>
        <div className={styles.useBtn} onClick={goToPage}>
          免费使用
        </div>
      </div>
    </div>
  )
}

export default InterestsIntroduction
