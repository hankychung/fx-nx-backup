import React, { useEffect, useMemo, useState } from 'react'
import { MatterCreateCell } from '@flyele-nx/ui'
import styles from './index.module.scss'
import { FlagIcon, TimeIcon } from '@flyele-nx/icon'
import { useMemoizedFn } from 'ahooks'
import { MatterTimePicker, TabKey } from './components/matter-time-picker'
import { useCreatTaskTime } from './hooks/useCreatTaskTime'
import { FlyTextTooltip } from '@flyele/flyele-components'

const _TaskTimePicker = () => {
  const [showModal, setShowModal] = useState(false)
  const [modalTabKey, setModalTabKey] = useState<TabKey>(TabKey.time)

  // 启动时间
  const [executeAt, setExecuteAt] = useState<number>(0)

  const { timeData, timeText, onConfirmTime, initTimeData } = useCreatTaskTime()

  const showDatePicker = useMemoizedFn(() => {
    setShowModal(true)
  })

  const closeModal = useMemoizedFn(() => {
    setShowModal(false)
  })

  /**
   * 详细创建的待安排字段判断
   */
  const arrangeTxt = useMemo(() => {
    // TODO 后续有 createType 再加入
    // return createType === CreateType.MATTER && !loopData.loopVal
    // return !loopData.loopVal
    //   ? '待安排'
    //   : '添加时间'
    return '待安排'
  }, [])

  useEffect(() => {
    initTimeData()
  }, [initTimeData])

  return (
    <>
      <MatterCreateCell
        isMatterCreate
        onClick={showDatePicker}
        img={() => <TimeIcon width={16} height={16} />}
      >
        <div className={styles.datePicker}>
          {timeText === '添加时间' ? (
            <div className={styles.timeText}>{arrangeTxt}</div>
          ) : (
            <FlyTextTooltip text={timeText} className={styles.timeText} />
          )}
        </div>
      </MatterCreateCell>

      {!!executeAt && (
        <MatterCreateCell
          isMatterCreate
          onClick={showDatePicker}
          img={() => <FlagIcon width={16} height={16} />}
        >
          <div className={styles.datePicker}>{executeAt}</div>
        </MatterCreateCell>
      )}

      <MatterTimePicker
        open={showModal}
        defaultActiveKey={modalTabKey}
        timeData={timeData}
        onClose={closeModal}
        onConfirmTime={(data) => {
          onConfirmTime(data)
          closeModal()
        }}
      />
    </>
  )
}

export const TaskTimePicker = React.memo(_TaskTimePicker)
