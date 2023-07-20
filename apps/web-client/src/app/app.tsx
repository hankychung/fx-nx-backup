import { Outlet } from 'react-router-dom'
import style from './app.module.scss'
import { Slider } from './components/slider'
import { useAppDirect } from './hooks/useAppDirect'

export function App() {
  useAppDirect()

  return (
    <div className={style.app}>
      <Slider />
      <Outlet></Outlet>
    </div>
  )
}

export default App
