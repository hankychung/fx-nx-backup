import React, { useMemo } from 'react'
import { IScheduleTaskTime } from '../../utils'
import styles from './index.module.scss'
import cs from 'classnames'
import { ScheduleTask } from '../../../schedule-list/components/schedule-task'
import dayjs from 'dayjs'

const _TimelineTaskList = ({
  timeList,
  day,
  showTimeText = true
}: {
  timeList: IScheduleTaskTime[]
  day: string
  showTimeText?: boolean
}) => {
  const lastIndex = useMemo(() => {
    return timeList.length - 1
  }, [timeList.length])

  return (
    <>
      {timeList.map((item, index) => {
        return (
          <div key={item.tTime} className={styles.listRoot}>
            <div
              className={cs(styles.listLeft, {
                [styles.dashed]: lastIndex !== index && showTimeText
              })}
            >
              {showTimeText && (
                <div className={styles.text}>{item.tTimeTxt}</div>
              )}
            </div>
            <div className={styles.listRight}>
              {item.taskItems.map((task) => {
                return (
                  <ScheduleTask
                    key={task.ref_task_id}
                    taskKey={task.ref_task_id}
                    topId={
                      task.parents && task.parents.length
                        ? task.parents[0].task_id
                        : task.ref_task_id
                    }
                    date={day}
                    curTime={dayjs().unix()}
                    isTimeLine={true}
                    isSimple={true}
                  />
                )
              })}
            </div>
          </div>
        )
      })}
    </>
  )
}

export const TimelineTaskList = React.memo(_TimelineTaskList)
