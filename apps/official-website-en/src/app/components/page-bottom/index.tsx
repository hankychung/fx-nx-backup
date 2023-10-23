import { I18N } from '@flyele-nx/i18n'
import React from 'react'
import styles from './index.module.scss'
import { useNavigate } from 'react-router-dom'
import { routePath } from '../../routes'

export const PageBottom = ({ widthStyle }: { widthStyle?: string }) => {
  const navigate = useNavigate()

  const goToPage = () => {
    navigate(routePath.download)
    window.scrollTo(0, 0)
  }

  return (
    <div className={styles.pageBottom} style={{ width: widthStyle }}>
      <div className={styles.useBoxRoot}>
        <div className={styles.useTitle}>
          {I18N.officialWebsite.startManagingImmediately}
        </div>
        <div className={styles.slogan}>{I18N.common.slogan}</div>
        <div className={styles.useBtn} onClick={goToPage}>
          {I18N.officialWebsite.getStarted}
        </div>
      </div>
      <div className={styles.copyright}>
        版权所有©2020-2022飞项科技.保留一切权利. 飞项科技（广州）有限公司
        粤ICP备2020073377号 粤公网安备44011202001924号
        增值电信业务经营许可证：粤B2-20220181
      </div>
    </div>
  )
}
