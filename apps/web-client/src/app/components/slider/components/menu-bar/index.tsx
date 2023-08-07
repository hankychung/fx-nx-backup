import styles from './index.module.scss'
import { MenuBaseArea } from './components/menu-base-area'

export const MenuBar = () => {
  return (
    <div className={styles.menubarRoot}>
      <MenuBaseArea />
    </div>
  )
}
