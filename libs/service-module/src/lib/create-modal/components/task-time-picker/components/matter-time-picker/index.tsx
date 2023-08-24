import React from 'react'
import { Modal, Tabs } from 'antd'
import styles from './index.module.scss'
import {
  IRepeatData,
  TimeSelector
} from '../../../../../time-component/time-selector'
import { ExecuteAtSelector } from '../../../../../time-component/execute-at-selector'
import { ITimeProps } from '@flyele-nx/types'

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
  timeData?: ITimeProps
}

const _MatterTimePicker = ({
  open,
  onClose,
  repeatData,
  defaultActiveKey = TabKey.time,
  onConfirmTime,
  timeData
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
      <div className={styles.time_modal_content}>
        <Tabs
          className={styles.tabsRoot}
          tabBarStyle={{ paddingLeft: 20 }}
          defaultActiveKey={defaultActiveKey}
          items={[
            {
              key: TabKey.time,
              label: '事项时间',
              children: (
                <TimeSelector
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
                  onClose={onClose}
                  onConfirm={(date) => {
                    console.log('@@ date', date)
                    onClose()
                  }}
                />
              )
            }
          ]}
        />
      </div>
    </Modal>
  )
}

export const MatterTimePicker = React.memo(_MatterTimePicker)
