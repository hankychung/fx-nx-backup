import { IScheduleTask } from '@flyele-nx/service'

function getKey(i: Pick<IScheduleTask, 'ref_task_id' | 'repeat_id'>) {
  return `${i.ref_task_id}-${i.repeat_id || ''}`
}

export { getKey }
