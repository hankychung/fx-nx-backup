import dayjs from 'dayjs'
import { envStore } from '@flyele-nx/constant'
import { isCN } from '@flyele-nx/i18n'

class TimeGetter {
  private timeDiff = 0

  private serviceStamp = 0

  private loading = false

  constructor() {
    // 每1hour校准一次时间
    setInterval(() => {
      this.calibrateTime()
    }, 1000 * 60 * 60)
  }

  private async calibrateTime() {
    if (!isCN) {
      return dayjs().unix()
    }

    if (this.loading) {
      return dayjs().unix()
    }

    this.loading = true

    try {
      const stamp = (
        await (await fetch(`${envStore.getHost()}/userc/v1/system/now`)).json()
      ).data as number

      this.timeDiff = dayjs().unix() - stamp
      this.serviceStamp = stamp

      return stamp
    } finally {
      this.loading = false
    }
  }

  async getDate(): Promise<number> {
    if (!isCN) {
      return dayjs().unix()
    }

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
    if (!isCN) {
      return dayjs().unix()
    }

    if (this.serviceStamp) {
      return dayjs().unix() - this.timeDiff
    }

    return dayjs().unix()
  }
}

export const timeGetter = new TimeGetter()
