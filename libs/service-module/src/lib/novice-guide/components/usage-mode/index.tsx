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
      title: '个人使用',
      desc: '简单方便地管理自己的工作生活',
      img: 'https://flyele-system.oss-cn-shenzhen.aliyuncs.com/resources/PC/noviceGuide/personal.png'
    },
    {
      key: 'team',
      title: '团队协作',
      desc: '建造团队，执行项目，沉淀流程',
      img: 'https://flyele-system.oss-cn-shenzhen.aliyuncs.com/resources/PC/noviceGuide/team.png'
    }
  ]

  return (
    <CommonPage
      visible={visible}
      title="你期望在飞项使用方式是？"
      desc="简单几步，快速上手"
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
