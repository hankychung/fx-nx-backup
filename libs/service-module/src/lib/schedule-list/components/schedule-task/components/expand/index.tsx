import React, { MouseEvent } from 'react'
import cs from 'classnames'
// import useSubscribe from '@/hooks/useSubscribe'
// import sub from 'constants/pubsub'
import { CircleArrowUpIcon, CircleArrowUpDarkIcon } from '@flyele-nx/icon'
import styles from './index.module.scss'
import { IScheduleTask } from '@flyele-nx/service'

interface IPROPExpand {
  task: IScheduleTask
  isExpanded: boolean
  toggleOpen: () => void
  isDarkMode?: boolean
  forceNotShowChildren?: boolean
}

export const Expand: React.FC<IPROPExpand> = ({
  task,
  isExpanded,
  toggleOpen,
  isDarkMode = false,
  forceNotShowChildren = false
}) => {
  const hasChild = task?.has_child ?? false

  const toggleExpand = (e: MouseEvent) => {
    e.stopPropagation()

    toggleOpen()
  }

  // useSubscribe({
  //   type: sub.LOCAL_UPDATE_SCHEDULE_ITEMS,
  //   handler: (list) => {
  //     if (!isProjectGroup) return
  //
  //     const ids = list.map((i) => i.task_id || i.ref_task_id)
  //
  //     if (ids.includes(taskId)) {
  //       setIsExpandState(false)
  //     }
  //   }
  // })

  if (
    // isInFinishedList 之前从 useContext 里面拿的，nx这没有
    // isInFinishedList ||
    forceNotShowChildren ||
    (task.finish_time && task.repeat_type !== undefined && !task.repeat_type)
  ) {
    return <div className={styles.nullChild} />
  }

  return (
    <div
      data-haschild={hasChild}
      className={cs(styles.expandArrow, {
        [styles.expand]: isExpanded
      })}
      onClick={toggleExpand}
    >
      {isDarkMode ? (
        <CircleArrowUpDarkIcon width={20} height={20} />
      ) : (
        <CircleArrowUpIcon width={20} height={20} />
      )}
    </div>
  )
}
