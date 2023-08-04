import styles from './index.module.scss'
import { emitter } from '@flyele-nx/utils'
import { LogoutIcon } from '@flyele-nx/icon'

export const Logout = ({ cb }: { cb: () => void }) => {
  const exitLogin = () => {
    cb()

    emitter.emit('logout')
  }

  return (
    <div className={styles.logoutRoot} onClick={exitLogin}>
      <div className={styles.quite}>
        <LogoutIcon color="#FEC442" width={16} height={17} />
      </div>
      <div className={styles.text}>退出登录</div>
    </div>
  )
}
