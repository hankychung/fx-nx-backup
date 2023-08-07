import styles from './index.module.scss'
import { useUserInfoStore } from '@flyele-nx/zustand-store'
import { InfoName } from './components/info-name/InfoName'
import { Logout } from './components/logout'
import { PromotionsCard } from './components/promotions-card'
import { EnterpriseCard } from './components/enterprise-card'
import { VipCard } from './components/vip-card'

export const InfoCard = ({ closePopover }: { closePopover: () => void }) => {
  const { isEnterprise } = useUserInfoStore()

  return (
    <div className={styles.infoCardRoot}>
      <div className={styles.header}>
        <InfoName />
      </div>
      {!isEnterprise && (
        <PromotionsCard
          title="限时活动：每邀请1个新用户注册，免费得5天团队会员"
          className={styles.promotionsCard}
          onCallback={closePopover}
        />
      )}
      <div className={styles.vipCardBox}>
        {isEnterprise ? <EnterpriseCard /> : <VipCard cb={closePopover} />}
      </div>
      <div className={styles.footer}>
        <Logout cb={closePopover} />
      </div>
    </div>
  )
}
