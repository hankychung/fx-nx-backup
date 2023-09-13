import React from 'react'
import { Modal } from 'antd'
import styles from './index.module.scss'
import contactUsImg from '../../../assets/icons/contactUs.png'

const _ContactUsModal = ({
  open,
  onCancel
}: {
  open: boolean
  onCancel: () => void
}) => {
  return (
    <Modal
      title={null}
      footer={null}
      open={open}
      width={213}
      onCancel={onCancel}
    >
      <div className={styles.header}>
        <img className={styles.logo} src={contactUsImg} alt="contactUs" />
        <div className={styles.title}>Contact us</div>
      </div>
      <div className={styles.content}>
        you can contact us at the following email address
      </div>
      <div className={styles.email}>Flyele@flyele.net</div>
    </Modal>
  )
}

export const ContactUsModal = React.memo(_ContactUsModal)
