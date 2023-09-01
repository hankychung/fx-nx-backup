import { IInteract } from '@flyele-nx/types'
import { UserInfoUtils } from '@flyele-nx/utils'
import { Image, ImageProps } from 'antd'
import style from './index.module.scss'
import classNames from 'classnames'

type IProps = ImageProps & {
  /**
   * 设置头像的大小
   * @default 20px
   */
  size?: number
  vipType?: IInteract['vip_type']
  vipNextExpiredAt?: IInteract['vip_next_expired_at']
}

export const Avatar = (props: IProps) => {
  const { vipType, vipNextExpiredAt, size = 20, className } = props

  const getVipBorder = () => {
    const { isTeamVip, isVip } = UserInfoUtils.checkVipType({
      vip_type: vipType,
      vip_next_expired_at: vipNextExpiredAt
    })
    if (size >= 24) {
      return isTeamVip
        ? style['team-vip-min']
        : isVip
        ? style['person-vip-min']
        : ''
    } else {
      return isTeamVip ? style['team-vip'] : isVip ? style['person-vip'] : ''
    }
  }
  return (
    <Image
      {...props}
      className={classNames(style.avatar, getVipBorder(), className)}
    />
  )
}
