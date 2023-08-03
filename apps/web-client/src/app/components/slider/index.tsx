import { FC, useState } from 'react'
import styles from './index.module.scss'
import { MenuBar } from './components/menu-bar'
import { MenuSetting } from './components/menu-setting'
import { MenuBarContext } from './context'
import { useMemoizedFn } from 'ahooks'
import { useNavigate } from 'react-router-dom'
import { RoutePath } from '../../routes/const'

const Slider: FC = () => {
  const navigate = useNavigate()

  const [activeTab, setActiveTab] = useState<RoutePath>(RoutePath.board)

  const actionCallback = useMemoizedFn((key: RoutePath) => {
    if (activeTab === key) {
      return
    }

    navigate(key)
    setActiveTab(key)
  })

  return (
    <MenuBarContext.Provider
      value={{
        activeTab: activeTab,
        actionCallback: actionCallback
      }}
    >
      <div className={styles.sliderRoot}>
        <MenuBar />
        <MenuSetting />
      </div>
    </MenuBarContext.Provider>
  )
}

export { Slider }
