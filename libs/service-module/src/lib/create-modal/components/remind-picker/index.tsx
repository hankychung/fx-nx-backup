import React, { useState } from 'react'
import { MatterCreateCell } from '@flyele-nx/ui'
import styles from './index.module.scss'
import { NoticeIcon } from '@flyele-nx/icon'
import { useMemoizedFn, useDeepCompareEffect } from 'ahooks'
import { Popover } from 'antd'
import { RemindList } from './components/remind-list'
import { ITimeProps } from '@flyele-nx/types'
import { ValidRuleType } from '@flyele-nx/constant'
import { getDefaultRulesIntoState } from '@flyele-nx/utils'
import { Dayjs } from 'dayjs'

interface IProps {
  timeData: ITimeProps | undefined
}

export interface ICustomRemind {
  remindList: { time: Dayjs; timeTxt?: string }[]
  total: number
}

const _RemindPicker = ({ timeData }: IProps) => {
  const [open, setOpen] = useState(false)

  const [remindData, setRemindData] = useState<[string[], string[]]>([[], []])
  const [customRemindData, setCustomRemindData] = useState<
    ICustomRemind | undefined
  >({ remindList: [], total: 0 })
  const [ruleList, setRuleList] = useState<Array<ValidRuleType<'all'>>>([])

  const showPicker = useMemoizedFn(() => {
    console.log('showPicker')
  })

  const handleOpenChange = useMemoizedFn((newOpen: boolean) => {
    setOpen(newOpen)
  })

  useDeepCompareEffect(() => {
    if (!timeData) return

    console.log('@@@ timeData', timeData)
    const { remindDataPre, ruleListPre } = getDefaultRulesIntoState(timeData)

    setRemindData(remindDataPre)
    setRuleList(ruleListPre)
  }, [timeData])

  return (
    <Popover
      trigger="click"
      open={open}
      onOpenChange={handleOpenChange}
      arrow={false}
      placement="bottomLeft"
      content={
        <RemindList
          remindData={remindData}
          ruleList={ruleList}
          setRemindData={setRemindData}
          setCustomRemindData={setCustomRemindData}
        />
      }
      overlayClassName={styles.remindModal}
    >
      <MatterCreateCell
        isMatterCreate
        onClick={showPicker}
        img={() => <NoticeIcon width={16} height={16} />}
      >
        <div className={styles.remindPicker}>remind</div>
      </MatterCreateCell>
    </Popover>
  )
}

export const RemindPicker = React.memo(_RemindPicker)
