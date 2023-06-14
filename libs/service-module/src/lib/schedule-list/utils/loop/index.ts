import { RepeatList } from '@flyele-nx/service'

class LoopStore {
  private dict: {
    [k: string]: {
      compareKey: string
      value: {
        last_one_valid: any // 根据历史代码getLoopLastOne返回参数
        last_one_of_api: any // 根据历史代码getLoopLastOne返回参数
        real_future: RepeatList[] // 根据历史代码getLoopLastOne返回参数
      }
    }
  } = {}

  getValue(taskId: string, compareKey: string) {
    const info = this.dict[taskId]

    if (!info) return null

    if (compareKey === info.compareKey) {
      return info.value
    }

    return null
  }

  setValue(taskId: string, compareKey: string, value: any) {
    this.dict[taskId] = {
      compareKey,
      value
    }
  }
}

export const loopStore = new LoopStore()
