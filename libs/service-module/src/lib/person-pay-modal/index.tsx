import React, { useState, useMemo } from 'react'
// import { UsercApi } from '../../service/index'
// import { service } from '../../service/service'
// import { add } from 'utils'
// import { Button } from 'ui'
import { Modal } from 'antd'
import cs from 'classnames'
import style from './index.module.scss'

import Header from './components/header'
import VipPackage from './components/vip-package'
import { VipMealType } from './components/controller'
import { useEffect } from 'react'
import { useCreation } from 'ahooks'
import { SelectMemberService } from './context/service'
import { SelectMemberContext } from './context/context'
import { IFlyeleAvatarItem } from '../pay-modal'
import RetrievePayModal from '../retrieve-pay-modal'
import RetrievePayModalTeam from '../retrieve-pay-modal-team'
interface Iprops {
  onClose: () => void
  payType?: VipMealType
  memberList: IFlyeleAvatarItem[]
  mineId: string
  domain: string
  originRoute?: string
  isPaySuccess: boolean
  showMsg?: () => void
  senConfirm?: () => void
  getOrderCode?: (str: string) => void
  goProtocol: () => void
  goInterests: () => void
}
const PersonPayModal = (props: Iprops) => {
  const {
    payType,
    onClose,
    memberList,
    mineId,
    domain,
    originRoute,
    senConfirm,
    isPaySuccess,
    getOrderCode,
    goProtocol,
    goInterests,
    showMsg
  } = props
  const [vipMealType, setVipMealType] = useState<VipMealType>(payType || 1) // 切换tab
  const [showRetrieveModal, setShowRetrieveModal] = useState(false)
  const [hasShowRetrieveModal, setHasShowRetrieveModal] = useState(false)
  useEffect(() => {
    if (payType) {
      setVipMealType(payType)
    }
  }, [payType])
  const service = useCreation(() => {
    return new SelectMemberService()
  }, [])

  const RetrieveModal = () => {
    if (isLifeLong && vipMealType === 1) {
      onClose()
    } else if (hasShowRetrieveModal && vipMealType === 2) {
      //这个判断主要是做团队会员只弹一次的功能
      onClose()
    } else {
      setShowRetrieveModal(true)
    }
  }
  const handleHasShowRetrieveModal = () => {
    setHasShowRetrieveModal(true)
  }
  const isLifeLong = useMemo(() => {
    const info = memberList.filter((item) => item.userId === mineId)[0]
    if (info.end_time === 9999999999 || info.next_end_time === 9999999999) {
      return true
    }
    return false
  }, [mineId, memberList])

  return (
    <div>
      <Modal
        open
        centered
        footer={null}
        closable={false}
        destroyOnClose
        maskClosable={false}
        width={752}
        wrapClassName={style.custom_modal}
        maskStyle={{ opacity: '0.7', background: '#000000', animation: 'none' }}
      >
        <SelectMemberContext.Provider value={service}>
          <div
            className={cs(style.modal_block, {
              [style.team_block]: vipMealType === VipMealType.TEAM
            })}
          >
            {/* 头部信息 */}
            <div>
              <Header
                onClose={RetrieveModal}
                mineId={mineId}
                memberList={memberList}
              />
            </div>
            {/* 套餐包信息 */}
            <VipPackage
              originRoute={originRoute}
              onClose={onClose}
              setVipMealType={setVipMealType}
              vipMealType={vipMealType}
              memberList={memberList}
              mineId={mineId}
              senConfirm={senConfirm}
              isPaySuccess={isPaySuccess}
              getOrderCode={getOrderCode}
              goProtocol={goProtocol}
              goInterests={goInterests}
              domain={domain}
              showMsg={showMsg}
              hasShowRetrieveModal={hasShowRetrieveModal}
              setHasShowRetrieveModal={handleHasShowRetrieveModal}
            />
          </div>
        </SelectMemberContext.Provider>
      </Modal>
      {vipMealType === 1 && showRetrieveModal ? (
        !isLifeLong && (
          <RetrievePayModal
            isShow={showRetrieveModal}
            onClose={() => {
              setShowRetrieveModal(false)
              onClose()
            }}
            isPaySuccess={isPaySuccess}
          />
        )
      ) : (
        <RetrievePayModalTeam
          isShow={showRetrieveModal}
          onClose={() => {
            setHasShowRetrieveModal(true)
            setShowRetrieveModal(false)
            onClose()
          }}
        />
      )}
    </div>
  )
}

export default PersonPayModal
