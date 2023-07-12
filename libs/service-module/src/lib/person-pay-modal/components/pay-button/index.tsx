import { IActiveGoods } from '@flyele-nx/api'
import cs from 'classnames'
import React, { useContext, useEffect, useState } from 'react'
import { IFlyeleAvatarItem } from '../../../pay-modal'
import { regFenToYuan } from '../../utils'
import { VipMealType } from '../controller'
import style from './index.module.scss'
import { SelectMemberContext } from '../../context/context'

interface Iprops {
  vipMealType: VipMealType
  activeGood?: IActiveGoods[]
  resultArr?: IFlyeleAvatarItem[]
  payClick: () => void
  goProtocol?: () => void
}
const PayButton = (props: Iprops) => {
  const {
    vipMealType = 1,
    activeGood = [],
    payClick,
    resultArr = [],
    goProtocol
  } = props
  const [isShow, setIsShow] = useState(false)

  const activeItem = activeGood[0]
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
      {activeItem && (
        <div className={style.priceSum}>
          <span>合计</span>
          <div className={style.price}>
            {activeItem && activeItem.end_at && (
              <span>{`已省¥${
                vipMealType === VipMealType.TEAM
                  ? +regFenToYuan(
                      activeItem.original_price -
                        activeItem.now_price -
                        (activeItem.price || 0)
                    ) * resultArr?.length
                  : regFenToYuan(
                      activeItem.original_price -
                        activeItem.now_price -
                        (activeItem.price || 0)
                    )
              }`}</span>
            )}
            <div>
              <span>¥</span>
              <span>
                {vipMealType === VipMealType.TEAM
                  ? +regFenToYuan(
                      activeItem.now_price - (activeItem.price || 0)
                    ) * resultArr?.length
                  : regFenToYuan(
                      activeItem.now_price - (activeItem.price || 0)
                    )}
              </span>
            </div>
          </div>
        </div>
      )}
      <div
        className={cs(style.payBtn, {
          [style.teamPayBtn]: vipMealType === VipMealType.TEAM,
          [style.noMember]:
            vipMealType === VipMealType.TEAM && resultArr.length === 0
        })}
        onClick={payClick}
      >
        立即支付
      </div>
      <div className={style.protocol}>
        支付即视为同意
        <span
          className={cs({
            [style.teamColor]: vipMealType === VipMealType.TEAM
          })}
          onClick={() => {
            goProtocol && goProtocol()
          }}
        >
          《飞项会员协议》
        </span>
      </div>
      {/* <PayUnfinish
        isShow={isShow}
        onClose={() => setIsShow(false)}
        payClick={payClick}
      /> */}
    </div>
  )
}

export default PayButton
