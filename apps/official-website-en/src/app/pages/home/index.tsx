import { useEffect, useState } from 'react'
import { useNavigate, Outlet, useLocation } from 'react-router-dom'
import { routePath } from '../../routes'
import { Header } from '../../components/header'
import { useMemoizedFn, useMount } from 'ahooks'
import { OverseasContactUsModal } from '@flyele-nx/ui'
import { useNxController } from '../../../hooks/useNxController'

export function App() {
  const [activeTab, setActiveTab] = useState('')
  const [contactUsModal, setContactUsModal] = useState(false)

  const navigate = useNavigate()
  const location = useLocation()

  const { contextHolder } = useNxController()

  const onCloseModal = () => {
    setContactUsModal(false)
  }

  /**
   * 根据路由切换tab
   */
  const changeTabOnUrl = useMemoizedFn((key: string) => {
    if (key && key !== '/' && key !== activeTab) {
      setActiveTab(key)
      navigate(key)
    }
  })

  /**
   * 点击tab
   */
  const onClickTab = useMemoizedFn((key: string) => {
    if (key === 'contact-us') {
      setContactUsModal(true)
    } else {
      changeTabOnUrl(key)
    }
  })

  useMount(() => {
    const path =
      location.pathname === '/' ? routePath.product : location.pathname

    changeTabOnUrl(path)
  })

  useEffect(() => {
    const path = location.pathname
    if (path === '/' || path === activeTab) return

    setActiveTab(path)
  }, [activeTab, location.pathname])

  return (
    <div>
      {contextHolder}
      <Header activeTab={activeTab} onClickTab={onClickTab} />
      <Outlet />

      <OverseasContactUsModal open={contactUsModal} onCancel={onCloseModal} />
    </div>
  )
}

export default App
