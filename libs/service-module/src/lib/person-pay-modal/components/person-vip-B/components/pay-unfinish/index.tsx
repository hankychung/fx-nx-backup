import React, { useContext, useState, useEffect, useMemo } from 'react'
import style from './index.module.scss'
import { Modal } from 'antd'
import { ReactComponent as Diamond } from '../../../../../../assets/payImg/diamond_small.svg'
import { ReactComponent as Close } from '../../../../../../assets/payImg/close.svg'
import { IActiveGoods } from '@flyele-nx/api'
import { regFenToYuan } from '../../../../utils'
import { useMemoizedFn, useMount } from 'ahooks'

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
  console.log('vipMealList', vipMealList)
  const meal = useMemo(() => {
    return vipMealList.find((item) => item.name === '终身会员')
  }, [vipMealList])
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

export default PayUnfinish
