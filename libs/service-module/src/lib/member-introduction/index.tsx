import React, { useEffect, useMemo, useRef, useState } from 'react'
import styles from './index.module.scss'
import { IntroductionBox } from './components/introduction-box'
import { memberPowerStaticData } from '@flyele-nx/constant'
import PayModal, { IFlyeleAvatarItem } from '../pay-modal'
import { Modal } from 'antd'
import CustomerServicesModal from '../customer-services-modal'
import QrCodeLogin from '../qrcode-login'
import { ReactComponent as LoginTextBg } from '../../assets/login/loginTextBg.svg'
import { envStore, UsercApi } from '@flyele-nx/service'
import { useMemoizedFn } from 'ahooks'
import { paymentApi } from '@flyele-nx/service'
/**
 * 0-非会员，1-个人会员，2-团队会员
 */
export enum VipTypeEnum {
  Poor = 0,
  Person = 1,
  Team = 2
}

export const MemberIntroduction = () => {
  const [show, setShow] = useState(false)
  const [vipType, setVipType] = useState('')
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [showCustomerModal, setShowCustomerModal] = useState(false)
  const [isShowPay, setIsShowPay] = useState(false)
  const [orderCode, setOrderCode] = useState('')
  const [memberList, setMemberList] = useState<IFlyeleAvatarItem[]>([])
  const [selfUserInfo, setSelfUserInfo] = useState<IFlyeleAvatarItem>()
  const ChildRef = useRef(null)
  const TimerRef = useRef<NodeJS.Timer | undefined>()
  const onClickBtn = (key: string) => {
    if (key === 'personal' || key === 'team') {
      setVipType(key)
      setShowLoginModal(true)
    }
    if (key === 'custom') {
      setShowCustomerModal(true)
    }
  }
  const getOrderDetail = () => {
    paymentApi
      .getOrderDetail({
        out_trade_no: orderCode
      })
      .then((res) => {
        if (res.code === 0) {
          if (res.data === 12001) {
            setIsShowPay(false)
          }
        }
      })
  }
  const initFn = useMemoizedFn(() => {
    return setInterval(() => {
      getOrderDetail()
    }, 2000)
  })
  useEffect(() => {
    clearInterval(TimerRef.current)

    if (orderCode && show) {
      TimerRef.current = initFn()
    }
  }, [orderCode, initFn, show])

  const checkVipType = (
    vip_type?: VipTypeEnum,
    vip_next_expired_at?: number
  ) => {
    if (vip_next_expired_at) {
      return {
        isVip: true,
        isTeamVip: true
      }
    }

    const isVip = vip_type === VipTypeEnum.Person
    const isTeamVip = vip_type === VipTypeEnum.Team

    return {
      isVip,
      isTeamVip
    }
  }
  /**
   * 请求协作人列表
   */
  const fetchTakerList = async () => {
    const { data } = await UsercApi.getContacts()
    const { data: selfUserInfo } = await UsercApi.getLoginUserInfo()
    const { data: vip } = await UsercApi.getCombo()

    const list = data.map((item) => {
      const { isTeamVip, isVip } = checkVipType(item.vip_type)
      return {
        userId: item.user_id,
        name: item.nick_name,
        pinyin: item.pinyin,
        avatar: item.avatar,
        telephone: (item.telephone || '').replace(
          /^(\d{3})\d{4}(\d+)/,
          '$1****$2'
        ),
        isVip,
        isTeamVip
      }
    })
    const { member } = vip
    const { isTeamVip, isVip } = checkVipType(member.state)
    const selfData = {
      userId: selfUserInfo.user_id,
      name: selfUserInfo.nick_name,
      pinyin: selfUserInfo.pinyin,
      avatar: selfUserInfo.avatar,
      telephone: selfUserInfo.telephone || '',
      isVip,
      isTeamVip,
      level: member.state,
      next_end_time: member.next_end_time,
      end_time: member.end_time
    }
    setSelfUserInfo(selfData)
    setMemberList([selfData, ...list])
  }

  const onLoginSuccess = useMemoizedFn(async () => {
    await fetchTakerList()
    setShowLoginModal(false)
    setShow(true)
  })

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
        successRef={ChildRef}
        visible={show}
        isPaySuccess={isShowPay}
        mineId={selfUserInfo?.userId || ''}
        modalType="person"
        payType={payType}
        memberList={memberList}
        onClose={() => {
          setShow(false)
        }}
        originRoute="官网"
        domain={envStore.getDoMain()}
        getOrderCode={(code: string) => {
          setOrderCode(code)
        }}
        goInterests={() => {
          setShow(false)
        }}
        goProtocol={() => {
          window.open(
            'https://cdn.flyele.net/agreements/service-agreement.html'
          )
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
        destroyOnClose
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
