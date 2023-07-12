import React, { useEffect, useMemo, useRef, useState } from 'react'
import styles from './index.module.scss'
import { IntroductionBox } from './components/introduction-box'
import { memberPowerStaticData } from '@flyele-nx/constant'
import PayModal, { IFlyeleAvatarItem } from '../pay-modal'
import { message, Modal } from 'antd'
import CustomerServicesModal from '../customer-services-modal'
import QrCodeLogin from '../qrcode-login'
import { ReactComponent as LoginTextBg } from '../../assets/login/loginTextBg.svg'
import { envStore, UsercApi, IUserInfo, service } from '@flyele-nx/service'
import { ReactComponent as OnlyPersonalImg } from '../../assets/login/onlyPersonal.svg'
import { useMemoizedFn } from 'ahooks'
import { paymentApi } from '@flyele-nx/service'
import { FlyButton } from '@flyele/flyele-components'
import RetrievePayModal from '../retrieve-pay-modal'
import RetrievePayModalTeam from '../retrieve-pay-modal-team'
import { VipMealType } from '../person-pay-modal/components/controller'

/**
 * 0-非会员，1-个人会员，2-团队会员
 */
export enum VipTypeEnum {
  Poor = 0,
  Person = 1,
  Team = 2
}

export const MemberIntroduction = ({
  widthStyle,
  handleMoreEquitySpace
}: {
  widthStyle: string
  handleMoreEquitySpace: () => void
}) => {
  const [show, setShow] = useState(false)
  const [vipType, setVipType] = useState('')
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [showCorpModal, setShowCorpModal] = useState(false)
  const [showPersonModal, setShowPersonModal] = useState(true)

  const [showCustomerModal, setShowCustomerModal] = useState(false)
  const [isRetrievePay, setIsRetrievePay] = useState(false)
  const [isShowPay, setIsShowPay] = useState(false)
  const [orderCode, setOrderCode] = useState('')
  const [memberList, setMemberList] = useState<IFlyeleAvatarItem[]>([])
  const [selfUserInfo, setSelfUserInfo] = useState<IFlyeleAvatarItem>()
  const ChildRef = useRef(null)
  const TimerRef = useRef<NodeJS.Timer | undefined>()
  const [messageApi, contextHolder] = message.useMessage()

  const onClickBtn = async (key: string) => {
    //方便调试
    // await service.updateToken(
    //   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2ODkxNTEwNDIsImlhdCI6MTY4OTE0MzMxNiwiaXNzIjoiYXBpLmZseWVsZS5uZXQiLCJVc2VySUQiOiIyNTc0NDgxNTM1Nzk1MzYzIiwiRGV2aWNlSUQiOiJjNzNhMTEwMy0wYzJmLTQ0ZTQtYWNhNy05MWY1Y2ZhM2UxYTAiLCJQbGF0Zm9ybSI6Im1vYmlsZSIsIkNsaWVudFZlcnNpb24iOiIyLjMwLjEwIiwiUGhvbmUiOiIiLCJOaWNrTmFtZSI6IiIsIkF2YXRhciI6IiJ9.seDDb5ESgFvjx4QyIXbG92hlMglLq7aMU_cXwG9MQkc'
    // )
    // setVipType(key)
    // await fetchTakerList()
    // setShow(true)
    if (key === 'personal' || key === 'team') {
      setVipType(key)
      setShowLoginModal(true)
    }
    if (key === 'custom') {
      setShowCustomerModal(true)
    }
  }

  const getOrderDetail = useMemoizedFn(() => {
    if (!orderCode) return
    paymentApi
      .getOrderDetail({
        out_trade_no: orderCode
      })
      .then((res) => {
        console.log(res)

        if (res.code === 0) {
          if (res.data === 12001) {
            setIsShowPay(true)
          }
        }
      })
  })

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
    if (!show) {
      setOrderCode('')
      setIsShowPay(false)
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

  /**
   * 关闭登录弹窗
   */
  const onCloseLoginModal = () => {
    setShowCorpModal(false)
    setShowLoginModal(false)
  }

  const onLoginSuccess = useMemoizedFn(async (data?: IUserInfo) => {
    if (data?.corpid) {
      setShowCorpModal(true)
      return
    }

    await fetchTakerList()
    onCloseLoginModal()
    setShow(true)
  })

  const payType = useMemo(() => {
    return vipType === 'personal' ? 1 : 2
  }, [vipType])

  return (
    <div className={styles.memberIntroduction} style={{ width: widthStyle }}>
      {contextHolder}
      {memberPowerStaticData.map((item) => {
        return (
          <IntroductionBox
            key={item.key}
            info={item}
            onClickBtn={() => onClickBtn(item.key)}
            handleMoreEquitySpace={handleMoreEquitySpace}
          />
        )
      })}
      <PayModal
        successRef={ChildRef}
        visible={show}
        isPay={isShowPay}
        mineId={selfUserInfo?.userId || ''}
        modalType="person"
        payType={payType}
        memberList={memberList}
        onClose={(modalType) => {
          setShow(false)
          setIsShowPay(false)
          setIsRetrievePay(true)
          // setModalType(modalType)
          // console.log('modaleType', modalType)
        }}
        showMsg={() => {
          messageApi.open({
            type: 'error',
            content: '请选择开通对象'
          })
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
        setShowPersonModal={setShowPersonModal}
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
      {showPersonModal ? (
        <RetrievePayModal
          onClose={() => setIsRetrievePay(false)}
          isShow={isRetrievePay}
          successRef={ChildRef}
        />
      ) : (
        <RetrievePayModalTeam
          onClose={() => setIsRetrievePay(false)}
          isShow={isRetrievePay}
        />
      )}
      <Modal
        open={showLoginModal}
        width={480}
        centered
        destroyOnClose
        footer={null}
        maskClosable={false}
        onCancel={onCloseLoginModal}
      >
        {showCorpModal ? (
          <div className={styles.corpModalRoot}>
            <div className={styles.titleBox}>
              <OnlyPersonalImg />
            </div>
            <div className={styles.descBox}>
              <div>您当前是企业微信账户，暂不支持开通使用；</div>
              <div>
                如需获取各项专属权益，请移步至企业微信后台管理应用内购买使用。
              </div>
            </div>
            <div className={styles.btn}>
              <FlyButton block theme="primary" onClick={onCloseLoginModal}>
                好的
              </FlyButton>
            </div>
          </div>
        ) : (
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
        )}
      </Modal>
    </div>
  )
}
