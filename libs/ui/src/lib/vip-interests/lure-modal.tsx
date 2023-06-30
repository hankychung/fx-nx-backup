import styles from './lure-modal.module.scss'
import { Modal } from 'antd'
import { memo } from 'react'
import { ReactComponent as ArrowRight } from './img/arrow_right.svg'
import { ReactComponent as Close } from './img/close.svg'
import { ReactComponent as Customer } from './img/customer.svg'
import {
  FlyBasePopper,
  FlyBasePopperCtrl,
  useController
} from '@flyele/flyele-components'
import CustomerServicesModal from '../customer-services-modal'
import classNames from 'classnames'
export type Type = 'personVipFunction' | 'teamVipFunction'

export interface VipInterestsProps {
  handleClose: () => void
  handleConfirm: () => void
  open: boolean
  type: Type
}

function VipInterests({
  handleClose,
  handleConfirm,
  open,
  type
}: VipInterestsProps) {
  const Controller = useController(new FlyBasePopperCtrl())
  const person_bac = 'https://cdn.flyele.net/resources/PC/person_bac.png'
  const team_bac = 'https://cdn.flyele.net/resources/PC/team_bac.png'
  const person_inter = 'https://cdn.flyele.net/resources/PC/person_inter1.png'
  const team_inter = 'https://cdn.flyele.net/resources/PC/team_inter.png'
  return (
    <Modal
      open={open}
      wrapClassName={styles.wrapper}
      width={720}
      centered
      closable={false}
      footer={null}
      destroyOnClose
    >
      <div className={styles.block}>
        <img
          src={type === 'personVipFunction' ? person_bac : team_bac}
          alt=""
          className={styles.content_img}
        />
        <div className={styles.content}>
          <div className={styles.title}>
            <div
              className={classNames(styles.title_left, {
                [styles.team_title]: type === 'teamVipFunction'
              })}
            >
              {type === 'personVipFunction' && (
                <div>个人会员享 10 项专属权益</div>
              )}
              {type === 'teamVipFunction' && (
                <div>开通团队会员享受专业空间权益</div>
              )}
              <div
                className={classNames(styles.interests, {
                  [styles.team_title]: type === 'teamVipFunction'
                })}
                onClick={handleConfirm}
              >
                <span>查看完整权益</span>
                <ArrowRight
                  color={
                    type === 'personVipFunction'
                      ? 'rgba(108, 64, 8, 1)'
                      : '#fff'
                  }
                />
              </div>
            </div>
            <div className={styles.title_right}>
              <Close onClick={handleClose} color="rgba(255, 255, 255, 1)" />
              <FlyBasePopper
                controller={Controller}
                trigger="click"
                placement="bottom-end"
                showArrow={false}
                content={() => (
                  <div>
                    <CustomerServicesModal
                      onClose={() => {
                        Controller.hide()
                      }}
                    ></CustomerServicesModal>
                  </div>
                )}
              >
                <div className={styles.customer}>
                  <Customer></Customer>
                  <span>联系客服</span>
                </div>
              </FlyBasePopper>
            </div>
          </div>
          <div className={styles.content_block}>
            {type === 'personVipFunction' && (
              <div>
                <img
                  src={person_inter}
                  alt=""
                  style={{ width: '606px', height: '336px' }}
                />
              </div>
            )}
            {type === 'teamVipFunction' && (
              <div>
                <img
                  src={team_inter}
                  alt=""
                  style={{ width: '606px', height: '336px' }}
                />
              </div>
            )}
            <div className={styles.content_btn}>
              <div
                className={classNames(styles.btn, {
                  [styles.teamPayBtn]: type === 'teamVipFunction'
                })}
                onClick={handleConfirm}
              >
                开通会员
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  )
}

export const VipInterestsModal = memo(VipInterests)

export default VipInterestsModal
