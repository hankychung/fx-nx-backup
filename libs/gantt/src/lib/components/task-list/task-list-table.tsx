import React, { useEffect, useMemo, useState } from 'react'
import styles from './task-list-table.module.css'
import { IFullViewTask, Task } from '@flyele-nx/types'
import { Title } from '../../Row/Title'
import { useProjectStore, useUserInfoStore } from '@flyele-nx/zustand-store'
import { getFakeItem, getId } from '../../utils'
import { useGanttList } from '../../hooks/useScheduleList'
import cs from 'classnames'
import useDomClickToHide from '../../hooks/useDomClickToHide'
import { Time } from '../../Row/Time'
import { useMemoizedFn } from 'ahooks'
import { FAKE_ID } from '@flyele-nx/constant'
import { getParentNode } from '@flyele-nx/utils'

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
  const {
    batchUpdateHoverId,
    hoverId,
    activeCell,
    batchUpdateActiveCell,
    taskDict,
    taskList
  } = useGanttList()
  const [showQuickEntry, setShowQuickEntry] = useState<boolean>(true)
  const userId = useUserInfoStore((state) => state.userInfo.user_id)
  useDomClickToHide(['.full-dose-row'], () => {
    batchUpdateActiveCell('')
    setTimeout(() => {
      if (!showQuickEntry) {
        setShowQuickEntry(true)
      }
    }, 100)
  })

  const handleQuickCreate = useMemoizedFn(() => {
    useProjectStore.setState({
      taskList: [FAKE_ID, ...taskList]
    })
    const dict: { [k: string]: IFullViewTask } = {}
    dict[FAKE_ID] = getFakeItem()
    useProjectStore.setState({
      taskDict: {
        ...taskDict,
        ...dict
      }
    })
    setShowQuickEntry(false)
  })

  console.log(taskList, 'taskList')

  return (
    <div
      className={styles.taskListWrapper}
      style={{
        fontFamily: fontFamily,
        fontSize: fontSize
      }}
    >
      {showQuickEntry && (
        <div
          className={cs(styles['create-wrapper'])}
          onClick={handleQuickCreate}
        >
          快速创建
        </div>
      )}
      {taskList.map((item) => {
        const t = taskDict[item] as Task
        const id = getId(t)
        const taskId = t?.task_id + (t?.repeat_id ? t?.repeat_id : '')

        return (
          <div
            className={cs(styles.taskListTableRow, 'full-dose-row')}
            style={{
              height: rowHeight,
              background: id === hoverId ? 'rgba(29, 210, 193, 0.05)' : ''
            }}
            key={`${t.task_id}row`}
            onMouseEnter={() => {
              batchUpdateHoverId(id)
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
        )
      })}
    </div>
  )
}
