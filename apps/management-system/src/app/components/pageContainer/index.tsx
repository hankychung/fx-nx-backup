import React from 'react'
import styles from './index.module.scss'

export interface IDataShow {
  key: string
  title: string
  value: string
  subTitle?: string
  unitType?: 'money' | 'person'
}

interface IProps {
  dataArray?: IDataShow[]
  topHeight?: number // 距离顶部的高度
}

const _PageContainer: React.FC<React.PropsWithChildren<IProps>> = ({
  dataArray = [],
  topHeight = 80,
  children
}) => {
  return (
    <div
      className={styles.pageContainerRoot}
      style={{ height: `calc(100vh - ${topHeight}px)` }}
    >
      <div className={styles.content}>
        <div className={styles.contentLeft}>
          {dataArray.map((item) => {
            return (
              <div key={item.key} className={styles.dataItem}>
                <div className={styles.dataTitleBox}>
                  <div className={styles.title}>{item.title}</div>
                  {item.subTitle && (
                    <div className={styles.subTitle}>{item.subTitle}</div>
                  )}
                </div>
                <div className={styles.valueBox}>
                  {item.unitType === 'money' && (
                    <span className={styles.money}>¥</span>
                  )}
                  <span>{item.value}</span>
                  {item.unitType === 'person' && (
                    <span className={styles.person}>人</span>
                  )}
                </div>
              </div>
            )
          })}
        </div>
        <div className={styles.contentRight}>{children}</div>
      </div>
      <div className={styles.copyright}>
        Copyright © 2023-2023 Flyele. All Rights Reserved.
      </div>
    </div>
  )
}

export const PageContainer = React.memo(_PageContainer)
