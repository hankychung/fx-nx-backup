// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from './app.module.scss'
// import NxWelcome from './nx-welcome'
import { InitMapSvgRef, MapSvgRef } from '@flyele-nx/service-module'
import { useEffect, useRef } from 'react'
import { Direction, sqlStore } from '@flyele-nx/sql-store'
import { registerServiceWorker } from '@flyele-nx/sw-sql-client'

registerServiceWorker('/sw.js')

export function App() {
  const mapSvgRef = useRef<MapSvgRef>(new InitMapSvgRef())
  const refresh = () => {
    mapSvgRef.current.refresh()
  }

  const init = async () => {
    await sqlStore.initDB()

    const page_record = 1000

    console.time(`${page_record}条查询`)
    const data = sqlStore.query({
      page_number: 1,
      page_record: page_record,
      user_id: '1097162630889616',
      direction: Direction.up,
      filter: {
        taker_ids: ['999999999']
      }
    })
    console.timeEnd(`${page_record}条查询`)

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
