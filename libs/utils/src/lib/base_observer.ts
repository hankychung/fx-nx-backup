/**
 author: william   email:362661044@qq.com
 create_at:2021/7/6 下午 4:30
 **/
type callBack<V = any> = (e?: V) => void
type watch<V = any> = (pre?: V, current?: V) => void

export class BaseObserver<V = any> {
  constructor(v?: V) {
    this._value = v
  }

  private _value: V | undefined

  private _event: callBack<V> | undefined | null

  private _watchEvent: watch<V> | undefined

  get value(): V | undefined {
    return this._value
  }

  set value(v: V | undefined) {
    if (this._watchEvent) this._watchEvent(this._value, v)
    this._value = v
  }

  addListener(event?: callBack<V>): void {
    /** 事件被监听，只能一个监听者 **/
    if (this._event) {
      console.error('Only one listener')
    }
    this._event = event
  }

  forceListener(event?: callBack<V>): void {
    console.warn(
      'BaseObserver只能监听一个，如需多个监听使用BaseStream; 则监听最后声明的事件'
    )
    this._event = event
  }

  notification(e?: V): void {
    if (this._event) this._event(e)
  }

  changeNotification(e: V): void {
    if (this._event) {
      this._value = e
      this._event(e)
    }
  }

  watchValue(event: watch<V>) {
    /** 事件被监听，只能一个观察者 **/
    // if (this._watchEvent) throw new Error('Only one watch');
    this._watchEvent = event
  }

  dispose() {
    this._event = null
  }
}
