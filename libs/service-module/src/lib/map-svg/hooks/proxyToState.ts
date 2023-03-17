import { useState, useRef, useEffect } from 'react'
import { ProxyData } from '../type/bin'

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
