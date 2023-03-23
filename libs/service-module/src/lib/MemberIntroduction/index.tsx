import React, { useMemo, useState } from 'react'
import styles from './index.module.scss'
import { IntroductionBox } from './components/IntroductionBox'
import { memberPowerStaticData } from '@flyele-nx/constant'
import PayModal from '../PayModal'
import { Modal } from 'antd'
import CustomerServicesModal from '../CustomerServicesModal'
import QrCodeLogin from '../qrCode-login'
import { ReactComponent as LoginTextBg } from '../../assets/login/loginTextBg.svg'
import { UsercApi, IContactsAndStatus } from '@flyele-nx/service'

export const MemberIntroduction = () => {
  const [show, setShow] = useState(false)
  const [vipType, setVipType] = useState('')
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [showCustomerModal, setShowCustomerModal] = useState(false)
  const [taker, setTaker] = useState<IContactsAndStatus[]>([])

  const onClickBtn = (key: string) => {
    if (key === 'personal' || key === 'team') {
      setVipType(key)
      setShowLoginModal(true)
    }
    if (key === 'custom') {
      setShowCustomerModal(true)
    }
  }

  /**
   * 请求协作人列表
   */
  const fetchTakerList = async () => {
    const { data } = await UsercApi.getContacts()
    setTaker(data)
  }

  const onLoginSuccess = async () => {
    await fetchTakerList()
    setShowLoginModal(false)
    setShow(true)
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
        <div>
          <div className={styles.loginTitleBox}>
            <div style={{ marginLeft: '-24px' }}>
              <LoginTextBg />
            </div>
            <div className={styles.text}>未注册用户将自动注册</div>
          </div>
          <QrCodeLogin
            deviceParams={{
              client_version: '0.0.1',
              os: 'html5',
              platform: 'web',
              device_name: 'browser'
            }}
            onSuccess={onLoginSuccess}
          />
        </div>
      </Modal>
    </div>
  )
}
