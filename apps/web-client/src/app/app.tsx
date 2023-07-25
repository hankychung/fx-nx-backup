import { Outlet } from 'react-router-dom'
import style from './app.module.scss'
import { Slider } from './components/slider'
import { useRedirect } from './hooks/useRedirect'

export function App() {
  useRedirect()

  return (
    <div className={style.app}>
      <Slider />
      <div className={style.content}>
        <Outlet />
      </div>
    </div>
  )
}

export default App
