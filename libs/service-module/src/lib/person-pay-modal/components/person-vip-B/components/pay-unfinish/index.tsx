import React, { memo, useEffect, useMemo } from 'react'
import style from './index.module.scss'
import { Modal } from 'antd'
import { ReactComponent as Diamond } from '../../../../../../assets/payImg/diamond_small.svg'
import { ReactComponent as Close } from '../../../../../../assets/payImg/close.svg'
import { IActiveGoods } from '@flyele-nx/api'
import { regFenToYuan } from '../../../../utils'
import { globalNxController } from '../../../../../../lib/global/nxController'
import { useUserInfoStore } from '../../../../../../lib/store/useUserInfoStore'

const PayUnfinish = ({
  isShow,
  onClose,
  payClick,
  vipMealList
}: {
  isShow: boolean
  onClose: () => void
  payClick: () => void
  vipMealList: IActiveGoods[]
}) => {
  const userId = +useUserInfoStore((state) => state.userInfo.user_id)

  const meal = useMemo(() => {
    return vipMealList.find((item) => item.name === '终身会员')
  }, [vipMealList])

  useEffect(() => {
    if (!isShow) return
    if (meal) {
      globalNxController.sensorSend('touch_to_pay_rule', {
        touch_rule: meal?.price
          ? '退出支付挽回弹窗--优惠期内'
          : '退出支付挽回弹窗--优惠期外',
        page_name: userId % 2 !== 0 ? '个人支付tabA' : '个人支付tabB'
      })
    }
  }, [isShow, userId, meal])

  return (
    <Modal
      open={isShow}
      centered
      footer={null}
      closable={false}
      width={332}
      wrapClassName={style.modalWrap}
    >
      <div className={style.wrap}>
        <div className={style.head}>
          <Diamond></Diamond>
          <Close
            className={style.close}
            onClick={() => {
              onClose()
            }}
          ></Close>
        </div>
        <div className={style.content}>
          <div>未支付成功</div>
          <div>终身会员限时优惠，不要错过啦</div>
          <div onClick={payClick}>
            仅需¥{regFenToYuan((meal?.now_price || 19800) - (meal?.price || 0))}
            ，开通终身会员
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default memo(PayUnfinish)
