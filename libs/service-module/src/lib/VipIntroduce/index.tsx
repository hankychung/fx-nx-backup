import { Button, Modal } from 'antd'
import React, { memo } from 'react'
import { ReactComponent as CustomerIcon } from '../../assets/vip-introduce/customer_service.svg'
import { VipIntroduceContent } from './Content'
import css from './index.module.scss'
import { BaseUserInfo } from '@flyele-nx/ui'
import { FlyAvatar } from '@flyele/flyele-components'

interface IProps {
  open: boolean
  onClose?: () => void
}
const _VipIntroduce = (props: IProps) => {
  const { open, onClose } = props

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
        <Button icon={<CustomerIcon />}>联系客服</Button>
      </div>
      <VipIntroduceContent />
    </Modal>
  )
}

export const VipIntroduce = memo(_VipIntroduce)
