import { I18N, isCN } from '@flyele-nx/i18n'
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
import { identityData } from '@flyele-nx/constant'
import { CustomerServiceEmail } from '../customer-service-email'
export type IType = 'personVipCount' | 'teamVipCount'

export interface VipCountProps {
  handleClose: () => void
  handleConfirm: () => void
  open: boolean
  type: IType
}

function VipCount({ handleClose, handleConfirm, open, type }: VipCountProps) {
  const Controller = useController(new FlyBasePopperCtrl())
  const person_bac = 'https://cdn.flyele.net/resources/PC/person_bac.png'
  const team_bac = 'https://cdn.flyele.net/resources/PC/team_bac.png'
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
          src={type === 'personVipCount' ? person_bac : team_bac}
          alt=""
          className={styles.content_img}
        />
        <div className={styles.content}>
          <div className={styles.title}>
            <div
              className={classNames(styles.title_left, {
                [styles.team_title]: type === 'teamVipCount'
              })}
            >
              {type === 'personVipCount' && (
                <div>{I18N.common.openingAPersonalMeeting2}</div>
              )}
              {type === 'teamVipCount' && (
                <div>{I18N.common.openingATeamMeeting4}</div>
              )}
              <div
                className={classNames(styles.interests, {
                  [styles.team_title]: type === 'teamVipCount'
                })}
                onClick={handleConfirm}
              >
                <span>{I18N.common.viewFullRights}</span>
                <ArrowRight
                  color={
                    type === 'personVipCount' ? 'rgba(108, 64, 8, 1)' : '#fff'
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
                    {isCN ? (
                      <CustomerServicesModal
                        onClose={() => {
                          Controller.hide()
                        }}
                      />
                    ) : (
                      <CustomerServiceEmail
                        onClose={() => {
                          Controller.hide()
                        }}
                      />
                    )}
                  </div>
                )}
              >
                <div className={styles.customer}>
                  <Customer></Customer>
                  <span>{I18N.common.contactCustomerService}</span>
                </div>
              </FlyBasePopper>
            </div>
          </div>
          <div className={styles.content_block}>
            <div className={styles.list}>
              <div className={styles.header}>
                <div className={styles.header_item}></div>
                <div className={styles.header_item}>
                  {I18N.officialWebsite.free}
                </div>
                <div className={styles.header_item}>
                  {type === 'personVipCount'
                    ? I18N.common.premium
                    : I18N.common.business}
                </div>
              </div>
              <div className={styles.list_item}>
                {identityData.map((item) => {
                  if (type === 'personVipCount' && !item.personal) return null
                  if (type === 'teamVipCount' && !item.team) return null
                  return (
                    <div className={styles.item_block} key={item.key}>
                      <div className={styles.item}>{item.title}</div>
                      <div className={styles.item}>{item.free}</div>
                      <div className={styles.item}>
                        {type === 'personVipCount' ? item.personal : item.team}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
            <div className={styles.content_btn}>
              <div
                className={classNames(styles.btn, {
                  [styles.teamPayBtn]: type === 'teamVipCount'
                })}
                onClick={handleConfirm}
              >
                {I18N.common.activateMembership}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  )
}

export const VipCountModal = memo(VipCount)

export default VipCountModal
