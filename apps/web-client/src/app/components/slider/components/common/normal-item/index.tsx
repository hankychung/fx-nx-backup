import { useContext, useMemo } from 'react'
import styles from './index.module.scss'
import { getTabData } from '../../../utils'
import { RoutePath } from '../../../../../routes/const'
import { MenuBarContext } from '../../../context'
import cs from 'classnames'

interface INormalItem {
  tabKey: RoutePath
}

export const NormalItem = ({ tabKey }: INormalItem) => {
  const { activeTab, actionCallback } = useContext(MenuBarContext)

  const tabData = useMemo(() => {
    return getTabData(tabKey)
  }, [tabKey])

  const isCurrentTab = useMemo(() => {
    return activeTab === tabKey
  }, [activeTab, tabKey])

  if (!tabData) return null

  return (
    <div
      className={cs(styles.normalItemRoot, {
        [styles.activeItem]: isCurrentTab
      })}
      onClick={() => {
        if (actionCallback) {
          actionCallback(tabKey)
        }
      }}
    >
      <div className={styles.iconBox}>
        <tabData.icon
          width={20}
          height={20}
          color={isCurrentTab ? tabData.activeColor : tabData.defaultColor}
        />
      </div>
      <div className={styles.title}>{tabData.name}</div>
    </div>
  )
}
