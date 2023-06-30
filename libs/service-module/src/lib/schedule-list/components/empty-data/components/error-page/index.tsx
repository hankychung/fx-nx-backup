import styles from './index.module.scss'
import errorIcon from '../../../../../../assets/schedule/offline_3x.png'

export const ErrorPage = () => {
  return (
    <div className={styles['wrapper-error']}>
      <img src={errorIcon} alt="" />
      <div>网络出错, 请点击刷新按钮</div>
    </div>
  )
}
