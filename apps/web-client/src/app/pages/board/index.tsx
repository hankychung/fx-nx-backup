import { useEffect, useRef } from 'react'
import { initCacheWorker } from '../../utils/initCacheWorker'
import { BoardHeader } from './components/header'
import { Outlet } from 'react-router-dom'
import style from './index.module.scss'
import { BizApi } from '@flyele-nx/service'
import {
  GlobalInfoHandler,
  useUserInfoStore,
  IContactDict
} from '@flyele-nx/service-module'
import { LocalStore } from '@flyele-nx/utils'

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

    BizApi.getInteracts().then((list) => {
      console.log('@list', list)
      GlobalInfoHandler.updateInteracts(list)

      const dict = list.reduce<IContactDict>((pre, cur) => {
        const { user_id } = cur

        pre[user_id] = cur

        return pre
      }, {})

      GlobalInfoHandler.updateContactDict(
        new Proxy(dict, {
          get(target: IContactDict, p: string) {
            // TODO: fix here
            return target[p] || {}
          }
        })
      )
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
