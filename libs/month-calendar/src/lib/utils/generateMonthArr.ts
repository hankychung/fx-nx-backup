import dayjs from 'dayjs'
import _ from 'lodash'

const generateMonthArr = (date: dayjs.Dayjs) => {
  const arr: dayjs.Dayjs[] = []

  const monthStart = date
    .set('date', 1)
    .set('hour', 0)
    .set('minute', 0)
    .set('second', 0)

  let point = monthStart

  let monthEnd = monthStart
    .add(1, 'month')
    .subtract(1, 'second')
    .set('hour', 0)
    .set('minute', 0)
    .set('second', 0)

  if (monthStart.day() !== 0) {
    // 补齐前面的日期
    const preMonthStart = monthStart.subtract(monthStart.day(), 'day')

    for (let i = 0; i < monthStart.day(); i++) {
      arr.push(preMonthStart.add(i, 'day'))
    }
  }

  while (!point.isSame(monthEnd.add(1, 'day'), 'date')) {
    arr.push(point)

    point = point.add(1, 'day')
  }

  // 补齐后面的日期
  while (monthEnd.day() !== 6) {
    monthEnd = monthEnd.add(1, 'day')
    arr.push(monthEnd)
  }

  return _.chunk(arr, 7)
}

export { generateMonthArr }
