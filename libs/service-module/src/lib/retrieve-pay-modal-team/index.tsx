/*
 * @Author: wanghui wanghui@flyele.net
 * @Date: 2023-03-09 09:55:49
 * @LastEditors: wanghui wanghui@flyele.net
 * @LastEditTime: 2023-06-27 11:23:17
 */
import { ReactComponent as Close } from '../../assets/payImg/close.svg'
import { ReactComponent as Crown } from '../../assets/payImg/crown.svg'
import { ReactComponent as Listen } from '../../assets/payImg/listen.svg'
import { ReactComponent as CustomerService } from '../../assets/payImg/customer_service.svg'
import { ReactComponent as Phone } from '../../assets/payImg/phone.svg'
import { ReactComponent as CheckQuestion } from '../../assets/payImg/check_question.svg'
import { ReactComponent as CheckArrow } from '../../assets/payImg/check_arrow.svg'

import style from './index.module.scss'
import { CommonQuestionModal } from '../retrieve-pay-modal/CommonQuestionModal'
import { useState } from 'react'
import { Modal } from 'antd'

interface Iprops {
  onClose: () => void
  isShow: boolean
}
const RetrievePayModalTeam = (props: Iprops) => {
  const { onClose, isShow } = props
  const [modalVisible, setModalVisible] = useState(false)

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
          <div className={style.title}>是否对团队会员存在顾虑？</div>

          <div className={style.body}>
            <div className={style.top}>
              <Listen />
              <div>
                <div className={style.addCustomerService}>添加专属客服</div>
                <div className={style.answer}>为您解答所有疑问</div>
              </div>
            </div>
            <div className={style.customer}>
              <CustomerService />
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
          </div>
        </div>
        <div className={style.footer} onClick={openCommonQuestionModal}>
          <CheckQuestion />
          <div>查看常见问题</div>
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
