import msgpack from 'msgpack-lite'
import { LocalStore, convertSocketMsg } from '@flyele-nx/utils'
import { envStore } from '@flyele-nx/service'
import { HEART_BEAT, HEART_BEAT_INTERVEL, HEART_BEAT_RETRY_MAX } from './const'

class _SocketHandler {
  private ws: WebSocket | null = null

  public goaway = () => {
    // 被挤下线, 外部传入
  }

  private heartbeatTimer: NodeJS.Timer | null = null

  private url = envStore.getUrl()

  private heartbeatCount = 0

  private doNotReconnect = false

  private connect() {
    const token = LocalStore.getToken()

    if (!token || this.ws) return

    this.ws = new WebSocket(`wss://${this.url}/intime/v2/ws?token=${token}`)

    this.ws.onopen = this.handleOpen.bind(this)

    this.ws.onclose = this.handleClose.bind(this)

    this.ws.onmessage = this.handleMsg.bind(this)
  }

  private handleOpen() {
    this.doNotReconnect = false
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

    if (!this.doNotReconnect) {
      setTimeout(() => {
        // 2秒后重新连接
        this.connect()
      }, 2000)
    }
  }

  private handleMsg(event: MessageEvent) {
    const { data } = event

    this.heartbeatCount = 0

    if (typeof data === 'string') {
      if (data === '0') {
        return
      }

      if (data.includes('goaway')) {
        // TODO: 被挤下线
        this.ws?.close()
        this.doNotReconnect = true
      }
      return
    }

    const reader = new FileReader()

    reader.readAsArrayBuffer(data)

    reader.onload = (e) => {
      const result = e.target?.result

      if (!result || typeof result === 'string') return

      const msg = convertSocketMsg(msgpack.decode(new Uint8Array(result)))

      console.log('「socket」', msg)
    }
  }

  initSocket({ goaway }: { goaway: () => void }) {
    this.goaway = goaway
    this.connect()
  }

  initUrl(url: string) {
    this.url = url
  }
}

export const SocketHandler = new _SocketHandler()
