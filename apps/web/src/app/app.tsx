// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from './app.module.scss'
// import NxWelcome from './nx-welcome'
import { InitMapSvgRef, MapSvgRef } from '@flyele-nx/service-module'
import { useEffect, useRef } from 'react'
import { Direction, FullGroupBy, sqlStore } from '@flyele-nx/sql-store'
// import { ServiceWorkerUtils } from '@flyele-nx/sw-sql-client'
import { envStore } from '@flyele-nx/service'
// import { ServiceWorkerUtils } from '@flyele-nx/sw-sql-client'

const env = process.env.NODE_ENV as string

envStore.initEnv(env)

const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2ODA3NzkyNTYsImlhdCI6MTY4MDc3MTQxMiwiaXNzIjoiYXBpLmZseWVsZS5uZXQiLCJVc2VySUQiOiI1NDI0MDg0MjE2NzExODUiLCJEZXZpY2VJRCI6IjIyNDJiYjY3LWNhYjQtNGE2My05NDY0LThiOTdlNDIxYWEzOCIsIlBsYXRmb3JtIjoibW9iaWxlIiwiQ2xpZW50VmVyc2lvbiI6IjIuMzAuMTAiLCJQaG9uZSI6IiIsIk5pY2tOYW1lIjoiIiwiQXZhdGFyIjoiIn0.1ZuU0ql8iuisceMcIY870SSTN2fSlSkbpLera53Fx1k'

// registerServiceWorker('/sw.js', {
//   host: envStore.getHost(),
//   token,
//   env,
//   userId: '542408421671185'
// })

export function App() {
  const mapSvgRef = useRef<MapSvgRef>(new InitMapSvgRef())
  const refresh = () => {
    mapSvgRef.current.refresh()
  }

  const isInit = useRef(false)

  const init = async () => {
    await sqlStore.initDB({
      host: envStore.getHost(),
      token,
      env,
      userId: '1391546954154080'
    })
    const page_record = 3000

    console.time(`${page_record}条查询`)
    const data = sqlStore.query({
      page_number: 1,
      page_record: page_record,
      show_model: 2,
      direction: Direction.down,
      filter: {
        group_by: FullGroupBy.time,
        query_type: 0
      },
      order_by: {
        order_by_key: 'timestamp',
        sort: 'DESC'
      }
    })
    console.timeEnd(`${page_record}条查询`)
    console.log(data)
  }

  useEffect(() => {
    if (isInit.current) return

    init()

    isInit.current = true
  }, [])

  return (
    <>
      {/* <NxWelcome title="web" /> */}
      <div className={styles.wrap}>
        {/* <MapSvg ref={mapSvgRef} /> */}

        <div className={styles.testRefresh} onClick={refresh}>
          测试刷新
        </div>
      </div>
      {/* <Banner /> */}
      <div />
      {/* <LureModal
        open={true}
        handleClose={() => {}}
        handleConfirm={() => {}}
        title="增加文sd件大小"
        tip="tipasdasdas"
        freeTxt="30M"
        vipTxt="50M"
        highlight="在思维导图中结构化创建事项"
        imgType="application"
      /> */}
    </>
  )
}

export default App
