import { IActiveGoods } from '@flyele-nx/api'
import cs from 'classnames'
import React from 'react'
import style from './index.module.scss'
import { ReactComponent as ArrowRight } from '../../../../../../assets/payImg/arrow_right.svg'

interface Iprops {
  activeGood?: IActiveGoods[]
  payClick: () => void
  goProtocol?: () => void
  goInterests?: () => void
}
const PayButton = (props: Iprops) => {
  const { payClick, goProtocol, goInterests } = props

  return (
    <div className={style.payButton}>
      <div className={cs(style.payBtn)} onClick={payClick}>
        立即支付
      </div>
      <div className={style.protocol}>
        支付即视为同意
        <span
          onClick={() => {
            goProtocol && goProtocol()
          }}
        >
          《飞项会员协议》
        </span>
      </div>
      <div className={style.footer}>
        <div className={style.left}>
          开通个人会员，解锁四象限视图、桌面日历挂件等超值权益
        </div>
        <div className={style.right} onClick={goInterests}>
          <span>查看完整权益</span>
          <ArrowRight color="#F1AA40" />
        </div>
      </div>
    </div>
  )
}

export default PayButton
