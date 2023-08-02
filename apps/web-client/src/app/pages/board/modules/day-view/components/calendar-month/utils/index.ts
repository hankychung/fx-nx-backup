import dayjs from 'dayjs'
import { TaskApi } from '@flyele-nx/service'

export interface IDateInfo {
  day: number
  stamp: number
}

export interface IDotDict {
  [k: number]: { is_task: number }
}

export function getMonthInfo(stamp: number) {
  const date = dayjs(dayjs.unix(stamp).format('YYYY-M-D'))

  const days = date.daysInMonth()

  const startWeek = date.set('date', 1).get('day')

  return { days, startWeek, monthInfo: date }
}

export function getDates(stamp: number, callback: (dot: IDotDict) => void) {
  const { days, startWeek, monthInfo } = getMonthInfo(stamp)

  const arr: IDateInfo[][] = [[]]

  const startDate = monthInfo.set('date', 1)

  const endDate = startDate.add(31, 'day')

  TaskApi.getCalendarInfo(startDate.unix(), endDate.unix()).then(
    ({ data: dots }) => {
      callback(dots)
    }
  )

  let row = 0

  let weekCount = startWeek

  while (weekCount > 0) {
    arr[0].push({ day: -weekCount--, stamp: 0 })
  }

  for (let i = 1; i <= days; i++) {
    const stamp = monthInfo.set('date', i).unix()

    const info: IDateInfo = { day: i, stamp }

    if (arr[row].length >= 7) {
      arr[++row] = [info]
    } else {
      arr[row].push(info)

      if (i === days && arr[row].length < 7) {
        let restCount = 7 - arr[row].length

        while (restCount > 0) {
          arr[row].push({ day: restCount-- - 20, stamp: 0 })
        }
      }
    }
  }

  return { dates: arr, monthInfo }
}

export function isActive(d1: number, d2: number) {
  const dj1 = dayjs.unix(d1)
  const dj2 = dayjs.unix(d2)

  return dj1.isSame(dj2, 'date')
}
