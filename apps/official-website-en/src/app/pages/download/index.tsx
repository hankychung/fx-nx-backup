import { I18N } from '@flyele-nx/i18n'
import React, { useMemo } from 'react'
import styles from './index.module.scss'
import { PageBottom } from '../../components/page-bottom'
import windowsIcon from '../../../assets/icons/windows.png'
import macIcon from '../../../assets/icons/mac.png'
import iOSIcon from '../../../assets/icons/iOS.png'
import androidIcon from '../../../assets/icons/android.png'
import { ReactComponent as DownloadApp } from '../../../assets/icons/downloadApp.svg'
import { getLang } from '../../../config'
import cs from 'classnames'
import { useMemoizedFn } from 'ahooks'

export const DownloadPage = () => {
  const isCN = getLang() === 'zh-CN'

  const onDownloadApp = useMemoizedFn((type: string) => {
    console.log('onDownloadApp', type)
    let downloadUrl = ''
    switch (type) {
      case 'windows':
        downloadUrl =
          'https://download.flyele.com/v1/downloads/application?platform=windows'
        break
      case 'mac':
        downloadUrl =
          'https://download.flyele.com/v1/downloads/application?platform=macos'
        break
      default:
        console.log('没有匹配上')
    }
    if (downloadUrl) {
      window.open(downloadUrl, '_blank')
    }
  })

  const downloadType = useMemo(() => {
    return [
      {
        key: 'windows',
        title: I18N.officialWebsite.windows,
        icon: windowsIcon,
        desc: isCN ? '' : 'Download',
        hover: true,
        hoverContent: (
          <div
            className={cs(styles.downloadItem, styles.downloadHoverItem)}
            onClick={() => onDownloadApp('windows')}
          >
            <div className={styles.downloadIcon}>
              <DownloadApp width={60} height={60} color="#1DD2C1" />
            </div>
            <div className={styles.downloadText}>
              {I18N.officialWebsite.downloadBitVersion}
            </div>
          </div>
        )
      },
      {
        key: 'mac',
        title: I18N.officialWebsite.mac,
        icon: macIcon,
        desc: isCN ? '' : 'Download',
        hover: true,
        hoverContent: (
          <div
            className={cs(styles.downloadItem, styles.downloadHoverItem)}
            onClick={() => onDownloadApp('mac')}
          >
            <div className={styles.downloadIcon}>
              <DownloadApp width={60} height={60} color="#1DD2C1" />
            </div>
            <div className={styles.downloadText}>
              {I18N.officialWebsite.clickToDownload}
            </div>
          </div>
        )
      },
      {
        key: 'ios',
        title: I18N.officialWebsite.ios,
        icon: iOSIcon,
        desc: I18N.officialWebsite.downloadInAppStore,
        hover: false,
        hoverContent: null
      },
      {
        key: 'android',
        title: I18N.officialWebsite.android,
        icon: androidIcon,
        desc: I18N.officialWebsite.downloadInGooglePlay,
        hover: false,
        hoverContent: null
      }
    ]
  }, [isCN, onDownloadApp])

  return (
    <div className={styles.downloadPageRoot}>
      <div className={styles.pageTitleBox}>
        <div className={styles.pageTitle}>
          {I18N.officialWebsite.freeForAllPlatforms}
        </div>
        <div className={styles.pageDesc}>
          {I18N.officialWebsite.simultaneouslySupportingI}
        </div>
      </div>
      <div className={styles.downloadBox}>
        {downloadType.map((item) => {
          return (
            <div
              key={item.key}
              className={cs(styles.downloadItem, {
                [styles.hoverItem]: item.hover
              })}
            >
              <div className={styles.itemIcon}>
                <img src={item.icon} alt="icon" />
              </div>
              {isCN ? (
                <>
                  <div className={styles.itemTitle}>{item.title}</div>
                  <div className={styles.itemDesc}>{item.desc}</div>
                </>
              ) : (
                <>
                  <div className={styles.itemDesc}>{item.desc}</div>
                  <div className={styles.itemTitle}>{item.title}</div>
                </>
              )}
              {item.hoverContent}
            </div>
          )
        })}
      </div>
      <div className={styles.picBox}>
        <img
          src="https://flyele-system.oss-cn-shenzhen.aliyuncs.com/resources/PC/official-website/flyelePic.png"
          alt="pic"
        />
      </div>
      <PageBottom />
    </div>
  )
}
