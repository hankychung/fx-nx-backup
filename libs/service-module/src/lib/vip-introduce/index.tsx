import { Button, Modal } from 'antd'
import React, { memo, useMemo } from 'react'
import { ReactComponent as CustomerIcon } from '../../assets/vip-introduce/customer_service.svg'
import { VipIntroduceContent } from './content'
import css from './index.module.scss'
import { BaseUserInfo } from '@flyele-nx/ui'
import {
  FlyBasePopper,
  FlyBasePopperCtrl,
  useController
} from '@flyele/flyele-components'
import { I18N } from '@flyele-nx/i18n'
import CustomerServicesModal from '../customer-services-modal'
import { BaseUserInfoType } from '@flyele-nx/ui'
import { VipIntroduceContentProps } from './types'

type IProps = {
  open: boolean
  onClose?: () => void
} & BaseUserInfoType &
  Omit<VipIntroduceContentProps, 'customBtnClick'>

const _VipIntroduce = (props: IProps) => {
  const {
    open,
    onClose,
    isVip,
    isTeamVip,
    isForeverVip,
    name,
    avatar,
    personVipBtnClick,
    teamVipBtnClick,
    descBtnClick
  } = props
  const Controller = useController(new FlyBasePopperCtrl())

  const text = useMemo(() => {
    if (isTeamVip) return I18N.common.businessPeople
    else if (isVip) return I18N.common.premiumPeople
    else return I18N.common.freePeople
  }, [isVip, isTeamVip])

  return (
    <Modal
      open={open}
      zIndex={1002}
      width={884}
      footer={null}
      centered
      onCancel={onClose}
      bodyStyle={{ padding: 0 }}
      className={css.container}
    >
      <div className={css.header}>
        <BaseUserInfo
          isVip={isVip}
          isTeamVip={isTeamVip}
          name={name}
          avatar={avatar}
          bottomRender={<span className={css.desc}>{text}</span>}
        />

        <FlyBasePopper
          controller={Controller}
          trigger="click"
          placement="bottom-end"
          showArrow={false}
          zIndex={1003}
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
          <Button
            onClick={() => {
              Controller.show()
            }}
            icon={<CustomerIcon />}
          >
            {I18N.common.help}
          </Button>
        </FlyBasePopper>
      </div>
      <VipIntroduceContent
        isTeamVip={!!isTeamVip}
        isVip={!!isVip}
        isForeverVip={isForeverVip}
        personVipBtnClick={personVipBtnClick}
        teamVipBtnClick={teamVipBtnClick}
        descBtnClick={descBtnClick}
        customBtnClick={() => {
          Controller.show()
        }}
      />
    </Modal>
  )
}

export const VipIntroduce = memo(_VipIntroduce)
