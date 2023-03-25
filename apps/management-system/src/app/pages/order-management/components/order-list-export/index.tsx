import React, { useState } from 'react'
import { Modal, DatePicker, message } from 'antd'
import type { DatePickerProps } from 'antd'
import styles from './index.module.scss'
import { FlyButton } from '@flyele/flyele-components'
import dayjs from 'dayjs'
import { useMemoizedFn } from 'ahooks'

export const OrderListExport = ({
  open,
  onExport,
  onClose
}: {
  open: boolean
  onExport: (start: number, end: number) => void
  onClose: () => void
}) => {
  const [messageApi, contextHolder] = message.useMessage()

  const [startDate, setStartDate] = useState(0)
  const [endDate, setEndDate] = useState(0)

  const onChangeStartDate: DatePickerProps['onChange'] = (date, dateString) => {
    if (dateString) {
      setStartDate(dayjs(dateString).unix())
    } else {
      setStartDate(0)
    }
  }

  const onChangeEndDate: DatePickerProps['onChange'] = (date, dateString) => {
    if (dateString) {
      setEndDate(dayjs(dateString).unix())
    } else {
      setEndDate(0)
    }
  }

  const exportOrderList = useMemoizedFn(() => {
    if (startDate === 0 || endDate === 0) {
      messageApi.open({
        type: 'warning',
        content: '请选择日期'
      })
    } else {
      onExport(startDate, endDate)
    }
  })

  return (
    <Modal
      open={open}
      width={400}
      centered
      destroyOnClose
      footer={null}
      onCancel={onClose}
    >
      {contextHolder}
      <div className={styles.modalRoot}>
        <div className={styles.modalTitle}>选择导出范围</div>
        <div className={styles.content}>
          <div className={styles.row}>
            <div className={styles.title}>开始时间</div>
            <div className={styles.timeBox}>
              <DatePicker onChange={onChangeStartDate} />
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles.title}>结束时间</div>
            <div className={styles.timeBox}>
              <DatePicker onChange={onChangeEndDate} />
            </div>
          </div>
        </div>
        <div className={styles.footer}>
          <FlyButton theme="primary" onClick={exportOrderList}>
            导出订单
          </FlyButton>
        </div>
      </div>
    </Modal>
  )
}
