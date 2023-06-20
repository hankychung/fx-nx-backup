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

  // 完成事项
  static batchComplete(taskIds: string[]) {
    // 从未完成列表移除已完成事项
    this.removeTasks(taskIds, { type: 'schedule' })

    // 重置已完成事项的上下级关系
    const { needResetChildren } = this.resetRelation(taskIds)

    this.resetSuper(needResetChildren)

    // 操作了子事项字典, 需要更新父事项的收合/是否有子信息
    this.checkToClearChildren()

    // 将已完成事项插入完成列表
    this.insertCompleteTasks(taskIds)
  }

  // 重启事项
  static batchReopen(keysWithRepeatIds: string[]) {
    // 从完成列表移除重启事项
    this.removeTasks(keysWithRepeatIds, { type: 'finishSchedule' })

    //
  }

  private static resetRelation(taskIds: string[]) {
    const { childrenDict } = useScheduleStore.getState()
    const needResetChildren: string[] = []

    useScheduleStore.setState(
      produce((state: IState) => {
        taskIds.forEach((taskId) => {
          // 找到该事项所属父事项字典, 脱离关系
          Object.entries(childrenDict).forEach(([key, children]) => {
            if (children.includes(taskId)) {
              state.childrenDict[key] = children.filter((i) => i !== taskId)
            }
          })

          if (childrenDict[taskId]) {
            // 记录该事项下的子事项, 用于重新分配其上级
            needResetChildren.push(...childrenDict[taskId])
            // 删除该事项下的子事项关系
            delete state.childrenDict[taskId]
          }
        })
      })
    )

    return { needResetChildren }
  }

  // 父事项下的子事项已经全部不在, 更新父事项的has_child以及清除收合状态
  private static checkToClearChildren() {
    const { childrenDict } = useScheduleStore.getState()

    const ids = Object.keys(childrenDict)

    useScheduleStore.setState(
      produce((state: IState) => {
        ids.forEach((key) => {
          // 先判断该父事项是否无子
          if (childrenDict[key]?.length) return

          delete state.childrenDict[key]

          state.taskDict[key].has_child = false

          Object.entries(state.expandedDict).forEach(([date, dict]) => {
            if (dict[key]) {
              delete state.expandedDict[date][key]
            }
          })
        })
      })
    )
  }

  // 批量移除事项
  private static removeTasks(
    taskIds: string[],
    options: {
      type: 'schedule' | 'finishSchedule'
    }
  ) {
    const { schedule, finishSchedule } = useScheduleStore.getState()

    const l = options.type === 'finishSchedule' ? finishSchedule : schedule

    useScheduleStore.setState(
      produce((state: IState) => {
        Object.entries(l).forEach(([date, list]) => {
          state[options.type][date] = list.filter((i) => !taskIds.includes(i))
        })
      })
    )
  }

  // 批量插入未完成列表
  private static insertTasks(tasks: IScheduleTask[]) {}

  // 批量插入已完成列表
  private static insertCompleteTasks(ids: string[]) {
    const finishDate = dayjs().format('YYYY-MM-DD')

    const { finishSchedule, taskDict } = useScheduleStore.getState()

    const insertKeys = ids.map((id) => {
      const task = taskDict[id]

      return getKey(task)
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
  private static resetSuper(ids: string[]) {
    const { childrenDict, taskDict } = useScheduleStore.getState()

    const children = ids.map((k) => taskDict[k])

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
