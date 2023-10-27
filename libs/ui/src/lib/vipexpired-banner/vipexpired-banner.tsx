import { I18N } from '@flyele-nx/i18n'
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
      <div className={styles.txt}>{I18N.common.memberHasExpired}</div>
      <div className={styles.btn} onClick={handleConfirm}>
        {I18N.common.activate_now}
      </div>
    </div>
  )
}

export default VipexpiredBanner
