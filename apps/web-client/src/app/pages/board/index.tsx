import { useEffect } from 'react'
import { initCacheWorker } from '../../utils/initCacheWorker'
import { BoardHeader } from './components/header'
import { Outlet } from 'react-router-dom'
import style from './index.module.scss'

const Board: React.FC = () => {
  useEffect(() => {
    // TODO: fix it
    initCacheWorker({
      userId: '1097162688561296'
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
