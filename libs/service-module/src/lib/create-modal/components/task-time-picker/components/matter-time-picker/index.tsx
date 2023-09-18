import React from 'react'
import { Modal, Tabs } from 'antd'
import styles from './index.module.scss'
import {
  IRepeatData,
  DateSelector
} from '../../../../../time-component/date-selector'
import { ExecuteAtSelector } from '../../../../../time-component/execute-at-selector'
import { ITimeProps } from '@flyele-nx/types'
import { Dayjs } from 'dayjs'

export enum TabKey {
  time = 'time',
  executeAt = 'execute_at'
}

interface IProps {
  open: boolean
  onClose: () => void
  defaultActiveKey?: TabKey
  repeatData?: IRepeatData
  onConfirmTime: (data: ITimeProps) => void
  onConfirmExecuteAt: (data: Dayjs | undefined) => void
  timeData?: ITimeProps
  executeAt?: number
}

const _MatterTimePicker = ({
  open,
  onClose,
  repeatData,
  defaultActiveKey = TabKey.time,
  onConfirmTime,
  timeData,
  executeAt,
  onConfirmExecuteAt
}: IProps) => {
  return (
    <Modal
      open={open}
      centered
      width={375}
      mask={false}
      footer={null}
      destroyOnClose
      onCancel={onClose}
      className={styles.modalRoot}
    >
      <Tabs
        className={styles.tabsRoot}
        tabBarStyle={{ paddingLeft: 20 }}
        defaultActiveKey={defaultActiveKey}
        items={[
          {
            key: TabKey.time,
            label: '事项时间',
            children: (
              <DateSelector
                defaultValue={timeData}
                repeatData={repeatData}
                onClose={onClose}
                onConfirm={onConfirmTime}
              />
            )
          },
          {
            key: TabKey.executeAt,
            label: '启动时间',
            children: (
              <ExecuteAtSelector
                defaultValue={executeAt}
                endTime={timeData?.endTime}
                onClose={onClose}
                onConfirm={onConfirmExecuteAt}
              />
            )
          }
        ]}
      />
    </Modal>
  )
}

export const MatterTimePicker = React.memo(_MatterTimePicker)
