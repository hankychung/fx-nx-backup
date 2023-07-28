function getKey(i: Pick<IScheduleTask, 'ref_task_id' | 'repeat_id'>) {
  return i.repeat_id ? `${i.ref_task_id}-${i.repeat_id}` : i.ref_task_id
}
