import { FullViewTask } from '@flyele-nx/types'

function getKey(i: Pick<FullViewTask, 'task_id' | 'repeat_id'>) {
  return i.repeat_id ? `${i.task_id}-${i.repeat_id}` : i.task_id
}

export { getKey }
