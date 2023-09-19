import { I18N } from '@flyele-nx/i18n'
import { IActiveGoods } from '@flyele-nx/api'
import cs from 'classnames'
import React, { useContext, useEffect, useMemo, useState } from 'react'
import style from './index.module.scss'
import { ReactComponent as ArrowRight } from '../../../../../../assets/payImg/arrow_right.svg'
import { SelectMemberContext } from '../../../../context/context'
import PayUnfinish from '../pay-unfinish'
import RetrievePayModalTeam from '../../../../../retrieve-pay-modal-team'

interface Iprops {
  activeGood?: IActiveGoods[]
  payClick: () => void
  payLife: () => void
  goProtocol?: () => void
  goInterests?: () => void
  vipMealList: IActiveGoods[]
}
const PayButton = (props: Iprops) => {
  const { payClick, goProtocol, goInterests, vipMealList, payLife } = props
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
        <div className={cs(style.payBtn)} onClick={payClick}>
          {I18N.common.immediatePayment}
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
