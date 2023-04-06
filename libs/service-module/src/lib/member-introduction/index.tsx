import React, { useMemo, useState } from 'react'
import styles from './index.module.scss'
import { IntroductionBox } from './components/introduction-box'
import { memberPowerStaticData } from '@flyele-nx/constant'
import PayModal, { IFlyeleAvatarItem } from '../pay-modal'
import { Modal } from 'antd'
import CustomerServicesModal from '../customer-services-modal'
import QrCodeLogin from '../qrcode-login'
import { ReactComponent as LoginTextBg } from '../../assets/login/loginTextBg.svg'
import { UsercApi } from '@flyele-nx/service'

export const MemberIntroduction = () => {
  const [show, setShow] = useState(false)
  const [vipType, setVipType] = useState('')
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [showCustomerModal, setShowCustomerModal] = useState(false)
  const [memberList, setMemberList] = useState<IFlyeleAvatarItem[]>([])
  const [selfUserInfo, setSelfUserInfo] = useState<IFlyeleAvatarItem>()
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
    const { data: selfUserInfo } = await UsercApi.getLoginUserInfo()

    const list = data.map((item) => {
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

    const selfData = {
      userId: selfUserInfo.user_id,
      name: selfUserInfo.nick_name,
      pinyin: selfUserInfo.pinyin,
      avatar: selfUserInfo.avatar,
      telephone: selfUserInfo.telephone || '',
      isVip: true,
      isTeamVip: true
    }
    setSelfUserInfo(selfData)
    setMemberList([selfData, ...list])
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
        isPaySuccess={false}
        mineId={selfUserInfo?.userId || ''}
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
