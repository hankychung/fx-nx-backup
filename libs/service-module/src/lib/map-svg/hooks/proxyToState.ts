import { useState, useRef, useEffect } from 'react'
import { MapProxyData, ProxyData, SetCallBack } from '../type/bin'

export const useGetMapProxyState = <T, K>(
  proxyObj: MapProxyData<T>,
  key: string,
  filterValueFn: (value: T) => K
) => {
  const [state, setState] = useState<K | null>(null)
  const init = useRef<boolean>(false)

  const refreshState: SetCallBack<T> = (newValue, _oV, k) => {
    if (!key || !k) return

    if (key === k) {
      const newState = filterValueFn(newValue)
      setState(newState)
    }
  }

  useEffect(() => {
    if (init.current) return

    init.current = true

    refreshState(
      proxyObj[key] as unknown as T,
      proxyObj[key] as unknown as T,
      key
    )

    proxyObj.effect.push(refreshState)
  }, [])

  return { state }
}

export const useGetProxyState = <T, K>(
  proxyObj: ProxyData<T>,
  filterValueFn: (value: T) => K
) => {
  const [state, setState] = useState<K | null>(null)
  const init = useRef<boolean>(false)

  const refreshState = (newValue: T) => {
    const newState = filterValueFn(newValue)
    setState(newState)
  }

  useEffect(() => {
    if (init.current) return

    init.current = true

    refreshState(proxyObj.value)
    proxyObj.effect.push(refreshState)
  }, [])

  return { state }
}
