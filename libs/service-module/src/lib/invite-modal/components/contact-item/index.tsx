import React from 'react'
import css from './index.module.scss'
import { ExternalIcon } from '@flyele-nx/icon'
import {
  FlyAvatar,
  IFlyAvatarItem,
  FlyTooltip
} from '@flyele/flyele-components'
import classNames from 'classnames'
import { useEnterprise } from '@flyele-nx/utils'

interface IFlyAvatarItemPlus extends IFlyAvatarItem {
  corp_id?: string
}

type IProps = {
  item: IFlyAvatarItemPlus
  isExternal?: boolean
  isMy?: boolean
  isGray?: boolean
}

function _ContactItem(props: IProps) {
  const { item, isMy, isExternal, isGray } = props
  const { isEnterprise } = useEnterprise()

  return (
    <div className={css.item}>
      <div className={classNames(css.avatar, { [css.gray]: isGray })}>
        <FlyAvatar
          size={24}
          src={item.avatar}
          overlayClassName={classNames(
            item.isTeamVip
              ? css['global-style-team-vip']
              : item.isVip
              ? css['global-style-person-vip']
              : ''
          )}
        />
        {isExternal && <ExternalIcon />}
      </div>
      <FlyTooltip
        text="不支持企业用户加入"
        disable={isEnterprise ? true : !item?.corp_id} // tooltip显示逻辑 当前协作人是企业账号并且我是个人账号
      >
        <div className={classNames(css.textContent)}>
          <div className={css.name}>{item.name}</div>
          {isMy && <div className={css.my}>(我)</div>}
        </div>
      </FlyTooltip>
    </div>
  )
}

export const ContactItem = React.memo(_ContactItem)
