// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from './app.module.scss'
// import NxWelcome from './nx-welcome'
import { InitMapSvgRef, MapSvg, MapSvgRef } from '@flyele-nx/service-module'
import { useEffect, useRef } from 'react'

import { sqlStore, registerServiceWorker } from '@flyele-nx/sql-store'

registerServiceWorker()

export function App() {
  const mapSvgRef = useRef<MapSvgRef>(new InitMapSvgRef())
  const refresh = () => {
    mapSvgRef.current.refresh()
  }

  const init = async () => {
    await sqlStore.initDB()

    const data = sqlStore.query({
      page_number: 1,
      page_record: 100,
      user_id: '1097162630889616'
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
