import { useState } from 'react'
import { InfoCard } from './components/info-card'
import styles from './index.module.scss'
import { ArrowDownIcon } from '@flyele-nx/icon'
import { Avatar } from './components/avatar'
import { Popover } from 'antd'

export const UserInfoPopover = () => {
  const [open, setOpen] = useState(false)

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen)
  }

  return (
    <Popover
      open={open}
      trigger="click"
      placement="top"
      content={() => <InfoCard closePopover={() => handleOpenChange(false)} />}
      onOpenChange={handleOpenChange}
      overlayInnerStyle={{
        padding: 0
      }}
    >
      <div className={styles.userInfoPopover}>
        <Avatar size={26} />

        <div className={styles.arrowDown}>
          <ArrowDownIcon width={8} height={8} />
        </div>
      </div>
    </Popover>
  )
}
