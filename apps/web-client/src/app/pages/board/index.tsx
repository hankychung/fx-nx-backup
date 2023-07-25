import { timeGetter } from '@flyele-nx/utils'
import { AllScheduleList } from '@flyele-nx/service-module'
import dayjs from 'dayjs'
import { useEffect } from 'react'
import { initCacheWorker } from '../../utils/initCacheWorker'
import { BoardHeader } from './components/header'
import { Outlet } from 'react-router-dom'
import style from './index.module.scss'

const Board: React.FC = () => {
  timeGetter.getDate()

  useEffect(() => {
    // TODO: fix it
    initCacheWorker({
      userId: '2601680697032715'
    })
  }, [])

  return (
    <div className={style.board}>
      <BoardHeader />
      <div className={style.wrapper}>
        <Outlet />
      </div>
    </div>
  )
}

export { Board }
