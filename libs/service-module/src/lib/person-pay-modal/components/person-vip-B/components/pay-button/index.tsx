import { I18N, isCN } from '@flyele-nx/i18n'
import { IActiveGoods } from '@flyele-nx/api'
import cs from 'classnames'
import React, { useContext, useEffect, useMemo, useState } from 'react'
import style from './index.module.scss'
import { ReactComponent as ArrowRight } from '../../../../../../assets/payImg/arrow_right.svg'
import { SelectMemberContext } from '../../../../context/context'
import PayUnfinish from '../pay-unfinish'
import { Paypal } from '@flyele-nx/paypal'

interface Iprops {
  activeGood?: IActiveGoods[]
  payClick: () => void
  payLife: () => void
  goProtocol?: () => void
  goInterests?: () => void
  vipMealList: IActiveGoods[]
  productId?: string
}
const PayButton = (props: Iprops) => {
  const {
    payClick,
    goProtocol,
    goInterests,
    vipMealList,
    payLife,
    productId = ''
  } = props
  const [isShow, setIsShow] = useState(false)
  const service = useContext(SelectMemberContext)

  useEffect(() => {
    service.addListener((ev) => {
      const { event } = ev
      if (event === 'showPay') {
        const vipMealType = service.getData('showPay').vipMealType
        if (vipMealType === 1) {
          setIsShow(true)
        }
      }
    })

    return () => {
      service.dispose()
    }
  }, [service])

  return (
    <div className={style.payButton}>
      <div>
        <div className={cs(style.payBox)} onClick={payClick}>
          {isCN ? (
            <div className={cs(style.payBtn)}>
              {I18N.common.immediatePayment}
            </div>
          ) : (
            <Paypal productId={productId} width={324} height={44}></Paypal>
          )}
        </div>
        <div className={style.protocol}>
          {I18N.common.paymentIsConsideredAs}
          <span
            onClick={() => {
              goProtocol && goProtocol()
            }}
          >
            {I18N.common.feixiangMemberAssociation}
          </span>
        </div>
      </div>
      <div className={style.footer}>
        <div className={style.left}>{I18N.common.openingPersonalVip}</div>
        <div className={style.right} onClick={goInterests}>
          <span>{I18N.common.viewFullRights}</span>
          <ArrowRight color="#F1AA40" />
        </div>
      </div>
      <PayUnfinish
        isShow={isShow}
        onClose={() => setIsShow(false)}
        payClick={payLife}
        vipMealList={vipMealList}
      />
    </div>
  )
}

export default PayButton
