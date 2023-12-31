import { I18N } from '@flyele-nx/i18n'
import { produce } from 'immer'
import { ILocalTask } from '@flyele-nx/types'
import {
  IState,
  useScheduleStore,
  globalNxController,
  IRepeatDict
} from '@flyele-nx/global-processor'
import {
  getInsertedFinishTasks,
  getKey,
  getSortedSchedule,
  isRelated,
  shouldInsertSchedule,
  getModifyTime,
  resetRemindUnix
} from '.'
import { getDateOfToday } from './tools'
import { IInitTodayList } from './initTodayList'
import { DropResult } from 'react-beautiful-dnd'
import dayjs from 'dayjs'
import { TaskHandler } from './taskHandler'
import { TaskApi } from '@flyele-nx/service'
import { Pub } from '@flyele-nx/constant'
import { QueryType } from '@flyele-nx/sql-store'

class ListHandler {
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
    this.insertFinishTasks(taskIds)
  }

  // 刷新所有周视图未完成事项
  static async reloadDates(dates: string[]) {
    let newTaskDict = {}

    const repeatDictByDate: { [k: string]: IRepeatDict } = {}

    const scheduleByDate: { [k: string]: string[] } = {}

    const finishedScheduleByDate: { [k: string]: string[] } = {}

    const { batchUpdateTask } = useScheduleStore.getState()

    const historyDates = dates.filter((date) => {
      return dayjs(date).isBefore(getDateOfToday(), 'date')
    })

    for (const date of dates) {
      const isCompleted = historyDates.includes(date)

      const getInfo = async () => {
        const r = await globalNxController.getDayView({
          day: date,
          queryType: isCompleted ? QueryType.completed : QueryType.participate
        })

        const list = r.data.list || []

        return {
          ...batchUpdateTask(list, {
            isFinished: isCompleted
          }),
          list
        }
      }

      const { repeatDict, dict, list } = await getInfo()

      newTaskDict = {
        ...newTaskDict,
        ...dict
      }

      repeatDictByDate[date] = repeatDict

      if (isCompleted) {
        finishedScheduleByDate[date] = list.map((i) => i.ref_task_id)
      } else {
        scheduleByDate[date] = getSortedSchedule({ date, tasks: list })
      }
    }

    console.log('check scheduledate', scheduleByDate, finishedScheduleByDate)

    useScheduleStore.setState(
      produce((state: IState) => {
        state.taskDict = {
          ...state.taskDict,
          ...newTaskDict
        }

        state.dateRepeatDict = {
          ...state.dateRepeatDict,
          ...repeatDictByDate
        }

        state.schedule = {
          ...state.schedule,
          ...scheduleByDate
        }

        state.finishSchedule = {
          ...state.finishSchedule,
          ...finishedScheduleByDate
        }
      })
    )
  }

  // 重启事项
  static batchReopen(keysWithRepeatIds: string[]) {
    // 从完成列表移除重启事项
    this.removeTasks(keysWithRepeatIds, { type: 'finishSchedule' })

    // 插入未完成列表
    this.insertOngoingTasks(keysWithRepeatIds.map((id) => id.split('-')[0]))
  }

  // 更新器
  private static listReloader: {
    [k: string]: (params?: IInitTodayList) => Promise<
      | {
          [k: string]: { tasks: ILocalTask[]; finishTasks: ILocalTask[] }
        }
      | undefined
    >
  } = {}

  // 列表更新收集器
  static collectReloader(
    k: string,
    reloader: (params?: IInitTodayList) => Promise<
      | {
          [k: string]: { tasks: ILocalTask[]; finishTasks: ILocalTask[] }
        }
      | undefined
    >
  ) {
    this.listReloader[k] = reloader
  }

  // 移除列表更新器
  static removeReloader(k: string) {
    delete this.listReloader[k]
  }

  // 更新所有列表
  static async reloadAllList(params?: IInitTodayList) {
    console.log('reload all')
    let dict: {
      [k: string]: { tasks: ILocalTask[]; finishTasks: ILocalTask[] }
    } = {}

    for (const loader of Object.values(this.listReloader)) {
      const res = await loader(params)

      if (res) {
        dict = {
          ...dict,
          ...res
        }
      }
    }

    return dict
  }

  // 根据改变的事项更新列表排序
  static sortListByTask(ids: string[]) {
    const { schedule, taskDict } = useScheduleStore.getState()

    // 需要更新的日期
    const sortDates: string[] = []

    Object.entries(schedule).forEach(([date, list]) => {
      if (isRelated(list, ids)) {
        sortDates.push(date)
      }
    })

    useScheduleStore.setState(
      produce((state: IState) => {
        sortDates.forEach((date) => {
          state.schedule[date] = getSortedSchedule({
            date,
            tasks: schedule[date].map((id) => taskDict[id])
          })
        })
      })
    )
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
  static removeTasks(
    taskIds: string[],
    options?: {
      type?: 'schedule' | 'finishSchedule'
    }
  ) {
    const type = options?.type

    if (!type) {
      this.removeTasks(taskIds, { type: 'finishSchedule' })
      this.removeTasks(taskIds, { type: 'schedule' })
      return
    }

    const { schedule, finishSchedule } = useScheduleStore.getState()

    const l = type === 'finishSchedule' ? finishSchedule : schedule

    useScheduleStore.setState(
      produce((state: IState) => {
        Object.entries(l).forEach(([date, list]) => {
          const updatedList = list.filter((i) => !taskIds.includes(i))

          state[type][date] = updatedList

          if (type === 'finishSchedule' && date === getDateOfToday()) {
            state.todayFinishCount = updatedList.length
          }
        })
      })
    )
  }

  // 批量插入未完成列表
  static insertOngoingTasks(taskIds: string[]) {
    const { insertDateDict } = this.getInsertDateDict(taskIds)

    this.insertIntoDate({ insertDateDict })
  }

  // 日期 -> 插入到该日期的事项数组
  private static getInsertDateDict(taskIds: string[]) {
    const { taskDict, schedule } = useScheduleStore.getState()

    const tasks = taskIds
      .map((id) => taskDict[id])
      .filter((i) => !i.finish_time)

    // 需要插入该事项的日期
    const insertDateDict = Object.keys(schedule).reduce<{
      [k: string]: ILocalTask[]
    }>((dict, date) => {
      const insertTasks = tasks.filter((task) =>
        shouldInsertSchedule({ date, task })
      )

      if (insertTasks.length) {
        dict[date] = insertTasks
      }

      return dict
    }, {})

    return { insertDateDict }
  }

  // 插入到指定日期的未完成列表
  private static insertIntoDate(params: {
    insertDateDict: {
      [k: string]: ILocalTask[]
    }
  }) {
    const { insertDateDict } = params

    const { taskDict, schedule, childrenDict } = useScheduleStore.getState()

    useScheduleStore.setState(
      produce((state: IState) => {
        Object.keys(insertDateDict).forEach((date) => {
          const tasks = insertDateDict[date]

          tasks.forEach((task) => {
            const { parent_id, ref_task_id } = task

            // TODO: 先直接插入, 父子关系难以判断
            state.schedule[date] = getSortedSchedule({
              date,
              tasks: [...state.schedule[date].map((id) => taskDict[id]), task]
            })

            // 如果是子事项, 收合其祖先
            if (parent_id) {
              const { expandedDict } = useScheduleStore.getState()

              const parentIds = parent_id.split(',')

              Object.entries(expandedDict).forEach(([date, dict]) => {
                parentIds.forEach((id) => {
                  if (dict[id]) {
                    state.expandedDict[date][id] = false
                    return
                  }
                })
              })
            }

            // if (!parent_id) {
            //   // 无父事项直接插入列表, 需排序
            //   state.schedule[date] = getSortedSchedule({
            //     date,
            //     tasks: [...state.schedule[date].map((id) => taskDict[id]), task]
            //   })

            //   return
            // }

            // // 有父事项需要插入到该父事项的子集, 同时重置父事项的has_child
            // for (const parentId of parent_id.split(',').reverse()) {
            //   if (schedule[date].includes(parentId)) {
            //     console.log('bingo', taskDict[parentId], task)

            //     // 插入到父事项的children list
            //     if (!childrenDict[parentId]) {
            //       state.childrenDict[parentId] = []
            //       state.taskDict[parentId].has_child = true
            //     }

            //     state.childrenDict[parentId].push(ref_task_id)
            //     return
            //   }
            // }
          })
        })
      })
    )
  }

  // 批量插入已完成列表
  private static insertFinishTasks(ids: string[]) {
    const finishDate = getDateOfToday()

    const { finishSchedule, taskDict } = useScheduleStore.getState()

    const insertKeys = ids.map((id) => {
      const task = taskDict[id]

      return getKey(task)
    })

    useScheduleStore.setState(
      produce((state: IState) => {
        if (finishSchedule[finishDate]) {
          state.finishSchedule[finishDate].push(...insertKeys)
          state.todayFinishCount = state.finishSchedule[finishDate].length
        }
      })
    )
  }

  // 根据事项信息插入到相关列表
  static insertTasksByConds(taskIds: string[]) {
    // 未完成列表
    this.insertOngoingTasks(taskIds)

    // 已完成列表
    const { taskIds: finishedIds } = getInsertedFinishTasks(taskIds)
    finishedIds.length && this.insertFinishTasks(finishedIds)
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

  //周视图拖拽事项
  static handleDragEnd(e: DropResult) {
    console.log(e, '____')
    const { taskDict } = useScheduleStore.getState()
    const {
      draggableId,
      destination,
      source: { droppableId: fromDate }
    } = e

    if (!destination) return
    const { droppableId: toDate } = destination

    if (toDate === fromDate) return
    const taskId = draggableId.split('-')[0]
    const target = taskDict[taskId]

    if (target.repeat_id) {
      globalNxController.showMsg({
        content: I18N.common.recurringMattersDoNotDrag
      })
      return
    }

    const date = dayjs.unix(Number(toDate))
    const params = getModifyTime(target, date)
    const newTask = {
      ...target,
      ...params
    }
    TaskHandler.batchModify({
      keys: [taskId],
      diff: { ...params }
    })
    TaskApi.updateTask(
      {
        ...params,
        ...resetRemindUnix(newTask),
        matter_type: newTask.matter_type,
        start_time_full_day: newTask.start_time_full_day as 1 | 2,
        end_time_full_day: newTask.end_time_full_day as 1 | 2
      },
      newTask.ref_task_id
    ).catch(() => {
      console.log('kkk')
      globalNxController.pubJsPublish(Pub.UPDATE_SCHEDULE, [target])
    })
    globalNxController.pubJsPublish(Pub.UPDATE_SCHEDULE, [newTask])
  }

  // 更新日程下的循环事项字典
  static updateDateRepeatDict({
    date,
    repeatDict
  }: {
    date: string
    repeatDict: IRepeatDict
  }) {
    useScheduleStore.setState(
      produce((state: IState) => {
        state.dateRepeatDict[date] = repeatDict
      })
    )
  }
}

export { ListHandler }
