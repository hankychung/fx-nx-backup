import { useEffect, useState } from 'react'

export const useCurrentTime = () => {
  const [nowScecond, setNowScecond] = useState<number>(
    new Date().getTime() / 1000
  )
  const [intervalId, setIntervalId] = useState<NodeJS.Timer>()
  useEffect(() => {
    const id: NodeJS.Timer = setInterval(() => {
      const num_second = new Date().getTime() / 1000
      setNowScecond(num_second)
    }, 1000)
    setIntervalId(id)

    return () => {
      clearInterval(intervalId)
    }
  }, [])

  return {
    nowScecond
  }
}
