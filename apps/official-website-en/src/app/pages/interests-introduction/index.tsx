import { I18N } from '@flyele-nx/i18n'
import React, { useState } from 'react'
import styles from './index.module.scss'
import {
  MemberIntroduction,
  IdentityEqualComparison,
  SpaceEqualComparison
} from '@flyele-nx/service-module'
import { useMount } from 'ahooks'
import { getLang } from '../../../config'
import { PageBottom } from '../../components/page-bottom'

const InterestsIntroduction = () => {
  // 在移动端ui没出来之前，暂时直接把宽度拉大 临时方案
  const [widthStyle, setWidthStyle] = useState('100%')
  // 权益身份对比切换状态true为身份权益对比,false为空间权益对比
  const [showComparison, setShowComparison] = useState(true)

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

  const scrollIntoTop = () => {
    const targetElement = document.querySelector(
      '#ComparsionTitle-element-scroll'
    )
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className={styles.introductionPage}>
      <MemberIntroduction
        widthStyle={widthStyle}
        handleMoreEquitySpace={handleMoreEquitySpace}
        lang={getLang()}
      />
      <div id="ComparsionTitle-element-scroll" />
      <div className={styles.ComparsionTitle} id="ComparsionTitle-element">
        <div
          onClick={() => {
            setShowComparison(true)
            scrollIntoTop()
          }}
        >
          <span
            className={showComparison ? styles.use_title : styles.un_use_title}
          >
            {I18N.officialWebsite.membershipBenefitsFor}
          </span>
        </div>
        <div
          onClick={() => {
            setShowComparison(false)
            scrollIntoTop()
          }}
        >
          <span
            className={showComparison ? styles.un_use_title : styles.use_title}
          >
            {I18N.officialWebsite.spaceRightsAndInterests}
          </span>
        </div>
      </div>
      {showComparison ? <IdentityEqualComparison /> : <SpaceEqualComparison />}

      <PageBottom widthStyle={widthStyle} />
    </div>
  )
}

export default InterestsIntroduction
