import { IActiveGoods } from '@flyele-nx/api'
import cs from 'classnames'
import React, { useContext, useEffect, useMemo, useState } from 'react'
import style from './index.module.scss'
import { ReactComponent as ArrowRight } from '../../../../../../assets/payImg/arrow_right.svg'
import { useGetState } from 'ahooks'
import { SelectMemberContext } from '../../../../context/context'
import PayUnfinish from '../pay-unfinish'

interface Iprops {
  activeGood?: IActiveGoods[]
  payClick: () => void
  goProtocol?: () => void
  goInterests?: () => void
  vipMealList: IActiveGoods[]
}
const PayButton = (props: Iprops) => {
  const { payClick, goProtocol, goInterests, vipMealList } = props
  const [isShow, setIsShow] = useState(false)
  const service = useContext(SelectMemberContext)

  useEffect(() => {
    service.addListener((ev) => {
      const { event } = ev
      if (event === 'showPay') {
        const isPayFinish = service.getData('showPay').isPayUnFinish
        if (isPayFinish) {
          setIsShow(isPayFinish)
        }
      }
    })

    return () => {
      service.dispose()
    }
  }, [service])

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
      <PayUnfinish
        isShow={isShow}
        onClose={() => setIsShow(false)}
        payClick={payClick}
        vipMealList={vipMealList}
      />
    </div>
  )
}

export default PayButton
