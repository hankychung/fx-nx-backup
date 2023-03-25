import React from 'react'
import { message, Modal } from 'antd'
import { OrderSystemApi, OrderSystemType } from '@flyele-nx/service'
import styles from './index.module.scss'
import { FlyButton } from '@flyele/flyele-components'
import cs from 'classnames'
import { ReactComponent as CopyIcon } from '../../../../../assets/copyIcon.svg'
import ClipboardJS from 'clipboard'

export const OpenTaxModal = ({
  open,
  data,
  onFinish,
  onClose
}: {
  open: boolean
  data: OrderSystemType.IInvoiceList | null
  onFinish: () => void
  onClose: () => void
}) => {
  const [messageApi, contextHolder] = message.useMessage()

  const onClickBtn = async () => {
    if (data) {
      try {
        const { code } = await OrderSystemApi.finishInvoice(data.id)
        if (code === 0) {
          onFinish()
        }
      } catch (e) {
        console.log('开具发票失败')
      }
    }
  }

  /**
   * 复制
   */
  const onCopyTax = async (tax: string) => {
    const clipboard = new ClipboardJS('.copyIcon', {
      text: () => tax
    })
    clipboard.on('success', (e) => {
      messageApi.open({
        type: 'success',
        content: '复制成功'
      })
      clipboard.destroy()
    })
  }

  if (!data) return null

  return (
    <Modal
      open={open}
      width={534}
      centered
      destroyOnClose
      footer={null}
      onCancel={() => onClose()}
    >
      {contextHolder}
      <div className={styles.taxModalRoot}>
        <div className={styles.header}>
          <div className={styles.title}>
            请确认是否使用对应金额与公司信息开票
          </div>
          <div className={styles.desc}>{`订单号 ${data.indent_num}`}</div>
        </div>
        <div className={styles.content}>
          <div className={styles.contentLeft}>
            <div style={{ fontSize: '28px' }}>¥</div>
            <div>{data.total_price}</div>
          </div>
          <div className={styles.contentRight}>
            <div>{data.name}</div>
            <div
              className={cs('copyIcon', styles.iconBox)}
              onClick={() => onCopyTax(data.company_tax_number)}
            >
              <span>{data.company_tax_number}</span>
              <CopyIcon width={12} height={12} />
            </div>
          </div>
        </div>
        <div className={styles.footer}>
          <div className={styles.textBtn} onClick={onClose}>
            再看看
          </div>
          <FlyButton theme="primary" onClick={onClickBtn}>
            确认已开票
          </FlyButton>
        </div>
      </div>
    </Modal>
  )
}
