import React, { useState } from 'react'
import { Modal } from 'antd'
import cs from 'classnames'
import style from './index.module.scss'

import Header from './components/header'
import MemberInfo from './components/member-info'
import PayQrCode from './components/pay-qrcode'
import { IFlyeleAvatarItem } from '../pay-modal'
import { IActiveGoods } from '@flyele-nx/api'
interface Iprops {
  onClose: () => void
  mineId: string
  memberList: IFlyeleAvatarItem[]
  isPaySuccess: boolean
  domain: string
  goProtocol: () => void
  goInterests: () => void
  handleModalType: () => void
  senConfirm?: () => void
}
const QuickPayPerson = (props: Iprops) => {
  const {
    onClose,
    memberList,
    mineId,
    isPaySuccess,
    goProtocol,
    goInterests,
    domain,
    handleModalType,
    senConfirm
  } = props
  const [vipMeal, setVipMeal] = useState<IActiveGoods>() // 套餐list
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
                handleModalType={handleModalType}
              />
            )}
          </div>
          <div>
            <PayQrCode
              goProtocol={goProtocol}
              memberList={memberList}
              vipMeal={vipMeal}
              isPaySuccess={isPaySuccess}
              onClose={onClose}
              domain={domain}
              senConfirm={senConfirm}
              mineId={mineId}
            />
          </div>
        </div>
      </Modal>
    </div>
  )
}

export { QuickPayPerson }
