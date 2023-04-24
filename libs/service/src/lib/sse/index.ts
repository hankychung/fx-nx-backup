import { GetObjKeyOfType } from '../typings'
import { envStore } from '../env/index'

class SSe {
  source: EventSource

  url = ''

  private reconnection = false

  private messageListener: GetObjKeyOfType<EventSource, 'onmessage'> | null

  private addListener: ((event: Event & { data: string }) => void) | null

  private eventType = ''

  private isClose = false

  private openListener: (() => void) | null

  private errorListener: ((e: Event) => void) | null

  static composeParams(params?: { [p: string]: string }) {
    if (!params) return ''
    let str = ''

    for (const [key, value] of Object.entries(params)) {
      str += `${key}=${value}&`
    }
    return str.substring(0, str.length - 1)
  }

  constructor(
    url: string,
    params?: { [p: string]: string },
    reconnection = false
  ) {
    const envHost = envStore.getHost()
    this.url = `${envHost}/intime/${url}?${SSe.composeParams(params)}`

    this.messageListener = null

    this.addListener = null

    this.openListener = null
    this.errorListener = null

    this.reconnection = reconnection
    this.source = this.connect()

    this.callHandle()
  }

  decodeData(data: string) {
    console.log(this)

    return data
  }

  private openHandle() {
    // console.log('已经调用open', this.source)
    this.source.onopen = () => {
      console.log('sse open')

      if (this.openListener) {
        this.openListener.bind(this.source)()
      }
    }
  }

  onError = (listener: (e: Event) => void) => {
    this.errorListener = listener

    this.errorHandle()
  }

  onOpen(listener: () => void) {
    this.openListener = listener

    this.openHandle()
  }

  onMessage(listener: GetObjKeyOfType<EventSource, 'onmessage'>) {
    this.messageListener = listener

    this.messageHandle()
  }

  addEventListener(
    event: string,
    listener: (event: Event & { data: any }) => void
  ) {
    this.eventType = event

    this.addListener = listener

    this.eventListenerHandle()
  }

  reConnect() {
    console.log('sse 开始重连')
    this.source = this.connect()

    this.callHandle()
  }

  callHandle() {
    this.errorHandle()

    this.openHandle()

    this.messageHandle()

    this.eventListenerHandle()
  }

  messageHandle() {
    this.source.onmessage = (event) => {
      const nv: typeof event = { ...event, data: this.decodeData(event.data) }

      if (this.messageListener) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        this.messageListener.bind(this.source)(nv)
      }
    }
  }

  eventListenerHandle() {
    console.log('eventListenerHandle', this.source, this.eventType)
    this.source.addEventListener(
      this.eventType,
      (event: Event & { [p: string]: any }) => {
        console.log(event)
        if (typeof this.addListener === 'function') {
          try {
            const data = JSON.parse(event['data'])

            this.addListener.bind(this.source)({
              ...event,
              data: JSON.parse(data.message)
            })
          } catch (err) {
            console.log(err)
          }
        }
      }
    )
  }

  private errorHandle() {
    this.source.onerror = (event) => {
      this.source.close()
      console.log('sse error')
      if (this.reconnection && !this.isClose) {
        // 是否要判断一下连接状态重连
        setTimeout(() => {
          this.reConnect()
        }, 1000)
      }

      if (this.errorListener) {
        this.errorListener.bind(this.source)(event)
      }
    }
  }

  private connect() {
    const source = new EventSource(this.url, { withCredentials: false })

    // this.openHandle()
    //
    // this.errorHandle()
    //
    // this.messageHandle()
    //
    // this.eventListenerHandle()
    return source
  }

  close() {
    this.source.close()
    this.isClose = true
  }

  getCloseState() {
    return this.isClose
  }
}

export default SSe
