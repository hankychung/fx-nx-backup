import { useEffect, useRef } from 'react'
import { initCacheWorker } from '../../utils/initCacheWorker'
import { BoardHeader } from './components/header'
import { Outlet } from 'react-router-dom'
import style from './index.module.scss'
import { useUserInfoStore } from '@flyele-nx/service-module'
import { LocalStore } from '@flyele-nx/utils'
import { initInteract } from '../../utils/initInteract'

const Board: React.FC = () => {
  const isInit = useRef(false)

  useEffect(() => {
    if (isInit.current) return

    isInit.current = true

    const userId =
      useUserInfoStore.getState().userInfo.user_id ||
      LocalStore.getUserInfo()?.user_id

    if (!userId) return

    initCacheWorker({
      userId
    })

    initInteract()
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
