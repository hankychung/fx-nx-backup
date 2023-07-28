import { useScheduleStore } from '@flyele-nx/global-processor'
import { useRef, useState } from 'react'

interface IProps {
  date: string
}

export const useScheduleList = ({ date }: IProps) => {
  const list = useScheduleStore((state) => state.schedule[date])
  const finishList = useScheduleStore((state) => state.finishSchedule[date])
  const updateList = useScheduleStore((state) => state.updateList)
  const batchUpdateTask = useScheduleStore((state) => state.batchUpdateTask)
  const finishTotal = useScheduleStore((state) => state.todayFinishCount)

  const pageRecord = useRef(20)
  const pageRef = useRef(1)
  const finishPageRef = useRef(1)
  const [loading, setLoading] = useState(false)
  const [pageFetchFinished, setPageFetchFinished] = useState(false) // 未完成列表是否请求到最后一页
  const [finishPageFetchFinished, setFinishPageFetchFinished] = useState(false) // 已完成列表是否请求到最后一页
  const [isError, setIsError] = useState(false)
  // const [finishTotal, setFinishTotal] = useState(0)

  return {
    list,
    finishList,
    updateList,
    batchUpdateTask,
    pageRecord,
    pageRef,
    finishPageRef,
    loading,
    setLoading,
    pageFetchFinished,
    setPageFetchFinished,
    finishPageFetchFinished,
    setFinishPageFetchFinished,
    isError,
    setIsError,
    finishTotal
  }
}
