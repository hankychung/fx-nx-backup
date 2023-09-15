import { I18N } from '@flyele-nx/i18n'
import React from 'react'
import loadingGif from '../../../assets/icons/loading.gif'
import style from './index.module.scss'

const LoadingPage: React.FC<React.PropsWithChildren<unknown>> = () => {
  return (
    <div className={style.loadingPageRoot}>
      <div className={style.imgBox}>
        <img src={loadingGif} alt="loading" />
      </div>
      <div className={style.text}>{I18N.common.loading}</div>
    </div>
  )
}

export { LoadingPage }
