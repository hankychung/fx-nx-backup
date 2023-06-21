import { produce } from 'immer'
import { useScheduleStore, IState } from './useScheduleStore'
import { IScheduleTask } from '@flyele-nx/service'
import { ListHandler } from './listHandler'
import { getKey } from '.'

class TaskHandler {
  static batchModify({
    keys,
    diff,
    keysWithRepeatIds
  }: {
    keys: string[]
    diff: Partial<IScheduleTask>
    keysWithRepeatIds: string[]
  }) {
    // TODO: 更新事项需要考虑带taskDict中带有repeatId的
    useScheduleStore.setState(
      produce((state: IState) => {
        keys.forEach((key) => {
          const task = state.taskDict[key]

          state.taskDict[key] = {
            ...task,
            ...diff
          }

          // 精准更新, 带repeatId
          if ('finish_time' in diff) {
            state.taskDict[getKey(task)] = {
              ...task,
              ...diff
            }
          }
        })
      })
    )

    // 完成/重启事项
    if ('finish_time' in diff) {
      if (diff.finish_time) {
        // 完成事项
        ListHandler.batchComplete(keys)
      } else {
        // 重启事项
        ListHandler.batchReopen(keysWithRepeatIds)
      }

      return
    }

    // 置顶
    if ('topmost_at' in diff) {
      ListHandler.sortListByTask(keys)
    }
  }

  static removeTasks(ids: string[]) {
    useScheduleStore.setState(
      produce((state: IState) => {
        const { schedule, finishSchedule } = state

        Object.keys(schedule).forEach((date) => {
          state.schedule[date] = schedule[date].filter(
            (id) => !ids.includes(id)
          )

          state.finishSchedule[date] = finishSchedule[date].filter((id) => {
            for (const k of ids) {
              if (id.includes(k)) {
                return false
              }
            }

            return true
          })
        })
      })
    )
  }
}

export { TaskHandler }
