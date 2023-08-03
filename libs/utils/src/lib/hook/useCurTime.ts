import { timeGetter } from '../timeGetter'
import { useState, useEffect } from 'react'
import dayjs from 'dayjs'

interface IOptions {
  duration?: number
  needRefresh?: boolean
}

export const useCurTime = (options: IOptions = {}) => {
  const [curTime, setCurTime] = useState(dayjs())

  const { duration, needRefresh } = options

  useEffect(() => {
    async function getToday() {
      const curTime = await timeGetter.getDate()

      setCurTime(dayjs.unix(curTime))
    }

    let timer: null | NodeJS.Timeout = null

    if (needRefresh || duration) {
      getToday()
      timer = setInterval(getToday, duration || 1000 * 60)
    } else {
      getToday()
    }

    return () => {
      timer && clearInterval(timer)
    }
  }, [needRefresh, duration])

  return curTime
}
