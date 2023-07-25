import { useEffect } from 'react'
import { initCacheWorker } from '../../utils/initCacheWorker'
import { BoardHeader } from './components/header'
import { Outlet } from 'react-router-dom'

const Board: React.FC = () => {
  useEffect(() => {
    // TODO: fix it
    initCacheWorker({
      userId: '1113658170015849'
    })
  }, [])

  return (
    <div>
      <BoardHeader />
      <Outlet />
    </div>
  )
}

export { Board }
