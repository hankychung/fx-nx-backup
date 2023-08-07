import React from 'react'
import styles from './task-list-table.module.css'
import { Task } from '@flyele-nx/types'
import { Title } from '../../Row/Title'
import { useUserInfoStore } from '@flyele-nx/zustand-store'
import { getId, getTimeTxt } from '../../utils'
import { useGanttList } from '../../hooks/useScheduleList'
import cs from 'classnames'
import useDomClickToHide from '../../hooks/useDomClickToHide'

export const TaskListTableDefault: React.FC<{
  rowHeight: number
  rowWidth: string
  fontFamily: string
  fontSize: string
  locale: string
  tasks: Task[]
  selectedTaskId: string
  setSelectedTask: (taskId: string) => void
  onExpanderClick: (task: Task) => void
}> = ({
  rowHeight,
  rowWidth,
  tasks,
  fontFamily,
  fontSize,
  locale,
  onExpanderClick
}) => {
  const { batchUpdateHoverId, hoverId, activeCell, batchUpdateActiveCell } =
    useGanttList()
  const userId = useUserInfoStore((state) => state.userInfo.user_id)

  useDomClickToHide(['.full-dose-row'], () => {
    batchUpdateActiveCell('')
  })
  return (
    <div
      className={styles.taskListWrapper}
      style={{
        fontFamily: fontFamily,
        fontSize: fontSize
      }}
    >
      {tasks.map((t) => {
        const id = getId(t)
        const taskId = t?.task_id + (t?.repeat_id ? t?.repeat_id : '')

        return (
          <div
            className={cs(styles.taskListTableRow, 'full-dose-row')}
            style={{
              height: rowHeight,
              background: id === hoverId ? 'rgba(29, 210, 193, 0.05)' : ''
            }}
            key={`${t.id}row`}
            onMouseEnter={() => {
              batchUpdateHoverId(id)
            }}
          >
            <div
              className={cs(styles.taskListCell, {
                [styles.taskListCellactive]: activeCell === `${taskId}-title`
              })}
              style={{
                minWidth: 186,
                maxWidth: 186,
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
              {getTimeTxt(t, true)}
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
              {getTimeTxt(t, false)}
            </div>
          </div>
        )
      })}
    </div>
  )
}
