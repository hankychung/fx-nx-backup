import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useMemo,
  useState
} from 'react'
import { MatterCreateCell } from '@flyele-nx/ui'
import styles from './index.module.scss'
import { FlagIcon, TimeIcon } from '@flyele-nx/icon'
import { useMemoizedFn } from 'ahooks'
import { MatterTimePicker, TabKey } from './components/matter-time-picker'
import { useCreatTaskTime } from './hooks/useCreatTaskTime'
import { FlyTextTooltip } from '@flyele/flyele-components'
import { getDate_MD_Week_Hm } from '@flyele-nx/utils'
import { ITimeProps } from '@flyele-nx/types'

interface IProps {
  timeData: ITimeProps | undefined
  executeAt: number
  setTimeData: Dispatch<SetStateAction<ITimeProps | undefined>>
  setExecuteAt: Dispatch<SetStateAction<number>>
}

const _TaskTimePicker = ({
  timeData,
  setTimeData,
  executeAt,
  setExecuteAt
}: IProps) => {
  const [showModal, setShowModal] = useState(false)
  const [modalTabKey, setModalTabKey] = useState<TabKey>(TabKey.time)

  const { timeText, onConfirmTime, initTimeData } = useCreatTaskTime({
    setTimeData
  })

  const showDatePicker = useMemoizedFn((type: TabKey) => {
    setModalTabKey(type)
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
        onClick={() => showDatePicker(TabKey.time)}
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
          onClick={() => showDatePicker(TabKey.executeAt)}
          img={() => <FlagIcon width={16} height={16} />}
        >
          <div className={styles.datePicker}>{`${getDate_MD_Week_Hm(
            executeAt
          )} 启动`}</div>
        </MatterCreateCell>
      )}

      <MatterTimePicker
        open={showModal}
        defaultActiveKey={modalTabKey}
        timeData={timeData}
        executeAt={executeAt}
        onClose={closeModal}
        onConfirmTime={(data) => {
          onConfirmTime(data)
          closeModal()
        }}
        onConfirmExecuteAt={(date) => {
          if (date) {
            setExecuteAt(date.unix())
          } else {
            setExecuteAt(0)
          }
          closeModal()
        }}
      />
    </>
  )
}

export const TaskTimePicker = React.memo(_TaskTimePicker)
