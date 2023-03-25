import { FlyAvatar } from '@flyele/flyele-components'
import React, { ReactNode } from 'react'
import { ReactComponent as PersonVipIcon } from '../../assets/icons/person-vip.svg'
import { ReactComponent as TeamVipIcon } from '../../assets/icons/team-vip.svg'
import css from './index.module.scss'

export interface BaseUserInfoType {
  avatar: string
  name: string
  isTeamVip?: boolean
  isVip?: boolean
}

export const BaseUserInfo = (
  props: BaseUserInfoType & { bottomRender?: ReactNode }
) => {
  const { avatar, name, isTeamVip, isVip, bottomRender } = props
  return (
    <div className={css.container}>
      <FlyAvatar src={avatar} size={36} />
      <div className={css.right}>
        <div className={css.top}>
          <span>{name}</span>
          {isVip && <PersonVipIcon />}
          {isTeamVip && <TeamVipIcon />}
        </div>
        {bottomRender}
      </div>
    </div>
  )
}
