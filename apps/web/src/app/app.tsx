// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from './app.module.scss'
// import NxWelcome from './nx-welcome'
import { InitMapSvgRef, MapSvgRef } from '@flyele-nx/service-module'
import { useEffect, useRef } from 'react'
import { Direction, FullGroupBy, sqlStore } from '@flyele-nx/sql-store'
import { ServiceWorkerUtils } from '@flyele-nx/sw-sql-client'
import { envStore } from '@flyele-nx/service'
// import { ServiceWorkerUtils } from '@flyele-nx/sw-sql-client'

const env = process.env.NODE_ENV as string

envStore.initEnv(env)

const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2ODA3ODg4MzIsImlhdCI6MTY4MDc4MTM3MiwiaXNzIjoiYXBpLmZseWVsZS5uZXQiLCJVc2VySUQiOiI1NDI0MDg0MjE2NzExODUiLCJEZXZpY2VJRCI6IjhjZTc5MThiLWU4NzMtNGFkYy05NmYzLWMxZDhmNTQ5MDQ0NiIsIlBsYXRmb3JtIjoibW9iaWxlIiwiQ2xpZW50VmVyc2lvbiI6IjIuMzAuMTAiLCJQaG9uZSI6IiIsIk5pY2tOYW1lIjoiIiwiQXZhdGFyIjoiIn0.LqltnP1DtoH7F8NuyYiTxdnnxTmVvegG1XkhtdXsGuo'

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
    // await ServiceWorkerUtils.registerServiceWorker('/sw.js')
    // await ServiceWorkerUtils.login({
    //   host: envStore.getHost(),
    //   token,
    //   env,
    //   userId: '542409300902161'
    // })
    // await ServiceWorkerUtils.queryFullViewList({
    //   date_type: 1,
    //   group_by: 'time' as unknown as any,
    //   page_number: 1,
    //   page_record: 300,
    //   query_type: 0,
    //   show_mode: 2
    // })
    await sqlStore.initDB({
      host: envStore.getHost(),
      token,
      env,
      userId: '542409300902161'
    })
    // const page_record = 3000
    // console.time(`${page_record}条查询`)
    // const data = sqlStore.query({
    //   page_number: 1,
    //   page_record: page_record,
    //   show_model: 2,
    //   direction: Direction.up,
    //   filter: {
    //     group_by: FullGroupBy.time,
    //     query_type: 0
    //   }
    // })
    // console.timeEnd(`${page_record}条查询`)
    // console.log(data)
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
