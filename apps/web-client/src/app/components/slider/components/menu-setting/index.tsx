import styles from './index.module.scss'
import { UserInfoPopover } from '@flyele-nx/service-module'

export const MenuSetting = () => {
  return (
    <div className={styles.menuSettingRoot}>
      <div className={styles.settingLeft}>
        <UserInfoPopover />
      </div>
      <div className={styles.settingRight}></div>
    </div>
  )
}
