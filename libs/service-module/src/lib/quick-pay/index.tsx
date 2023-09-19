import React, { useEffect, useState } from 'react'
// import { UsercApi } from '../../service/index'
// import { service } from '../../service/service'
// import { add } from 'utils'
// import { Button } from 'ui'
import { Modal } from 'antd'
import cs from 'classnames'
import style from './index.module.scss'
import { isCN } from '@flyele-nx/i18n'
import Header from './components/header'
import MemberInfo from './components/member-info'
import PayQrCode from './components/pay-qrcode'
import { IFlyeleAvatarItem } from '../pay-modal'
import Protocol from './components/pay-qrcode/components/protocol'
import { IActiveGoods } from '@flyele-nx/api'
import { paymentApi } from '@flyele-nx/service'
import { useMemoizedFn } from 'ahooks'
import { Paypal } from '@flyele-nx/paypal'

interface Iprops {
  onClose: () => void
  mineId: string
  memberList: IFlyeleAvatarItem[]
  isPaySuccess: boolean
  domain: string
  goProtocol: () => void
  goInterests: () => void
}
const QuickPay = (props: Iprops) => {
  const {
    onClose,
    memberList,
    mineId,
    isPaySuccess,
    goProtocol,
    goInterests,
    domain
  } = props
  const [vipMeal, setVipMeal] = useState<IActiveGoods>() // 套餐list
  const [productId, setProductId] = useState('')

  const getOrder = useMemoizedFn(async (vipMeal?: IActiveGoods) => {
    const params = {
      amount: 1,
      coupon_id: 0,
      good_id: vipMeal?.id || 0,
      // good_id: 8,
      origin_route: 'PC客户端',
      total_price: (vipMeal?.now_price || 0) - (vipMeal?.price || 0) || 0,
      // total_price: 1,
      users_id: memberList.map((item) => item.userId),
      indent_member_type: 2
    }
    try {
      const res = await paymentApi.createOrder(params)

      return {
        ...res.data,
        total_price: (vipMeal?.now_price || 0) - (vipMeal?.price || 0) || 0
      }
    } catch (e) {
      console.log('getOrder error', e)
    }
  })

  useEffect(() => {
    if (isCN || !vipMeal) return

    getOrder(vipMeal).then((res) => {
      setProductId(res?.out_trade_no || '')
    })
  }, [getOrder, vipMeal])

  return (
    <div>
      <Modal
        open
        centered
        footer={null}
        closable={false}
        destroyOnClose
        maskClosable={false}
        width={360}
        wrapClassName={style.custom_modal}
        maskStyle={{ opacity: '0.4', background: '#000000', animation: 'none' }}
      >
        <div className={cs(style.modal_block)}>
          {/* 头部信息 */}
          <div className={style.topBlock}>
            <Header onClose={onClose} goInterests={goInterests} />
            {!isPaySuccess && (
              <MemberInfo
                memberList={memberList}
                mineId={mineId}
                setVipMeal={setVipMeal}
                vipMeal={vipMeal}
              />
            )}
          </div>
          <div className={style.bottomBlock}>
            {isCN ? (
              <PayQrCode
                getOrder={getOrder}
                memberList={memberList}
                vipMeal={vipMeal}
                isPaySuccess={isPaySuccess}
                onClose={onClose}
                domain={domain}
              />
            ) : (
              <>
                <div className={style.price}>
                  <span>$</span>
                  <span>
                    {(vipMeal?.now_price || 0) - (vipMeal?.price || 0) || 0}
                  </span>
                </div>
                <Paypal
                  productId={productId}
                  containerStyle={{
                    position: 'absolute',
                    top: '80px',
                    left: '50%',
                    transform: 'translateX(-50%)'
                  }}
                />
              </>
            )}
            {/* 协议 */}
            <div className={style.protocol}>
              <Protocol goProtocol={goProtocol} />
            </div>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export { QuickPay }
