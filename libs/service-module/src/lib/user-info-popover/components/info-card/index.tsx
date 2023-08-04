import styles from './index.module.scss'
import { useUserInfoStore } from '@flyele-nx/zustand-store'
import { InfoName } from './components/info-name/InfoName'
import { Logout } from './components/logout'

export const InfoCard = ({ closePopover }: { closePopover: () => void }) => {
  const { isEnterprise } = useUserInfoStore()

  return (
    <div className={styles.infoCardRoot}>
      <div className={styles.header}>
        <InfoName />
      </div>
      {!isEnterprise && <div>PromotionsCard</div>}
      <div>{isEnterprise ? <div>EnterpriseCard</div> : <div>VipCard</div>}</div>
      <div className={styles.footer}>
        <Logout cb={closePopover} />
      </div>
    </div>
  )
}
