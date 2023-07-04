import { IScheduleTask } from '@flyele-nx/service'
import { useScheduleStore } from '../../store/useScheduleStore'
import { TaskHandler } from './taskHandler'
import { ILocalTask } from '@flyele-nx/service'

class ExecutionHandler {
  static updateTasks(tasks: IScheduleTask[]) {
    const { taskDict } = useScheduleStore.getState()

    const decentTasks: ILocalTask[] = []

    tasks.forEach((task) => {
      const { ref_task_id } = task
      // 字典已存在该事项不做处理
      if (taskDict[ref_task_id]) return

      decentTasks.push({
        ...task,
        fromExecuate: true
      })
    })

    TaskHandler.updateTaskDictByExecution(decentTasks)
  }
}

export { ExecutionHandler }
