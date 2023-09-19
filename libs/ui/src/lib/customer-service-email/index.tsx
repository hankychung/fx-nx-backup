import React from 'react'
import { Close, EmailGreenIcon, LogoutIcon } from '@flyele-nx/icon'
import styles from './index.module.scss'
import { ReactComponent as CustomerModalBg } from '../../assets/icons/customer_modal_bg.svg'

interface Iprops {
  onClose: () => void
}

export const CustomerServiceEmail = (props: Iprops) => {
  const { onClose } = props

  return (
    <div className={styles.container}>
      <div className={styles.head}>
        <div className={styles.lable_customer}>
          <CustomerModalBg className={styles.bg} />
          <span>Contact us</span>
        </div>
        <Close
          className={styles.close}
          onClick={() => {
            onClose()
          }}
        />
      </div>
      <div className={styles.content}>
        <EmailGreenIcon className={styles.icon} />
        <div className={styles.title}>
          You can contact us at the following email address：
        </div>
        <div className={styles.email}>flyele@flyele.net</div>
      </div>
      <div className={styles.footer}>
        We are looking forward to hearing from you.
      </div>
    </div>
  )
}
