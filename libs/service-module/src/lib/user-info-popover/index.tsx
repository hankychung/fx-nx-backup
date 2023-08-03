import { useUserInfoStore } from '@flyele-nx/zustand-store'
import { useCheckVip } from '@flyele-nx/utils'
import { FlyBasePopper, FlyAvatar } from '@flyele/flyele-components'
import cs from 'classnames'
import { InfoCard } from './components/info-card'
import styles from './index.module.scss'
import { ArrowDownIcon } from '@flyele-nx/icon'

export const UserInfoPopover = () => {
  const { avatar } = useUserInfoStore((state) => state.userInfo)
  const { isVip, isTeamVip, isExpiredVip } = useCheckVip()

  return (
    <FlyBasePopper trigger="click" placement="top" content={<InfoCard />}>
      <div className={styles.userInfoPopover}>
        <FlyAvatar
          src={avatar}
          size={26}
          overlayClassName={cs(
            isTeamVip && !isExpiredVip
              ? styles['global-style-team-vip']
              : isVip && !isExpiredVip
              ? styles['global-style-person-vip']
              : ''
          )}
        />

        <div className={styles.arrowDown}>
          <ArrowDownIcon width={8} height={8} />
        </div>
      </div>
    </FlyBasePopper>
  )
}
