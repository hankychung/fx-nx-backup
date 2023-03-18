import styles from './vipexpired-banner.module.scss'
import { ReactComponent as VipIcon } from './icons/vip.svg'

/* eslint-disable-next-line */
export interface VipexpiredBannerProps {
  handleConfirm: () => void
}

export function VipexpiredBanner({ handleConfirm }: VipexpiredBannerProps) {
  return (
    <div className={styles['vip-banner']}>
      <VipIcon />
      <div className={styles.txt}>
        会员已过期，不支持查看和使用视图，请开通会员
      </div>
      <div className={styles.btn} onClick={handleConfirm}>
        立即开通
      </div>
    </div>
  )
}

export default VipexpiredBanner
