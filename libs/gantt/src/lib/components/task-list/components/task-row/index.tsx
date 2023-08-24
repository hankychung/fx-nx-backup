import React, { useState } from 'react'
import styles from './index.module.css'
import { Task } from '@flyele-nx/types'
import { Title } from '../../../../Row/Title'
import {
  useProjectStore,
  useUserInfoStore,
  zustandUtils
} from '@flyele-nx/zustand-store'
import { useGanttList } from '../../../../hooks/useScheduleList'
import cs from 'classnames'
import useDomClickToHide from '../../../../hooks/useDomClickToHide'
import { Time } from '../../../../Row/Time'
import { TaskChildRow } from '../task-child-row'
import { getId } from '../../../../utils/index'

export const TaskRow: React.FC<{
  rowHeight: number
  rowWidth: string
  id: string
  taskId: string
  t: Task
}> = ({ rowHeight, rowWidth, id, taskId, t }) => {
  const {
    batchUpdateHoverId,
    hoverId,
    activeCell,
    batchUpdateActiveCell,
    taskDict,
    childrenDict
  } = useGanttList()
  const [showQuickEntry, setShowQuickEntry] = useState<boolean>(true)
  const userId = useUserInfoStore((state) => state.userInfo.user_id)

  const isExpanded = useProjectStore((state) => {
    const dict = state.expandDict

    if (!dict) return false

    return Boolean(dict[taskId])
  })

  useDomClickToHide(['.full-dose-row'], () => {
    batchUpdateActiveCell('')
    setTimeout(() => {
      if (!showQuickEntry) {
        setShowQuickEntry(true)
      }
    }, 100)
  })

  return (
    <>
      {' '}
      <div
        className={cs(styles.taskListTableRow, 'full-dose-row')}
        style={{
          height: rowHeight,
          background: taskId === hoverId ? 'rgba(29, 210, 193, 0.05)' : ''
        }}
        key={`${t.task_id}row`}
        onMouseEnter={() => {
          batchUpdateHoverId(taskId)
        }}
      >
        <div
          className={cs(styles.taskListCell, {
            [styles.taskListCellactive]: activeCell === `${taskId}-title`
          })}
          style={{
            minWidth: 240,
            maxWidth: 240,
            paddingLeft: 16
          }}
          onClick={() => {
            batchUpdateActiveCell(`${taskId}-title`)
          }}
        >
          <Title data={t} userId={userId} />
        </div>

        <div
          className={styles.taskListCell}
          style={{
            minWidth: rowWidth,
            maxWidth: rowWidth,
            paddingLeft: 12
          }}
        >
          <Time data={t} isStart={true}></Time>
        </div>
        <div
          className={styles.taskListCell}
          style={{
            minWidth: rowWidth,
            maxWidth: rowWidth,
            paddingLeft: 12,
            borderRight: 'none'
          }}
        >
          <Time data={t} isStart={false}></Time>
        </div>
      </div>
      {t.has_child && isExpanded && (
        <>
          {childrenDict[taskId] &&
            childrenDict[taskId].map((item) => {
              const t = taskDict[item] as Task
              const id = getId(t)
              const taskId = zustandUtils.getProjectKey(t)

              return (
                <TaskChildRow
                  id={id}
                  taskId={taskId}
                  t={t}
                  key={taskId}
                  rowHeight={rowHeight}
                  rowWidth={rowWidth}
                ></TaskChildRow>
              )
            })}
        </>
      )}
    </>
  )
}
