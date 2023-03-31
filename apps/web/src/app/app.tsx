// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from './app.module.scss'
// import NxWelcome from './nx-welcome'
import { InitMapSvgRef, MapSvg, MapSvgRef } from '@flyele-nx/service-module'
import { useEffect, useRef } from 'react'
import { Direction, sqlStore } from '@flyele-nx/sql-store'
import { registerServiceWorker } from '@flyele-nx/sw-sql-client'
import { envStore } from '@flyele-nx/service'

envStore.initEnv(process.env.NODE_ENV as string)

// registerServiceWorker('/sw.js')

const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2ODAyNjMyMjYsImlhdCI6MTY4MDI1NTQ2MCwiaXNzIjoiYXBpLmZseWVsZS5uZXQiLCJVc2VySUQiOiIxMzkxNTQ2OTU0MTU0MDgwIiwiRGV2aWNlSUQiOiI1Y2Y5MThiYi04ZjRkLTQxZGQtYjMyMy03MzgzMzZkODMwYzYiLCJQbGF0Zm9ybSI6Im1vYmlsZSIsIkNsaWVudFZlcnNpb24iOiIyLjMwLjEwIiwiUGhvbmUiOiIiLCJOaWNrTmFtZSI6IiIsIkF2YXRhciI6IiJ9.o1F-Vaub0ufnoCVaz1iB8PVAcDkM_sicXQjbQITRMWE'

export function App() {
  const mapSvgRef = useRef<MapSvgRef>(new InitMapSvgRef())
  const refresh = () => {
    mapSvgRef.current.refresh()
  }

  const init = async () => {
    await sqlStore.initDB({
      host: envStore.getHost(),
      token,
      dbId: '1391546954154080'
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
    init()
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
