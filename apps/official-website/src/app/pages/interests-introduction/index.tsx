import React, { useState } from 'react'
import styles from './index.module.scss'
import {
  MemberIntroduction,
  IdentityEqualComparison,
  SpaceEqualComparison,
  CustomerServicesModal
} from '@flyele-nx/service-module'
import { useMount } from 'ahooks'
import {
  FlyBasePopper,
  FlyBasePopperCtrl,
  useController
} from '@flyele/flyele-components'
import { Button } from 'antd'
import { ReactComponent as CustomerIcon } from '../../../assets/icons/customer_service.svg'
const InterestsIntroduction = () => {
  const Controller = useController(new FlyBasePopperCtrl())
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
      />
      <div id="ComparsionTitle-element-scroll"></div>
      <div className={styles.ComparsionTitle} id="ComparsionTitle-element">
        <div
          // className={styles.useTitle}
          onClick={() => {
            setShowComparison(true)
            scrollIntoTop()
          }}
        >
          <span
            className={showComparison ? styles.use_title : styles.un_use_title}
          >
            会员权益对比
          </span>
        </div>
        <div
          // className={styles.useTitle}
          onClick={() => {
            setShowComparison(false)
            scrollIntoTop()
          }}
        >
          <span
            className={showComparison ? styles.un_use_title : styles.use_title}
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
      <div className={styles.customer_service}>
        <FlyBasePopper
          controller={Controller}
          trigger="click"
          placement="bottom-end"
          showArrow={false}
          zIndex={1003}
          content={() => (
            <div>
              <CustomerServicesModal
                onClose={() => {
                  Controller.hide()
                }}
              ></CustomerServicesModal>
            </div>
          )}
        >
          <Button
            onClick={() => {
              Controller.show()
            }}
            icon={<CustomerIcon />}
          >
            联系客服
          </Button>
        </FlyBasePopper>
      </div>
    </div>
  )
}

export default InterestsIntroduction
