import React, { useMemo } from 'react'
import { Modal } from 'antd'
import styles from './index.module.scss'
import { FlyButton } from '@flyele/flyele-components'
import cs from 'classnames'
import { OrderSystemType } from '@flyele-nx/service'

export const PersonalDetailModal = ({
  open,
  data,
  onClose,
  showOrder
}: {
  open: boolean
  data: OrderSystemType.IIndentList | null
  onClose: () => void
  showOrder: (data: OrderSystemType.IIndentList | null) => void
}) => {
  const formData = useMemo(() => {
    return [
      {
        key: 'personalState',
        title: '个人会员状态',
        value: '已开通 · 有效期至2023年10月29日'
      },
      {
        key: 'teamState',
        title: '团队会员状态',
        value: '未开通',
        extendCls: styles.greyText
      },
      {
        key: 'telephone',
        title: '手机号',
        value: '13800138000'
      }
    ]
  }, [])

  return (
    <Modal
      open={open}
      width={400}
      centered
      destroyOnClose
      footer={null}
      onCancel={onClose}
    >
      <div className={styles.modalRoot}>
        <div className={styles.topBox}>
          <div className={styles.userName}>周杰伦</div>
          <div className={styles.descBox}>
            <div>UID1291329051829</div>
            <div className={styles.time}>于2022年10月24日注册</div>
          </div>
        </div>
        <div className={styles.divider} />
        <div className={styles.content}>
          {formData.map((item) => {
            return (
              <div key={item.key} className={styles.row}>
                <div className={styles.rowLeft}>{item.title}</div>
                <div className={cs(styles.rowRight, item.extendCls)}>
                  {item.value}
                </div>
              </div>
            )
          })}
        </div>
        <div className={styles.footer}>
          <FlyButton theme="primary" onClick={() => showOrder(data)}>
            查看TA的订单
          </FlyButton>
        </div>
      </div>
    </Modal>
  )
}
