import React from 'react'
import { Modal } from 'antd'
import { CustomerServiceEmail } from '../customer-service-email'
import styles from './index.module.scss'

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
      width={320}
      onCancel={onCancel}
      closeIcon={false}
      className={styles.modalClass}
    >
      <CustomerServiceEmail onClose={onCancel} />
    </Modal>
  )
}

export const OverseasContactUsModal = React.memo(_ContactUsModal)
