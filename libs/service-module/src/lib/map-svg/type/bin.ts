import { Mdata } from './mdata'

export type Processer = (d: Mdata, id: string) => void

export const CreateProxy = <T>(
  initValue: T,
  setCallBack?: (newValue: T, oldValue: T) => void
) => {
  return new Proxy<{ value: T }>(
    {
      value: initValue
    },
    {
      get: (target, p: 'value') => {
        return target[p]
      },
      set: (target, p: 'value', newValue: T) => {
        const oldValue = target[p]

        target[p] = newValue

        setCallBack && setCallBack(newValue, oldValue)

        return true
      }
    }
  )
}

export const CreateProxyRefCallBack = <T>(proxyObj: { value: T | null }) => {
  const refFn: React.LegacyRef<T> = (dom) => {
    proxyObj.value = dom
  }

  return refFn
}
