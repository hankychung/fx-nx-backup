import { NoviceGuide } from '@flyele-nx/service-module'
import { usageModeType } from '@flyele-nx/types'
import styles from './index.module.scss'
import { useNavigate } from 'react-router-dom'
import { RoutePath } from '../../routes/const'

export const NoviceGuidePage = () => {
  const navigate = useNavigate()

  const onFinished = (type: usageModeType) => {
    console.log('type', type)
    if (type === 'personal') {
      navigate(RoutePath.board)
    }
  }
  return (
    <div className={styles.container}>
      <NoviceGuide onFinished={onFinished} />
    </div>
  )
}
