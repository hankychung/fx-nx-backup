import { useEffect, useState } from 'react'
import { useNavigate, Outlet, useLocation } from 'react-router-dom'
import { routePath } from '../../routes'
import { Header } from '../../components/header'
import { useMemoizedFn } from 'ahooks'

export function App() {
  const [activeTab, setActiveTab] = useState('')

  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    navigate(routePath.price)
  }, [navigate])

  const onClickTab = useMemoizedFn((key: string) => {
    setActiveTab(key)
  })

  /**
   * 根据路由切换tab
   */
  const changeTabOnUrl = useMemoizedFn(() => {
    if (location.pathname) {
      setActiveTab(location.pathname)
    }
  })

  useEffect(() => {
    changeTabOnUrl()
  }, [changeTabOnUrl, location.pathname])

  return (
    <div>
      <Header activeTab={activeTab} onClickTab={onClickTab} />
      <Outlet />
    </div>
  )
}

export default App
