import { d3 } from '../d3'
import { zoomMap, zoomTransform } from '../d3/zoom'
import { Mdata } from './mdata'

export type Processer = (d: Mdata, id: string) => void
export type SetCallBack<T> = (newValue: T, oldValue: T, key?: string) => void
export type ProxyData<T> = { value: T; effect: SetCallBack<T>[] }
export type MapProxyData<T> = {
  [key: string]: T | SetCallBack<T>[]
  effect: SetCallBack<T>[]
}

export const CreateMapProxy = <T>(setCallBack?: SetCallBack<T>) => {
  const proxy = new Proxy<MapProxyData<T>>(
    {
      effect: []
    },
    {
      get: (target, p: string) => {
        return target[p]
      },
      set: (target, p: string, newValue: T) => {
        if (p === 'effect') return false

        const oldValue = target[p]

        target[p] = newValue

        for (const effect of proxy.effect) {
          effect(newValue, oldValue as unknown as T, p)
        }

        return true
      }
    }
  )

  setCallBack && proxy.effect.push(setCallBack)

  return proxy
}

type BackFunction<T> = (key: string) => T | null
type DefaultValueBackFunction<T> = (key: string) => T
export function CreateMapProxyValueGet<T>(
  proxy: MapProxyData<T>
): BackFunction<T>
export function CreateMapProxyValueGet<T>(
  proxy: MapProxyData<T>,
  defaultValue: T
): DefaultValueBackFunction<T>
export function CreateMapProxyValueGet<T>(
  proxy: MapProxyData<T>,
  defaultValue?: T
) {
  if (typeof defaultValue !== 'undefined') {
    return (key: string) => {
      return proxy[key] || defaultValue
    }
  }

  return (key: string): T => {
    return proxy[key] as unknown as T
  }
}

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
