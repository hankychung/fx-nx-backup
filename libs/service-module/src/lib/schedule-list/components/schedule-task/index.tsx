import { FC, memo } from 'react'
import { shallow } from 'zustand/shallow'
import { TaskApi } from '@flyele-nx/service'
import { useScheduleStore } from '../../utils/useScheduleStore'
import { getChildrenDict } from '../../utils'
import style from './index.module.scss'
import { useMemoizedFn } from 'ahooks'
import cs from 'classnames'
import { TaskHandler } from '../../utils/taskHandler'

interface IProps {
  taskKey: string
  date: string
}

const _ScheduleTask: FC<IProps> = ({ taskKey, date }) => {
  const data = useScheduleStore((state) => state.taskDict[taskKey])
  const children = useScheduleStore((state) => state.childrenDict[taskKey])
  const isExpanded = useScheduleStore((state) => {
    const dict = state.expandedDict[date]

    if (!dict) return false

    return Boolean(dict[taskKey])
  })

  const { updateExpandedDict, batchUpdateChildDict, updateTask } =
    useScheduleStore(
      (state) => ({
        updateTask: state.updateTask,
        updateExpandedDict: state.updateExpandedDict,
        batchUpdateChildDict: state.batchUpdateChildDict
      }),
      shallow
    )

  const toggleOpen = useMemoizedFn(async () => {
    if (!data) return

    const { ref_task_id } = data

    const shouldRequest =
      !isExpanded && !useScheduleStore.getState().childrenDict[ref_task_id]

    if (shouldRequest) {
      const { data: tasks } = await TaskApi.getScheduleTree({
        taskId: ref_task_id
      })

      const childrenDict = getChildrenDict({
        tasks,
        originalId: ref_task_id
      })

      tasks.forEach((child) => {
        updateTask({
          key: child.ref_task_id,
          task: {
            ...child,
            has_child: Boolean(childrenDict[child.ref_task_id])
          }
        })
      })

      batchUpdateChildDict(childrenDict)
    }

    updateExpandedDict({ date, taskId: taskKey, isExpanded: !isExpanded })
  })

  if (!data) return null

  return (
    <div className={cs(style['schedule-task'])}>
      <div className={style.title}>
        <div>{data.title}</div>
        <div
          onClick={() => {
            TaskHandler.modify({
              key: data.ref_task_id,
              diff: {
                title: 'changing'
              }
            })
          }}
        >
          modify
        </div>
        {data.has_child && (
          <div onClick={toggleOpen}>{isExpanded ? 'close' : 'open'}</div>
        )}
      </div>
      {children && isExpanded && (
        <div>
          {children.map((i) => (
            <ScheduleTask date={date} key={i} taskKey={i} />
          ))}
        </div>
      )}
    </div>
  )
}

export const ScheduleTask = memo(_ScheduleTask)
