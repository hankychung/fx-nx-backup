/**
 author: william   email:362661044@qq.com
 create_at:2021/7/15 下午 4:23
 **/

type callBack<T = any> = (e?: T) => void

type eventStack<T = any> = {
  key: string
  event: callBack<T>
}

export class BaseStream<T = any> {
  private eventStacks: eventStack<T>[] = []

  private get events(): callBack<T>[] {
    return this.eventStacks.map((item) => item.event)
  }

  addStreamListener(event: callBack<T>): string {
    const key = Date.now().toString() + Math.random().toString()

    this.eventStacks.push({ key, event: <callBack>event })
    return key
  }

  notification(e?: T): void {
    for (const event of this.events) {
      event(e)
    }
  }

  // 通知其中一个
  notificationOnly(key: string) {
    try {
      const res = this.eventStacks.find((item) => item.key === key)

      res && res.event()
    } catch (_e) {
      console.log(_e)
    }
  }

  removeEvent(key: string) {
    const index = this.eventStacks.findIndex((item) => item.key === key)

    if (index >= 0) {
      this.eventStacks.splice(index, 1)
    }
  }

  dispose() {
    this.eventStacks.length = 0
  }
}
