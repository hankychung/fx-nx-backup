// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from './app.module.scss'
// import NxWelcome from './nx-welcome'
import { MapSvg } from '@flyele-nx/service-module'

export function App() {
  return (
    <>
      {/* <NxWelcome title="web" /> */}
      <div className={styles.wrap}>
        <MapSvg />
      </div>
      {/* <Banner /> */}
      <div />
    </>
  )
}

export default App
