import { Button, Modal } from 'antd'
import React, { memo } from 'react'
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

interface IProps {
  open: boolean
  onClose?: () => void
}
const _VipIntroduce = (props: IProps) => {
  const { open, onClose } = props
  const Controller = useController(new FlyBasePopperCtrl())

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
          isPersonVip
          isTeamVip
          name="周杰伦"
          avatar="https://cdn.flyele.net/resources/default_avatar.png"
          bottomRender={<span className={css.desc}>你当前是个人会员</span>}
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
