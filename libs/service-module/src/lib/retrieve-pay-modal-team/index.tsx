import { I18N } from '@flyele-nx/i18n'
import { ReactComponent as Close } from '../../assets/payImg/close.svg'
import { ReactComponent as Crown } from '../../assets/payImg/crown.svg'
import { ReactComponent as Listen } from '../../assets/payImg/listen.svg'
import customerService from '../../assets/payImg/customer_service.png'
import { ReactComponent as Phone } from '../../assets/payImg/phone.svg'
import { ReactComponent as CheckQuestion } from '../../assets/payImg/check_question.svg'
import { ReactComponent as CheckArrow } from '../../assets/payImg/check_arrow.svg'

import style from './index.module.scss'
import { CommonQuestionModal } from '../retrieve-pay-modal/CommonQuestionModal'
import { useState } from 'react'
import { Modal } from 'antd'
import { globalInfoHandler } from '@flyele-nx/zustand-handler'
import { EmailPurpleIcon } from '@flyele-nx/icon'

interface Iprops {
  onClose: () => void
  isShow: boolean
}
const RetrievePayModalTeam = (props: Iprops) => {
  const { onClose, isShow } = props
  const [modalVisible, setModalVisible] = useState(false)
  const isCn = globalInfoHandler.langIsCn()

  const openCommonQuestionModal = () => {
    setModalVisible(true)
  }

  const closeCommonQuestionModal = () => {
    setModalVisible(false)
  }
  return (
    <Modal
      open={isShow}
      centered
      footer={null}
      closable={false}
      wrapClassName={style.modalWrap}
      width={320}
    >
      <div className={style.content}>
        <div className={style.head}>
          <Crown></Crown>
          <Close
            className={style.close}
            onClick={() => {
              onClose()
            }}
          ></Close>
        </div>
        <div className={style.ModalBox}>
          <div className={style.title}>
            {I18N.common.isItImportantForTheTeam}
          </div>

          <div className={style.body}>
            <div className={style.top}>
              <Listen />
              <div>
                <div className={style.addCustomerService}>
                  {I18N.common.addExclusiveCustomers}
                </div>
                <div className={style.answer}>
                  {I18N.common.toAnswerYourQuestions}
                </div>
              </div>
            </div>
            {isCn ? (
              <>
                <div className={style.customer}>
                  <img src={customerService}></img>
                </div>
                <div className={style.phone}>
                  <Phone />
                  <div>
                    珊珊&nbsp;
                    <span style={{ color: 'rgba(186, 185, 218, 1)' }}>
                      150-0200-7797
                    </span>
                  </div>
                </div>
                <div className={style.bottom}>微信扫码即可添加</div>
              </>
            ) : (
              <div className={style.emailWrapper}>
                <div className={style.line} />
                <EmailPurpleIcon className={style.icon} />
                <div className={style.desc}>
                  You can contact us at the following email address：
                </div>
                <div className={style.email}>flyele@flyele.net</div>
              </div>
            )}
          </div>
        </div>
        <div className={style.footer} onClick={openCommonQuestionModal}>
          <CheckQuestion />
          <div>{I18N.common.viewCommonQuestions}</div>
          <CheckArrow />
        </div>
        <CommonQuestionModal
          visible={modalVisible}
          onClose={closeCommonQuestionModal}
        />
      </div>
    </Modal>
  )
}

export default RetrievePayModalTeam
