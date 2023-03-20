import { Button, Modal } from 'antd'
import React, { memo, useMemo } from 'react'
import { ReactComponent as CustomerIcon } from '../../assets/vip-introduce/customer_service.svg'
import { VipIntroduceContent } from './Content'
import css from './index.module.scss'
import { BaseUserInfo } from '@flyele-nx/ui'
import {
  FlyAvatar,
  FlyBasePopper,
  FlyBasePopperCtrl,
  useController
} from '@flyele/flyele-components'
import CustomerServicesModal from '../CustomerServicesModal'
import { BaseUserInfoType } from 'libs/ui/src/lib/user-base-info'

type IProps = {
  open: boolean
  onClose?: () => void
} & BaseUserInfoType

const _VipIntroduce = (props: IProps) => {
  const { open, onClose, isPersonVip, isTeamVip, name, avatar } = props
  const Controller = useController(new FlyBasePopperCtrl())

  const text = useMemo(() => {
    if (isTeamVip) return '你当前是团队会员'
    else if (isPersonVip) return '你当前是个人会员'
    else return '你当前是免费账户'
  }, [isPersonVip, isTeamVip])

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
          isPersonVip={isPersonVip}
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
      <VipIntroduceContent />
    </Modal>
  )
}

export const VipIntroduce = memo(_VipIntroduce)
