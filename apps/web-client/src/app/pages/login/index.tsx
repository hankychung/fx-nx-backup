import { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import { useMemoizedFn } from 'ahooks'
import { RoutePath } from '../../routes/const'
import { SocketHandler } from '@flyele-nx/ws'
import { Advertisement, FeedbackBtn } from '@flyele-nx/ui'
import { LoginInput, GlobalInfoHandler } from '@flyele-nx/service-module'
import { envStore, IUserInfo } from '@flyele-nx/service'
import styles from './index.module.scss'

const Login: FC = () => {
  const navigate = useNavigate()

  const isProdEnv = envStore.getEnv() === 'prod'

  const onLoginSuccess = useMemoizedFn((data?: IUserInfo) => {
    if (data) {
      GlobalInfoHandler.updateUserInfo(data)
    }
    navigate(RoutePath.dayView)

    SocketHandler.initSocket()
  })

  const onClickFeedbackNew = () => {
    window.open(
      ' https://fxkj15.qiyukf.com/client?k=32dc07afddda5179a2b418a9daa1fbca&wp=1&robotShuntSwitch=0'
    )
  }

  return (
    <div className={styles.wrap}>
      <div className={styles.wrapContent}>
        <Advertisement />

        <div className={styles.wrapRight}>
          <FeedbackBtn
            customClass={styles.feedbackBtn}
            clickHandler={onClickFeedbackNew}
          />
          <LoginInput
            usePhoneNumLogin={!isProdEnv}
            onLoginSuccess={onLoginSuccess}
          />
        </div>
      </div>
    </div>
  )
}

export { Login }
