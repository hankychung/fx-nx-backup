import { useState, useEffect } from 'react'
// import { getSystemDate } from 'utils/getDateTxt'
import { useCurTime } from './useCurTime'
import { IDashboardItem } from '@flyele-nx/types'

export const useTimeTip = (item: IDashboardItem) => {
  const curTime = useCurTime()

  const [txt, setTxt] = useState('')

  const [delayTxt, setDelayTxt] = useState('')

  useEffect(() => {
    // TODO: getSystemDate
    // const time = getSystemDate({
    //   item,
    //   curTime: curTime.unix(),
    //   selectDate: curTime.unix(),
    // })

    const time = {
      txt: '',
      delayTxt: '延期一天'
    }

    setTxt(time.txt)
    setDelayTxt(time.delayTxt || '')
  }, [curTime, item])

  return {
    txt,
    delayTxt
  }
}
