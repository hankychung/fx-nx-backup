import { produce } from 'immer'
import { IScheduleTask } from '@flyele-nx/service'
import { IState, useScheduleStore } from './useScheduleStore'
import dayjs from 'dayjs'
import { getKey, shouldInsertSchedule } from '.'

class ListHandler {
  private static insertTask(task: IScheduleTask) {
    const { schedule, finishSchedule } = useScheduleStore.getState()

    const { finish_time: finishTime } = task

    // 插入进完成列表
    if (finishTime) {
      const date = dayjs.unix(finishTime).format('YYYY-MM-DD')

      if (finishSchedule[date]) {
        // 存在该日期, 插入
        useScheduleStore.setState(
          produce((state: IState) => {
            state.finishSchedule[date].push(task.ref_task_id)
          })
        )
      }

      return
    }

    // 插入进未完成列表
    const insertDates = Object.keys(schedule).filter((date) =>
      shouldInsertSchedule({ date, task })
    )

    console.log('insertDates', insertDates)
  }

  static batchComplete({
    // 未完成列表中删除
    taskIds,
    // 已完成列表中加入
    taskRepeatIds
  }: {
    taskIds: string[]
    taskRepeatIds: string[]
  }) {
    const { schedule, finishSchedule, childrenDict, expandedDict, taskDict } =
      useScheduleStore.getState()

    this.removeTasks(taskIds)

    const needResetChildren: string[] = []

    useScheduleStore.setState(
      produce((state: IState) => {
        taskIds.forEach((taskId) => {
          // 从children中移除该完成事项
          Object.entries(childrenDict).forEach(([key, children]) => {
            console.log('key', key)
            if (children.includes(taskId)) {
              state.childrenDict[key] = children.filter((i) => i !== taskId)
            }
          })

          console.log('out', childrenDict, taskId, childrenDict[taskId])

          if (childrenDict[taskId]) {
            needResetChildren.push(...childrenDict[taskId])
            delete state.childrenDict[taskId]
          }
        })
      })
    )

    this.batchInsertCompleteTask(taskIds)
    this.resetChildren(needResetChildren)
  }

  private static removeTasks(taskIds: string[]) {
    const { schedule } = useScheduleStore.getState()

    useScheduleStore.setState(
      produce((state: IState) => {
        Object.entries(schedule).forEach(([date, list]) => {
          state.schedule[date] = list.filter((i) => !taskIds.includes(i))
        })
      })
    )
  }

  private static batchInsertCompleteTask(ids: string[]) {
    const finishDate = dayjs().format('YYYY-MM-DD')

    const { finishSchedule, taskDict } = useScheduleStore.getState()

    const insertKeys = ids.map((id) => {
      const task = taskDict[id]

      return task.repeat_id ? getKey(task) : task.ref_task_id
    })

    useScheduleStore.setState(
      produce((state: IState) => {
        if (finishSchedule[finishDate]) {
          state.finishSchedule[finishDate].push(...insertKeys)
        }
      })
    )
  }

  // 重新分配子事项的直属上级
  private static resetChildren(_children: string[]) {
    console.log('childre', _children)

    const { childrenDict, taskDict } = useScheduleStore.getState()

    const children = _children.map((k) => taskDict[k])

    useScheduleStore.setState(
      produce((state: IState) => {
        children.forEach(({ parent_id, ref_task_id }) => {
          if (!parent_id) return

          // 沿子事项的parentId逐级向上找
          for (const parent of parent_id.split(',').reverse()) {
            if (childrenDict[parent]) {
              state.childrenDict[parent].push(ref_task_id)

              return
            }
          }
        })
      })
    )
  }
}

export { ListHandler }
