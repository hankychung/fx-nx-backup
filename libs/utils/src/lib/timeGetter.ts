import dayjs from 'dayjs'

class TimeGetter {
  private timeDiff = 0

  private serviceStamp = 0

  constructor() {
    // 每1hour校准一次时间
    setInterval(() => {
      this.calibrateTime()
    }, 1000 * 60 * 60)
  }

  private async calibrateTime() {
    const stamp = (
      await (await fetch('https://api.flyele.net/userc/v1/system/now')).json()
    ).data as number

    this.timeDiff = dayjs().unix() - stamp
    this.serviceStamp = stamp

    return stamp
  }

  async getDate(): Promise<number> {
    if (this.serviceStamp) {
      return dayjs().unix() - this.timeDiff
    }

    try {
      return await this.calibrateTime()
    } catch (e) {
      console.error('获取时间戳失败', e)
      // 时间戳获取失败, 暂时读取客户端时间
      return dayjs().unix()
    }
  }

  getDateRoughly(): number {
    if (this.serviceStamp) {
      return dayjs().unix() - this.timeDiff
    }

    return dayjs().unix()
  }
}

export const timeGetter = new TimeGetter()
