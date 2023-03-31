// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from './app.module.scss'
// import NxWelcome from './nx-welcome'
import { InitMapSvgRef, MapSvgRef } from '@flyele-nx/service-module'
import { useEffect, useRef } from 'react'
import { Direction, sqlStore } from '@flyele-nx/sql-store'
// import { registerServiceWorker } from '@flyele-nx/sw-sql-client'
import { envStore } from '@flyele-nx/service'

envStore.initEnv(process.env.NODE_ENV as string)

// registerServiceWorker('/sw.js')

const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2ODAyNjg0ODAsImlhdCI6MTY4MDI2MDgxNiwiaXNzIjoiYXBpLmZseWVsZS5uZXQiLCJVc2VySUQiOiI1NDIzMjExNTAyNjM1MDQiLCJEZXZpY2VJRCI6IjVjZjkxOGJiLThmNGQtNDFkZC1iMzIzLTczODMzNmQ4MzBjNiIsIlBsYXRmb3JtIjoibW9iaWxlIiwiQ2xpZW50VmVyc2lvbiI6IjIuMzAuMTAiLCJQaG9uZSI6IiIsIk5pY2tOYW1lIjoiIiwiQXZhdGFyIjoiIn0.NSxAT58vSm6pVoYBs-ILmNrxou2Y0S30SM5l3uRNx4U'

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
      dbId: '542321150263504'
    })

    const data = sqlStore.query({
      page_number: 1,
      page_record: 100,
      user_id: '1097162630889616',
      direction: Direction.down
    })

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
