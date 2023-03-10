import { useState, useEffect, useRef } from 'react'

let timeOutId: NodeJS.Timeout

/**
 * 从 electron-client 迁移的方法
 */
const useTimer = () => {
  const [timer, setTimer] = useState(120)
  const ref = useRef(timer)

  ref.current = timer

  const stopTimer = () => {
    clearTimeout(timeOutId)
  }
  const exeTimer = () => {
    timeOutId = setTimeout(() => {
      const nv = ref.current - 1

      if (nv <= 0) {
        stopTimer()
        setTimeout(() => {
          // 等待1秒后更新为初始状态
          setTimer(120)
        }, 1000)
      }
      if (nv >= 0) {
        setTimer(nv)
      }
      if (nv > 0) {
        exeTimer()
      }
    }, 1000)
  }

  useEffect(() => {
    return () => {
      stopTimer()
    }
  }, [])

  return {
    timer,
    stopTimer,
    exeTimer
  }
}

export { useTimer }
