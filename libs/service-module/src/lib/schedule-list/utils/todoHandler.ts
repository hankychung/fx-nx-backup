import { IScheduleTask } from '@flyele-nx/service'
import { useScheduleStore } from '../../store/useScheduleStore'
import { TaskHandler } from './taskHandler'
import { ILocalTask } from '../../../../types/schedule'

class TodoHandler {
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

    TaskHandler.updateTaskDictByTodo(decentTasks)
  }
}

export { TodoHandler }
