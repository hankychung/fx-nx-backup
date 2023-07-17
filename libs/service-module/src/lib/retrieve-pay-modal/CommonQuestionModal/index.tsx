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
      question: '专业空间是如何收费的？',
      answer:
        '空间本身不收费，但专业空间仅限<span  style="color: #5D7BFF;">团队会员</span>才可加入。因此在升级空间时，需要将空间成员开通团队会员才可正常使用。298元为帮每位成员开通团队会员的费用。',
      highlightText: '团队会员',
      expanded: true
    },
    {
      key: 1,
      question: '内部成员跟外部成员的区别？',
      answer:
        '在专业空间中，<span style="color: #5D7BFF;">内部成员需要付费，外部成员无需付费</span>。内部成员可以拥有所有高级功能的使用权益（部分管理权益可配置权限）。外部成员仅可进行事项协作，无法查看空间/项目。',
      expanded: false,
      isClick: true
    },
    {
      key: 2,
      question: '在专业空间中每个成员都需要付费吗？',
      answer: '内部成员需付费，外部成员无需付费',
      expanded: false
    },
    {
      key: 3,
      question: '多个专业空间需要多次付费吗？',
      answer: '不需要。只要内部成员是团队会员，即可正常参与多个专业空间。',
      expanded: false
    },
    {
      key: 4,
      question: '团队会员过期后会有什么影响？',
      answer:
        '团队会员过期后，成员仍会保留在专业空间中，包括TA创建的数据，但TA仅可参与事项，无法进入空间，直到重新续费团队会员。',
      expanded: false
    },
    {
      key: 5,
      question: '员工离职后会员权益可以转移吗？',
      answer: '可以，请联系客服处理',
      expanded: false
    },
    {
      key: 6,
      question: '团队会员跟个人会员的区别？',
      answer:
        '个人会员适合个人用户使用，提供面向个人的高级能力与简单的协作能力。团队会员拥有<span  style="color: #5D7BFF;">专业空间的使用权</span>，只有团队会员才能使用专业空间的所有高级协作能力，适合团队型用户使用',
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
        <div className={style.header_title}>常见问题</div>
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
                      查看内外部详细区别
                    </div>
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
              需要更多帮助？联系客服为你解答
            </div>
          </FlyBasePopper>
        </div>
      </div>
    </Modal>
  )
}
