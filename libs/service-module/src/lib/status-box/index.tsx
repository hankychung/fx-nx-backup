import { FC, memo, useMemo, useState } from 'react'
import { IScheduleTask, ScheduleTaskConst } from '@flyele-nx/service'
import styles from './index.module.scss'
import {
  CheckIcon,
  UncheckIcon,
  DisabledIcon,
  TimeCollectFinishIcon,
  TimeCollectIcon,
  CalendarIcon,
  CalendarFinish
} from '@flyele-nx/icon'
import checkingIcon from '../../assets/schedule/checking.gif'
import meetingFinishedIcon from '../../assets/schedule/meeting-finished.png'
import meetingIcon from '../../assets/schedule/meeting.png'
import { setTimeoutForIdleCallback } from '@flyele-nx/utils'
import { useMemoizedFn } from 'ahooks'

interface IProps {
  task: IScheduleTask
}

const ANIMATION_DURATION = 900

const _StatusBox: FC<IProps> = ({ task }) => {
  const [updating, setUpdating] = useState(false)
  // 非我执行
  const nonSelfExecution = useMemo(
    () => task.identity === 10804 || task.identity === 10811,
    [task]
  )

  const buildIcon = useMemoizedFn(() => {
    const { matter_type: matterType = 0, finish_time: finishTime } = task
    if (
      [
        ScheduleTaskConst.MatterType.matter,
        ScheduleTaskConst.MatterType.todo
      ].includes(matterType)
    ) {
      // 非我执行
      if (nonSelfExecution) return <DisabledIcon />
      // 完成动画
      if (updating)
        return (
          <img
            className={styles['checking']}
            src={checkingIcon}
            alt="checkingIcon"
          />
        )
      // 完成状态
      return task.finish_time ? <CheckIcon /> : <UncheckIcon />
    }

    if (ScheduleTaskConst.MatterType.meeting === matterType) {
      const icon = !finishTime ? meetingIcon : meetingFinishedIcon

      return <img className={styles.icon} src={icon} alt="" />
    }

    if (ScheduleTaskConst.MatterType.timeCollect === matterType) {
      return !finishTime ? <TimeCollectIcon /> : <TimeCollectFinishIcon />
    }

    if (ScheduleTaskConst.MatterType.calendar === matterType) {
      return !finishTime ? <CalendarIcon /> : <CalendarFinish />
    }
  })

  const handleComplete = async (e?: React.MouseEvent) => {
    e?.stopPropagation()
    setUpdating(true)
    await setTimeoutForIdleCallback({
      timer: ANIMATION_DURATION
    })
    setTimeout(() => {
      setUpdating(false)
    }, ANIMATION_DURATION)
  }

  return (
    <div className={styles['status-box']} onClick={handleComplete}>
      {buildIcon()}
    </div>
  )
}

export const StatusBox = memo(_StatusBox)
