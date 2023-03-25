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
    name,
    avatar,
    personVipBtnClick,
    teamVipBtnClick
  } = props
  const Controller = useController(new FlyBasePopperCtrl())

  const text = useMemo(() => {
    if (isTeamVip) return '你当前是团队会员'
    else if (isVip) return '你当前是个人会员'
    else return '你当前是免费账户'
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
            联系客服
          </Button>
        </FlyBasePopper>
      </div>
      <VipIntroduceContent
        isTeamVip={!!isTeamVip}
        isVip={!!isVip}
        personVipBtnClick={personVipBtnClick}
        teamVipBtnClick={teamVipBtnClick}
        customBtnClick={() => {
          Controller.show()
        }}
      />
    </Modal>
  )
}

export const VipIntroduce = memo(_VipIntroduce)
