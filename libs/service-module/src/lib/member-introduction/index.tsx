import React, { useEffect, useMemo, useRef, useState } from 'react'
import styles from './index.module.scss'
import { IntroductionBox } from './components/introduction-box'
import {
  memberPowerStaticData,
  memberPowerStaticDataEn
} from '@flyele-nx/constant'
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
import { UserInfoUtils } from '@flyele-nx/utils'
import { I18N, ILang } from '@flyele-nx/i18n'
import { OverseasEmailLogin } from '../overseas-email-login'
import { OverseasContactUsModal } from '@flyele-nx/ui'

export const MemberIntroduction = ({
  widthStyle,
  handleMoreEquitySpace,
  lang
}: {
  widthStyle: string
  handleMoreEquitySpace: () => void
  lang?: ILang
}) => {
  const [show, setShow] = useState(false)
  const [vipType, setVipType] = useState('')
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [showCorpModal, setShowCorpModal] = useState(false)
  const [showEmailLogin, setShowEmailLogin] = useState(false)
  const [contactUsModal, setContactUsModal] = useState(false)

  const [showCustomerModal, setShowCustomerModal] = useState(false)
  const [isShowPay, setIsShowPay] = useState(false)
  const [orderCode, setOrderCode] = useState('')
  const [memberList, setMemberList] = useState<IFlyeleAvatarItem[]>([])
  const [selfUserInfo, setSelfUserInfo] = useState<IFlyeleAvatarItem>()
  const ChildRef = useRef(null)
  const TimerRef = useRef<NodeJS.Timer | undefined>()
  const [messageApi, contextHolder] = message.useMessage()

  const onClickBtn = async (key: string) => {
    // 方便调试直接放token可以绕过扫码登录
    // await service.updateToken(
    //   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2ODk3NjI0NzUsImlhdCI6MTY4OTc1NDcwOCwiaXNzIjoiYXBpLmZseWVsZS5uZXQiLCJVc2VySUQiOiIyMzk5NDQ0NjIxMzI5NjM4IiwiRGV2aWNlSUQiOiJkZjVlYzdjYy03YzBmLTQwNTAtOTBiZC1mZGE3OTY3MGNiZjIiLCJQbGF0Zm9ybSI6Im1vYmlsZSIsIkNsaWVudFZlcnNpb24iOiIyLjMwLjEwIiwiUGhvbmUiOiIiLCJOaWNrTmFtZSI6IiIsIkF2YXRhciI6IiJ9.0iIUgwDIAjZujayhOEO7Sf9N_d-9zbFWczNVQl1T_pk'
    // )
    // setVipType(key)
    // await fetchTakerList()
    // setShow(true)
    if (key === 'personal' || key === 'team') {
      setVipType(key)
      if (lang === 'en-US') {
        setShowEmailLogin(true)
        return
      }
      setShowLoginModal(true)
    }
    if (key === 'custom') {
      if (lang === 'en-US') {
        setContactUsModal(true)
        return
      }
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

  /**
   * 请求协作人列表
   */
  const fetchTakerList = async () => {
    const { data } = await UsercApi.getContacts()
    const { data: selfUserInfo } = await UsercApi.getLoginUserInfo()
    const { data: vip } = await UsercApi.getCombo()

    const list = data.map((item) => {
      const { isTeamVip, isVip } = UserInfoUtils.checkVipType({
        vip_type: item.vip_type
      })
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
    const { isTeamVip, isVip } = UserInfoUtils.checkVipType({
      vip_type: member.state
    })
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
    setShowEmailLogin(false)
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

  const powerStaticData = useMemo(() => {
    return lang === 'en-US' ? memberPowerStaticDataEn : memberPowerStaticData
  }, [lang])

  return (
    <div className={styles.memberIntroduction} style={{ width: widthStyle }}>
      {contextHolder}
      {powerStaticData.map((item) => {
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
        }}
        showMsg={() => {
          messageApi.open({
            type: 'error',
            content: I18N.common.pleaseSelectObj
          })
        }}
        originRoute="官网"
        domain={envStore.getPayHost()}
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
        needABTab={false}
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

      {/* 海外版 邮箱登录 */}
      <Modal
        open={showEmailLogin}
        width={410}
        centered
        destroyOnClose
        footer={null}
        maskClosable={false}
        onCancel={onCloseLoginModal}
      >
        <OverseasEmailLogin
          deviceParams={{
            client_version: '0.0.1',
            os: 'html5',
            platform: 'web',
            device_name: 'browser'
          }}
          onLoginSuccess={onLoginSuccess}
        />
      </Modal>

      {/* 海外版 联系我们 */}
      <OverseasContactUsModal
        open={contactUsModal}
        onCancel={() => setContactUsModal(false)}
      />
    </div>
  )
}
