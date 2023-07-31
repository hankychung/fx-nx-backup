import { LOOP_MATTER } from '@flyele-nx/constant'
import { isAlwaysRepeat } from './loopMatter'
import { getLoopDatesAndCount, getRepeatStartTime } from './loopMatter'
import { IScheduleTask } from '@flyele-nx/types'

// 获取当前循环数据
export const getNowRepeatData = (task: IScheduleTask) => {
  return task.repeat_list?.find?.((v) => v.repeat_id === task?.repeat_id)
}

class LoopStuff {
  private dict: {
    [k: string]: {
      compareKey: string
      value: {
        count: number | string
      }
    }
  } = {}

  private getKey(item: IScheduleTask) {
    const {
      ref_task_id,
      original_end_time = '',
      end_time = '',
      start_time = '',
      original_start_time = '',
      end_repeat_at = ''
    } = item

    const key = ref_task_id

    const compareKey = `${original_end_time}${end_time}${start_time}${original_start_time}${end_repeat_at}`

    return { key, compareKey }
  }

  async getValue(item: IScheduleTask) {
    const { key, compareKey } = this.getKey(item)

    const info = this.dict[key]

    if (info && info.compareKey === compareKey) {
      return info.value
    }

    await this.getRepeatTotalCount(item)

    return this.dict[key].value
  }

  async getRepeatTotal(item: IScheduleTask) {
    return await this.getRepeatTotalCount(item)
  }

  private async getRepeatTotalCount(task: IScheduleTask) {
    const { key, compareKey } = this.getKey(task)

    if (!task.repeat_type || !task.end_repeat_at) {
      this.dict[key] = {
        compareKey,
        value: { count: 0 }
      }

      return 0
    }

    if (isAlwaysRepeat(task?.end_repeat_at)) {
      this.dict[key] = {
        compareKey,
        value: { count: '∞' }
      }

      return '∞'
    }

    const params = {
      startTime: getRepeatStartTime(task) || 0,
      createAt: task.create_at || 0,
      finnishTime: task.end_repeat_at as number,
      loopOpt: task.repeat_type as LOOP_MATTER,
      ignoreHoliday: task.repeat_config?.repeat_interval === 1,
      repeat_config: task.repeat_config
    }

    const repeatData = await getLoopDatesAndCount(params)

    this.dict[key] = {
      compareKey,
      value: { count: repeatData.count }
    }
    return repeatData.count
  }
}

export const loopStuff = new LoopStuff()
