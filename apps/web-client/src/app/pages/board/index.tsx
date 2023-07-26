import { timeGetter } from '@flyele-nx/utils'
import { useEffect, useRef } from 'react'
import { initCacheWorker } from '../../utils/initCacheWorker'
import { BoardHeader } from './components/header'
import { Outlet } from 'react-router-dom'
import style from './index.module.scss'
import { BizApi } from '@flyele-nx/service'
import { GlobalInfoHandler } from '@flyele-nx/service-module'

const Board: React.FC = () => {
  const isInit = useRef(false)

  timeGetter.getDate()

  useEffect(() => {
    if (isInit.current) return

    isInit.current = true

    // TODO: fix it
    initCacheWorker({
      userId: '1113658170015849'
    })

    BizApi.getInteracts().then((list) => {
      console.log('@list', list)
      GlobalInfoHandler.updateInteracts(list)
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
