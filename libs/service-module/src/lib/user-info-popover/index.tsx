import {
  FlyBasePopper,
  useController,
  FlyBasePopperCtrl
} from '@flyele/flyele-components'
import { InfoCard } from './components/info-card'
import styles from './index.module.scss'
import { ArrowDownIcon } from '@flyele-nx/icon'
import { useMemoizedFn } from 'ahooks'
import { Avatar } from './components/avatar'

export const UserInfoPopover = () => {
  const ctrl = useController(new FlyBasePopperCtrl())

  const closePopover = useMemoizedFn(() => {
    ctrl.hide()
  })

  return (
    <FlyBasePopper
      controller={ctrl}
      trigger="click"
      placement="top"
      content={<InfoCard closePopover={closePopover} />}
    >
      <div className={styles.userInfoPopover}>
        <Avatar size={26} />

        <div className={styles.arrowDown}>
          <ArrowDownIcon width={8} height={8} />
        </div>
      </div>
    </FlyBasePopper>
  )
}
