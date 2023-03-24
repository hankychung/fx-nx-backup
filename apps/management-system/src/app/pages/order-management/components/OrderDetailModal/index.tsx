import React from 'react'
import { Modal } from 'antd'
import styles from './index.module.scss'

export const OrderDetailModal = ({
  open,
  onClickName,
  onClose
}: {
  open: boolean
  onClickName: () => void
  onClose: () => void
}) => {
  return (
    <Modal
      open={open}
      width={534}
      centered
      destroyOnClose
      footer={null}
      onCancel={() => onClose()}
    >
      <div className={styles.modalRoot}>
        <div className={styles.topBox}>
          <div className={styles.topRow}>
            <div className={styles.nameBox}>
              <span className={styles.name} onClick={() => onClickName()}>
                周杰伦
              </span>
              <span>的订单</span>
            </div>
            <div className={styles.orderNo}>{`订单号：OID4567890FGHB`}</div>
          </div>
          <div className={styles.topRow}>
            <div className={styles.memberState}>个人会员·1年</div>
            <div className={styles.moneyBox}>
              <span className={styles.moneyUnit}>¥</span>
              <span>149</span>
            </div>
          </div>
        </div>
        <div className={styles.contentBox}>
          <div className={styles.content}>
            {/*<div className={styles.}></div>*/}
          </div>
        </div>
      </div>
    </Modal>
  )
}
