import { service } from '../service'
import { envStore } from '@flyele-nx/constant'

class Empty {
  private prefix = '/v1'

  getShortUrl(url: string) {
    const currentTime = Math.trunc(new Date().getTime() / 1000) // 当前时间 单位：秒
    return service.post({
      url: `${this.prefix}/short`,
      data: {
        NxBaseUrl: envStore.getShortHost(),
        long_url: `${url}&dispatch_at=${currentTime}`
      }
    })
  }
}
export const EmptyApi = new Empty()
