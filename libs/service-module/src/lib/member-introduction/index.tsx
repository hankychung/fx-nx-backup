import React, { useMemo, useState } from 'react'
import styles from './index.module.scss'
import { IntroductionBox } from './components/introduction-box'
import { memberPowerStaticData } from '@flyele-nx/constant'
import PayModal, { IFlyeleAvatarItem } from '../pay-modal'
import { Modal } from 'antd'
import CustomerServicesModal from '../customer-services-modal'
import QrCodeLogin from '../qrcode-login'
import { ReactComponent as LoginTextBg } from '../../assets/login/loginTextBg.svg'
import { UsercApi, IContactsAndStatus } from '@flyele-nx/service'

export const MemberIntroduction = () => {
  const [show, setShow] = useState(false)
  const [vipType, setVipType] = useState('')
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [showCustomerModal, setShowCustomerModal] = useState(false)
  const [taker, setTaker] = useState<IContactsAndStatus[]>([])
  //我的协作人信息
  const memberList: IFlyeleAvatarItem[] = useMemo(() => {
    const list = taker.map((item) => {
      return {
        userId: item.user_id,
        name: item.nick_name,
        pinyin: item.pinyin,
        avatar: item.avatar,
        telephone: item.telephone || '',
        isVip: true,
        isTeamVip: true
      }
    })
    return list
  }, [taker])
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
        memberList={memberList}
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
