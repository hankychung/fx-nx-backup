import { FC, memo, useMemo, useState } from 'react'
import { IScheduleTask, MatterType } from '@flyele-nx/service'
import styles from './index.module.scss'
import {
  CheckIcon,
  UncheckIcon,
  DisabledIcon,
  TimeCollectFinishIcon,
  TimeCollectIcon,
  CalendarIcon,
  CalendarFinish,
  MeetingIcon,
  MeetingFinishedIcon
} from '@flyele-nx/icon'
import checkingIcon from '../../assets/schedule/checking.gif'
import meetingFinishedIcon from '../../assets/schedule/meeting-finished.png'
import meetingIcon from '../../assets/schedule/meeting.png'
import { setTimeoutForIdleCallback } from '@flyele-nx/utils'
import { useMemoizedFn } from 'ahooks'

interface IProps {
  task: Pick<IScheduleTask, 'matter_type' | 'identity' | 'finish_time'>
  changeStatus?: () => void
  resetStatus?: () => void
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
    if ([MatterType.事项, MatterType.待办].includes(matterType)) {
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

    if (MatterType.会议 === matterType) {
      return !finishTime ? <MeetingIcon /> : <MeetingFinishedIcon />
    }

    if (MatterType.时间征集 === matterType) {
      return !finishTime ? <TimeCollectIcon /> : <TimeCollectFinishIcon />
    }

    if (MatterType.日历导入 === matterType) {
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
