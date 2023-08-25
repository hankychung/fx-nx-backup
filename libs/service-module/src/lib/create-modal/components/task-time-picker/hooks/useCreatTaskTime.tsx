import { useMemo, useState } from 'react'
import { ITimeProps } from '@flyele-nx/types'
import { useMemoizedFn } from 'ahooks'
import {
  defaultMaxDate,
  defaultMinDate,
  getCurOnMin,
  getDate_validity_date,
  getMatterStartTime,
  getMatterTimeParams
} from '@flyele-nx/utils'
import dayjs from 'dayjs'

export const useCreatTaskTime = () => {
  // 事项时间
  const [timeData, setTimeData] = useState<ITimeProps | undefined>()
  // 事项时间显示文案
  const [timeText, setTimeText] = useState('')

  /**
   * 处理事项时间显示文案
   */
  const getTimeText = useMemoizedFn((data: ITimeProps | undefined) => {
    if (data) {
      const value = getMatterTimeParams(data, [[], []])
      const { startTimeFullDay, endTimeFullDay } = data

      const { output } = getDate_validity_date({
        ...value,
        start_time_full_day: !value.start_time ? 1 : startTimeFullDay,
        end_time_full_day: !value.end_time ? 1 : endTimeFullDay
      })

      setTimeText(output)
    } else {
      setTimeText('')
    }
  })

  /**
   * 确认时间
   */
  const onConfirmTime = useMemoizedFn((data: ITimeProps) => {
    setTimeData(data)
    getTimeText(data)
  })

  /**
   * 初始化时间数据
   */
  const initTimeData = useMemoizedFn(async () => {
    const cur = await getCurOnMin()
    // 默认的开始
    const start = await getMatterStartTime(cur, {
      // TODO 编辑再传入
      date: undefined
    })
    // 计算有详情时候的开始时间
    // const _start = this.task ? getTaskMatterStartTime(start, this.task) : start
    const _start = start
    // 获取默认的截止
    const endTime = dayjs(start).minute(start.minute() + 30)
    // 计算有详情时候的截止时间
    // const _end = this.task ? getTaskMatterEndTime(_start, this.task) : endTime

    const updateValue: ITimeProps = {
      minDate: defaultMinDate,
      maxDate: defaultMaxDate,
      cur,
      startTime: _start,
      startTimeFullDay: 2,
      endTimeFullDay: 2,
      endTime: endTime,
      isSetTime: true
    }

    setTimeData(updateValue)
    getTimeText(updateValue)
  })

  return {
    timeData,
    onConfirmTime,
    initTimeData,
    timeText
  }
}
