import React from 'react'
import styles from './index.module.scss'
import cs from 'classnames'

export interface IFlyTabs {
  key: string
  title: string
}

interface IProps {
  tabs: IFlyTabs[]
  active: string
  onChange: (key: string) => void
  gap?: number
  itemClass?: string
}

const _FlyTabs = ({ tabs, active, onChange, gap = 38, itemClass }: IProps) => {
  const onClickTab = (key: string) => {
    if (active === key) return

    onChange(key)
  }

  return (
    <div className={styles.flyTabsRoot} style={{ columnGap: `${gap}px` }}>
      {tabs.map((item) => (
        <div
          key={item.key}
          className={cs(
            styles.tabItem,
            {
              [styles.active]: active === item.key
            },
            itemClass
          )}
          onClick={() => onClickTab(item.key)}
        >
          {item.title}
        </div>
      ))}
    </div>
  )
}

export const FlyTabs = React.memo(_FlyTabs)
