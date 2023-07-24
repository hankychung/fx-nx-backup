import { timeGetter } from '@flyele-nx/utils'
import { AllScheduleList } from '@flyele-nx/service-module'
import dayjs from 'dayjs'
import { useEffect } from 'react'
import { initCacheWorker } from '../../utils/initCacheWorker'

const Board: React.FC = () => {
  timeGetter.getDate()

  useEffect(() => {
    // TODO: fix it
    initCacheWorker({
      userId: '1113658170015849'
    })
  }, [])

  return (
    <div>
      <AllScheduleList
        date={dayjs.unix(timeGetter.getDateRoughly()).format('YYYY-MM-DD')}
      />
    </div>
  )
}

export { Board }
