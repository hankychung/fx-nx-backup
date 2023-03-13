import styles from './gts.module.scss'

import { ReactComponent as Icon } from '../assets/introduction/close.svg'
import img from '../assets/icons/icon.png'

import { service } from '@flyele-nx/service'

/* eslint-disable-next-line */
export interface GtsProps {}

export function Gts(props: GtsProps) {
  return (
    <div className={styles['container']}>
      <h1
        onClick={() => {
          service.updateToken('123')
        }}
      >
        Welcome to Gts!
      </h1>
      <img src={img} alt="" />
      <div className={styles['test']}>bgbgbg</div>
      <Icon />
    </div>
  )
}

export default Gts
