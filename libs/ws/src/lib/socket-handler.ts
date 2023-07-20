import { Env } from '@flyele-nx/constant'
import { TokenHandler } from '@flyele-nx/utils'
import { HEART_BEAT, HEART_BEAT_INTERVEL, HEART_BEAT_RETRY_MAX } from './const'

class _SocketHandler {
  private ws: WebSocket | null = null

  private heartbeatTimer: NodeJS.Timer | null = null

  private url = Env.api['dev'].url

  private heartbeatCount = 0

  private connect() {
    const token = TokenHandler.get()

    if (!token || this.ws) return

    this.ws = new WebSocket(`wss://${this.url}/intime/v2/ws?token=${token}`)

    this.ws.onopen = this.handleOpen.bind(this)

    this.ws.onclose = this.handleClose.bind(this)
  }

  private handleOpen() {
    this.triggerBeat()
  }

  // 持续心跳
  private triggerBeat() {
    this.heartbeatTimer = setInterval(() => {
      // 服务器无响应断开socket
      if (this.heartbeatCount > HEART_BEAT_RETRY_MAX) {
        this.ws?.close()
        return
      }

      this.ws?.send(HEART_BEAT)
      this.heartbeatCount++
    }, HEART_BEAT_INTERVEL)
  }

  private handleClose() {
    this.ws = null
    this.heartbeatTimer && clearInterval(this.heartbeatTimer)
    this.heartbeatTimer = null
    this.heartbeatCount = 0
  }

  initUrl(url: string) {
    this.url = url
  }
}

export const SocketHandler = new _SocketHandler()
