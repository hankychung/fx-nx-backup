import { timeGetter } from '@flyele-nx/utils'
import { useEffect, useRef } from 'react'
import { initCacheWorker } from '../../utils/initCacheWorker'
import { BoardHeader } from './components/header'
import { Outlet } from 'react-router-dom'
import style from './index.module.scss'
import { BizApi } from '@flyele-nx/service'

const Board: React.FC = () => {
  const isInit = useRef(false)

  timeGetter.getDate()

  useEffect(() => {
    if (isInit.current) return

    isInit.current = true

    // TODO: fix it
    initCacheWorker({
      userId: '1097162688561296'
    })

    BizApi.getInteracts()
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
