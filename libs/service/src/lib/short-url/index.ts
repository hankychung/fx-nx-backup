import { service } from '../service'

class ShortUrl {
  getShortUrl(url: string) {
    const currentTime = Math.trunc(new Date().getTime() / 1000) // 当前时间 单位：秒
    return service.post({
      url: '/short',
      data: {
        long_url: `${url}&dispatch_at=${currentTime}`
      }
    })
  }
}

export const shortUrlApi = new ShortUrl()
