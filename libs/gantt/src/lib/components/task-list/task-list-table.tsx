import React, { useState } from 'react'
import styles from './task-list-table.module.css'
import { IFullViewTask, Task } from '@flyele-nx/types'
import { useProjectStore, zustandUtils } from '@flyele-nx/zustand-store'
import { getFakeItem } from '../../utils'
import { useGanttList } from '../../hooks/useScheduleList'
import useDomClickToHide from '../../hooks/useDomClickToHide'
import { useMemoizedFn } from 'ahooks'
import { FAKE_ID } from '@flyele-nx/constant'
import { TaskRow } from './components/task-row'

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
  const { batchUpdateActiveCell, taskDict, taskList } = useGanttList()
  const [showQuickEntry, setShowQuickEntry] = useState<boolean>(true)
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

  return (
    <div
      className={styles.taskListWrapper}
      style={{
        fontFamily: fontFamily,
        fontSize: fontSize
      }}
    >
      {/* {showQuickEntry && (
        <div
          className={cs(styles['create-wrapper'])}
          onClick={handleQuickCreate}
        >
          快速创建
        </div>
      )} */}
      {taskList.length > 0 &&
        taskList.map((item) => {
          const t = taskDict[item] as Task
          const taskId = zustandUtils.getProjectKey(t)

          return (
            <TaskRow
              id={taskId}
              taskId={taskId}
              t={t}
              key={taskId}
              rowHeight={rowHeight}
              rowWidth={rowWidth}
            ></TaskRow>
          )
        })}
    </div>
  )
}
