import { Outlet } from 'react-router-dom'
import style from './app.module.scss'
import { Slider } from './components/slider'
import { useRedirect } from './hooks/useRedirect'
import { useGlobalSub } from './hooks/useGlobalSub'
import { useInitApp } from './hooks/useInitApp'
import { NxScheduleTool } from './components/nx-schedule-tool'
import { useNxController } from './hooks/useNxController'

export function App() {
  useRedirect()

  useGlobalSub()

  useInitApp()

  const { contextHolder } = useNxController()

  return (
    <>
      {contextHolder}
      <NxScheduleTool />

      <div className={style.app}>
        <Slider />
        <div className={style.content}>
          <Outlet />
        </div>
      </div>
    </>
  )
}

export default App
