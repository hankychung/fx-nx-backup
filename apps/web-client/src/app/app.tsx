import { Outlet } from 'react-router-dom'
import style from './app.module.scss'
import { Slider } from './components/slider'
import { useRedirect } from './hooks/useRedirect'
import { ProjectLure } from '@flyele-nx/service-module'

export function App() {
  useRedirect()

  return (
    <div className={style.app}>
      <Slider />
      <div className={style.content}>
        <Outlet />
      </div>
      {/* <ProjectLure projectId="" workspaceId="" visible={true} /> */}
    </div>
  )
}

export default App
