import { I18N } from '@flyele-nx/i18n'
import React from 'react'
import styles from './index.module.scss'
import cs from 'classnames'
import { routePath } from '../../routes'

const _Header = ({
  activeTab,
  onClickTab
}: {
  activeTab: string
  onClickTab: (key: string) => void
}) => {
  const tabs = [
    {
      key: routePath.product,
      label: I18N.officialWebsite.productIntroduction
    },
    {
      key: routePath.download,
      label: I18N.officialWebsite.versionDownload
    },
    {
      key: routePath.price,
      label: I18N.officialWebsite.price
    },
    {
      key: 'contact-us',
      label: I18N.officialWebsite.contactUs
    }
  ]

  return (
    <div className={styles.headerRoot}>
      <div className={styles.logoBox} onClick={() => onClickTab(tabs[0].key)}>
        <img
          className={styles.logo}
          src="https://flyele-system.oss-cn-shenzhen.aliyuncs.com/resources/PC/logo.png"
          alt="logo"
        />
        <span className={styles.logoText}>{I18N.common.flyele}</span>
      </div>
      <div className={styles.routerTab}>
        {tabs.map((item) => {
          return (
            <div
              key={item.key}
              className={cs(styles.tab, {
                [styles.activeTab]: activeTab === item.key
              })}
              onClick={() => onClickTab(item.key)}
            >
              {item.label}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export const Header = React.memo(_Header)
