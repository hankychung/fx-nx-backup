import { FC } from 'react'
import styles from './index.module.scss'

const Slider: FC = () => {
  return (
    <div className={styles.sliderRoot}>
      <div className={styles.menubarRoot}></div>
      <div className={styles.setting}></div>
    </div>
  )
}

export { Slider }
