import { NoviceGuide, useUserInfoStore } from '@flyele-nx/service-module'
import { usageModeType } from '@flyele-nx/types'
import styles from './index.module.scss'
import { useNavigate } from 'react-router-dom'
import { RoutePath } from '../../routes/const'

export const NoviceGuidePage = () => {
  const userId = useUserInfoStore((state) => state.userInfo.user_id)

  const navigate = useNavigate()

  const onFinished = (type: usageModeType) => {
    if (type === 'personal') {
      console.log('wanc')
    }
    if (type === 'team') {
      console.log('跳')
    }
  }

  const onGoHome = (type: usageModeType) => {
    if (type === 'personal') {
      navigate(RoutePath.board)
    }
    if (type === 'team') {
      console.log('跳')
    }
  }
  return (
    <div className={styles.container}>
      <NoviceGuide
        userId={userId}
        onGoHome={onGoHome}
        onFinished={onFinished}
      />
    </div>
  )
}
