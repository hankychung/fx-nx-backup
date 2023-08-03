import cs from 'classnames'
import styles from './index.module.scss'
import { FlyAvatar } from '@flyele/flyele-components'
import { useUserInfoStore } from '@flyele-nx/zustand-store'
import { useCheckVip } from '@flyele-nx/utils'

export const Avatar = ({ size }: { size: number }) => {
  const { avatar } = useUserInfoStore((state) => state.userInfo)
  const { isVip, isTeamVip, isExpiredVip } = useCheckVip()
  return (
    <FlyAvatar
      src={avatar}
      size={size}
      overlayClassName={cs(
        isTeamVip && !isExpiredVip
          ? styles['global-style-team-vip']
          : isVip && !isExpiredVip
          ? styles['global-style-person-vip']
          : ''
      )}
    />
  )
}
