import {
  NoviceGuide,
  useUserInfoStore,
  IGoHomeParams
} from '@flyele-nx/service-module'
import { usageModeType } from '@flyele-nx/types'
import styles from './index.module.scss'
import { useNavigate } from 'react-router-dom'
import { RoutePath } from '../../routes/const'

export const NoviceGuidePage = () => {
  const userId = useUserInfoStore((state) => state.userInfo.user_id)

  const navigate = useNavigate()

  const onFinished = (type: usageModeType) => {
    console.log('finished', type)
  }

  const onGoHome = (type: usageModeType, data?: IGoHomeParams) => {
    if (type === 'personal') {
      navigate(RoutePath.board)
    }
    if (type === 'team') {
      console.log('@@@ data', data?.spaceId)
      navigate(RoutePath.board)
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
