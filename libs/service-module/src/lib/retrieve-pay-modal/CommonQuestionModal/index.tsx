import { I18N } from '@flyele-nx/i18n'
import { Modal } from 'antd'
import React, { useState } from 'react'
import { ReactComponent as Add } from '../../../assets/payImg/commom_question_add.svg'
import { ReactComponent as Subtract } from '../../../assets/payImg/common_question_subtract.svg'
import {
  FlyBasePopper,
  FlyBasePopperCtrl,
  useController
} from '@flyele/flyele-components'
// import { CustomerServicesModal } from '@flyele-nx/service-module'
import style from './index.module.scss'
import { TakerRuleExplain } from './TakerRuleExplain'
import CustomerServicesModal from '../../customer-services-modal'
// import CustomerServicesModal from 'libs/ui/src/lib/customer-services-modal'
interface IProps {
  visible: boolean
  onClose: () => void
}

/** 空间权益常见问题提示弹窗 */
export const CommonQuestionModal: React.FC<IProps> = (props) => {
  const { visible, onClose } = props
  const Controller = useController(new FlyBasePopperCtrl())
  const [help, setHelp] = useState(false)

  const [items, setItems] = useState([
    {
      key: 0,
      question: I18N.common.theProfessionalSpaceIs,
      answer:
        I18N.common.spaceItselfIsNot,
      highlightText: I18N.common.business,
      expanded: true
    },
    {
      key: 1,
      question: I18N.common.internalMembersAnd,
      answer:
        I18N.common.inAProfessionalSpace2,
      expanded: false,
      isClick: true
    },
    {
      key: 2,
      question: I18N.common.inAProfessionalSpace,
      answer: I18N.common.internalMembersNeedTo,
      expanded: false
    },
    {
      key: 3,
      question: I18N.common.multipleProfessionalVacancies,
      answer: I18N.common.noNeedJust,
      expanded: false
    },
    {
      key: 4,
      question: I18N.common.teamMembersHave2,
      answer:
        I18N.common.teamMembersHaveExpired,
      expanded: false
    },
    {
      key: 5,
      question: I18N.common.afterEmployeeResignation,
      answer: I18N.common.canYouPleaseContact,
      expanded: false
    },
    {
      key: 6,
      question: I18N.common.teamMembersAnd,
      answer:
        I18N.common.suitableForIndividualMembers,
      expanded: false
    }
  ])

  const handleItemClick = (index: number) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.key === index ? { ...item, expanded: !item.expanded } : item
      )
    )
  }

  const handleItemDifferenceClick = () => {
    setHelp(true)
  }

  return (
    <Modal
      title={null}
      open={visible}
      onCancel={onClose}
      footer={null}
      destroyOnClose
      centered
      maskClosable={false}
      bodyStyle={{ borderRadius: 8, overflow: 'hidden' }}
      width={728}
    >
      <div className={style.wrap}>
        <div className={style.header_title}>{I18N.common.frequentlyAskedQuestions}</div>
        <div className={style.question_answer}>
          {items.map((item, index) => {
            const isExpanded = item.expanded

            return (
              <div
                key={index}
                style={{
                  backgroundColor: isExpanded ? 'rgba(238, 238, 238, 0.7)' : ''
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    cursor: 'pointer'
                  }}
                  onClick={() => handleItemClick(index)}
                >
                  <div className={style.question}>{item.question}</div>
                  <div className={style.add_subtract}>
                    {isExpanded ? <Subtract /> : <Add />}
                  </div>
                </div>

                {item.isClick ? (
                  <div
                    className={style.answer}
                    style={{ display: isExpanded ? 'block' : 'none' }}
                  >
                    <div dangerouslySetInnerHTML={{ __html: item.answer }} />
                    <div
                      className={style.checkDifferent}
                      onClick={
                        item.isClick ? handleItemDifferenceClick : undefined
                      }
                    >
                      {I18N.common.viewInternalAndExternal}</div>
                  </div>
                ) : (
                  <div
                    className={style.answer}
                    style={{ display: isExpanded ? 'block' : 'none' }}
                    dangerouslySetInnerHTML={{ __html: item.answer }}
                  />
                )}
              </div>
            )
          })}
        </div>
        <TakerRuleExplain visible={help} setVisible={setHelp} />
        <div className={style.footer}>
          <FlyBasePopper
            controller={Controller}
            trigger="click"
            placement="top"
            showArrow={false}
            zIndex={1003}
            content={() => (
              <div>
                <CustomerServicesModal
                  onClose={() => {
                    Controller.hide()
                  }}
                />
              </div>
            )}
          >
            <div
              onClick={() => {
                Controller.show()
              }}
            >
              {I18N.common.needMoreHelp}</div>
          </FlyBasePopper>
        </div>
      </div>
    </Modal>
  )
}
