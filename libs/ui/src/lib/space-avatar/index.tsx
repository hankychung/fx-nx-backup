import React from 'react'
import cs from 'classnames'
import styles from './index.module.scss'
import { getSpaceAvatarUrl } from '@flyele-nx/utils'

export type SpaceAvatarProps = React.HTMLAttributes<HTMLDivElement> & {
  icon?: string
  icon_color?: string
  size?: string | number
  classname?: string
  style?: React.CSSProperties
}

const _SpaceAvatar: React.FC<React.PropsWithChildren<SpaceAvatarProps>> = ({
  icon,
  icon_color,
  classname,
  style,
  size,
  ...deepProps
}) => {
  return (
    <div
      className={cs(styles.avatar, classname)}
      style={{
        backgroundColor: `#${icon_color}`,
        width: size,
        height: size,
        ...style
      }}
      {...deepProps}
    >
      <img
        className={styles['avatar-img']}
        src={getSpaceAvatarUrl(icon).active}
        alt=""
      />
    </div>
  )
}

export const SpaceAvatar = React.memo(_SpaceAvatar)
