import { I18N } from '@flyele-nx/i18n'
import styles from './index.module.scss'
import errorIcon from '../../../../../../assets/schedule/offline_3x.png'

export const ErrorPage = () => {
  return (
    <div className={styles['wrapper-error']}>
      <img src={errorIcon} alt="" />
      <div>{I18N.common.networkErrorRefresh}</div>
    </div>
  )
}
