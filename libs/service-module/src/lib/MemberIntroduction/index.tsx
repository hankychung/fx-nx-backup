import React, { useMemo, useState } from 'react'
import styles from './index.module.scss'
import { IntroductionBox } from './components/IntroductionBox'
import { memberPowerStaticData } from '@flyele-nx/constant'
import PayModal from '../PayModal'
import { Modal } from 'antd'
import CustomerServicesModal from '../CustomerServicesModal'
import QrCodeLogin from '../qrCode-login'

export const MemberIntroduction = () => {
  const [show, setShow] = useState(false)
  const [vipType, setVipType] = useState('')
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [showCustomerModal, setShowCustomerModal] = useState(false)

  const onClickBtn = (key: string) => {
    if (key === 'personal' || key === 'team') {
      setVipType(key)
      setShowLoginModal(true)
      // setShow(true)
    }
    if (key === 'custom') {
      setShowCustomerModal(true)
    }
  }

  const payType = useMemo(() => {
    return vipType === 'personal' ? 1 : 2
  }, [vipType])

  return (
    <div className={styles.memberIntroduction}>
      {memberPowerStaticData.map((item) => {
        return (
          <IntroductionBox
            key={item.key}
            info={item}
            onClickBtn={() => onClickBtn(item.key)}
          />
        )
      })}

      <PayModal
        visible={show}
        mineId=""
        modalType="person"
        payType={payType}
        memberList={[]}
        onClose={() => {
          setShow(false)
        }}
      ></PayModal>

      <Modal
        open={showCustomerModal}
        width={320}
        centered
        footer={null}
        closable={false}
        wrapClassName={styles.modalWrap}
      >
        <CustomerServicesModal onClose={() => setShowCustomerModal(false)} />
      </Modal>

      <Modal
        open={showLoginModal}
        width={480}
        centered
        footer={null}
        maskClosable={false}
        onCancel={() => setShowLoginModal(false)}
      >
        <QrCodeLogin />
      </Modal>
    </div>
  )
}
