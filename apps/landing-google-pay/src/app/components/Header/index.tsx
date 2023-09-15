import { FlyLogo } from '@flyele-nx/icon'
import { Paypal } from '@flyele-nx/paypal'
import style from './index.module.scss'

const Header = () => {
  return (
    <div className={style.header}>
      <div>
        <FlyLogo height={20} />
        Flyele
      </div>

      <div>
        <span>Contact us</span>
      </div>

      <Paypal />
    </div>
  )
}

export { Header }
