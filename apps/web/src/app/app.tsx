// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from './app.module.scss'
// import NxWelcome from './nx-welcome'
import { InitMapSvgRef, MapSvgRef } from '@flyele-nx/service-module'
import { useEffect, useRef } from 'react'
import { Direction, sqlStore } from '@flyele-nx/sql-store'
import {
  registerServiceWorker,
  queryFullViewList
} from '@flyele-nx/sw-sql-client'
import { envStore } from '@flyele-nx/service'

const env = process.env.NODE_ENV as string

envStore.initEnv(env)

const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2ODA1MjM1NTEsImlhdCI6MTY4MDUxNjE0OSwiaXNzIjoiYXBpLmZseWVsZS5uZXQiLCJVc2VySUQiOiIxMzIxMzc3NTQyMTc2OTcxIiwiRGV2aWNlSUQiOiIwNmMxZTRmOC0xMzgwLTQ1OTctODg5MC0xNWRjZWU5NTRkMjMiLCJQbGF0Zm9ybSI6Im1vYmlsZSIsIkNsaWVudFZlcnNpb24iOiIyLjMwLjEwIiwiUGhvbmUiOiIiLCJOaWNrTmFtZSI6IiIsIkF2YXRhciI6IiJ9.KVZipR3UZ3kut4qfEOT5KmOcoW8erSNKAlklu-4H_lU'

registerServiceWorker('/sw.js', {
  host: envStore.getHost(),
  token,
  env,
  userId: '1321377542176971'
}).then(async () => {
  const data = await queryFullViewList({
    page_number: 1,
    page_record: 300,
    show_mode: 2
  })

  console.log(data)
})

export function App() {
  const mapSvgRef = useRef<MapSvgRef>(new InitMapSvgRef())
  const refresh = () => {
    mapSvgRef.current.refresh()
  }

  const isInit = useRef(false)

  const init = async () => {
    // await sqlStore.initDB({
    //   host: envStore.getHost(),
    //   token,
    //   env,
    //   userId: '542408421671185'
    // })
    // const page_record = 1000
    // console.time(`${page_record}条查询`)
    // const data = sqlStore.query({
    //   page_number: 1,
    //   page_record: page_record,
    //   show_model: 2,
    //   direction: Direction.up
    //   // filter: {
    //   //   taker_ids: ['999999999']
    //   // }
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
