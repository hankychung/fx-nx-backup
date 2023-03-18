import { FlyAvatar } from '@flyele/flyele-components'
import React, { ReactNode } from 'react'
import { ReactComponent as PersonVipIcon } from '../../assets/icons/person-vip.svg'
import css from './index.module.scss'

interface IProps {
  avatar: string
  name: string
  isTeamVip?: boolean
  isPersonVip?: boolean
  bottomRender?: ReactNode
}

export const BaseUserInfo = (props: IProps) => {
  const { avatar, name, isTeamVip, isPersonVip, bottomRender } = props
  return (
    <div className={css.container}>
      <FlyAvatar src={avatar} size={36} />
      <div className={css.right}>
        <div className={css.top}>
          <span>{name}</span>
          <PersonVipIcon />
        </div>
        {bottomRender}
      </div>
    </div>
  )
}
