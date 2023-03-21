import { FlyAvatar } from '@flyele/flyele-components'
import React, { ReactNode } from 'react'
import { ReactComponent as PersonVipIcon } from '../../assets/icons/person-vip.svg'
import { ReactComponent as TeamVipIcon } from '../../assets/icons/team-vip.svg'
import css from './index.module.scss'

export interface BaseUserInfoType {
  avatar: string
  name: string
  isTeamVip?: boolean
  isPersonVip?: boolean
}

export const BaseUserInfo = (
  props: BaseUserInfoType & { bottomRender?: ReactNode }
) => {
  const { avatar, name, isTeamVip, isPersonVip, bottomRender } = props
  return (
    <div className={css.container}>
      <FlyAvatar src={avatar} size={36} />
      <div className={css.right}>
        <div className={css.top}>
          <span>{name}</span>
          {isPersonVip && <PersonVipIcon />}
          {isTeamVip && <TeamVipIcon />}
        </div>
        {bottomRender}
      </div>
    </div>
  )
}
