import { I18N } from '@flyele-nx/i18n'
import React from 'react'
import styles from './index.module.scss'
import { CommonPage } from '../common/page'
import { usageModeType } from '@flyele-nx/types'

const _UsageMode = ({
  visible,
  onSelectUsageMode
}: {
  visible: boolean
  onSelectUsageMode: (key: usageModeType) => void
}) => {
  const items: Array<{
    key: usageModeType
    title: string
    desc: string
    img: string
  }> = [
    {
      key: 'personal',
      title: I18N.common.personalUse,
      desc: I18N.common.simplyAndConveniently,
      img: 'https://flyele-system.oss-cn-shenzhen.aliyuncs.com/resources/PC/noviceGuide/personal.png'
    },
    {
      key: 'team',
      title: I18N.common.teamwork,
      desc: I18N.common.constructionTeamLeader,
      img: 'https://flyele-system.oss-cn-shenzhen.aliyuncs.com/resources/PC/noviceGuide/team.png'
    }
  ]

  return (
    <CommonPage
      visible={visible}
      title={I18N.common.youExpectToBeFlying}
      desc={I18N.common.easyStepsQuick}
      needFooter={false}
    >
      <div className={styles.usageModeRoot}>
        {items.map((item) => {
          return (
            <div
              key={item.key}
              className={styles.itemRoot}
              onClick={() => {
                onSelectUsageMode(item.key)
              }}
            >
              <div className={styles.itemImg}>
                <img src={item.img} alt="pic" />
              </div>
              <div className={styles.itemBottom}>
                <div className={styles.itemTitle}>{item.title}</div>
                <div className={styles.itemDesc}>{item.desc}</div>
              </div>
            </div>
          )
        })}
      </div>
    </CommonPage>
  )
}

export const UsageMode = React.memo(_UsageMode)
