import styles from './banner.module.scss'

import { UsercApi } from '@flyele-nx/service'

import img from '../../assets/icons/icon.png'

import { ReactComponent as Logo } from '../../assets/introduction/close.svg'

/* eslint-disable-next-line */
export interface BannerProps {}

export function Banner(props: BannerProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to Banner!</h1>
      <img src={img} alt="" height={30} width={30}></img>
      <Logo />
      <div
        onClick={() => {
          UsercApi.getCurrentDate().then((res) => {
            console.log('check res', res)
          })
        }}
      >
        get time
      </div>
    </div>
  )
}

export default Banner
