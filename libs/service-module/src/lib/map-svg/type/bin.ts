import { Mdata } from './mdata'

export type Processer = (d: Mdata, id: string) => void
export type SetCallBack<T> = (newValue: T, oldValue: T) => void
export type ProxyData<T> = { value: T; effect: SetCallBack<T>[] }

export const CreateProxy = <T>(initValue: T, setCallBack?: SetCallBack<T>) => {
  const proxy = new Proxy<ProxyData<T>>(
    {
      value: initValue,
      effect: []
    },
    {
      get: (target, p: 'value') => {
        return target[p]
      },
      set: (target, p: 'value', newValue: T) => {
        const oldValue = target[p]

        target[p] = newValue

        for (const effect of proxy.effect) {
          effect(newValue, oldValue)
        }

        return true
      }
    }
  )

  setCallBack && proxy.effect.push(setCallBack)

  return proxy
}

export const CreateProxyRefCallBack = <T>(proxyObj: { value: T | null }) => {
  const refFn: React.LegacyRef<T> = (dom) => {
    proxyObj.value = dom
  }

  return refFn
}
