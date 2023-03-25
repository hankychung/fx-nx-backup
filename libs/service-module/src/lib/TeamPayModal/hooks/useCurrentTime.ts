import { useMemoizedFn } from 'ahooks'
import { useEffect, useState } from 'react'

export const useCurrentTime = () => {
  const [nowScecond, setNowScecond] = useState<number>(
    new Date().getTime() / 1000
  )

  const initFn = useMemoizedFn(() => {
    return setInterval(() => {
      const num_second = new Date().getTime() / 1000
      setNowScecond(num_second)
    }, 1000)
  })

  useEffect(() => {
    const timer = initFn()

    return () => {
      clearInterval(timer)
    }
  }, [initFn])

  return {
    nowScecond
  }
}
