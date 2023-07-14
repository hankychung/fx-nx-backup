import React from 'react'
import cs from 'classnames'
import styles from './index.module.scss'

export type SpaceAvatarProps = React.HTMLAttributes<HTMLDivElement> & {
  icon?: string
  icon_color?: string
  size?: string | number
  classname?: string
  style?: React.CSSProperties
}

/**
 * 根据(头像)字段获取图片路径
 * @param key_name 头像名
 */
export const getSpaceAvatarUrl = (key_name = '') => {
  let urlObj = {
    normal: '',
    active: ''
  }

  if (key_name) {
    urlObj = {
      normal: `https://cdn.flyele.net/resources/PC/${key_name}.png`,
      active: `https://cdn.flyele.net/resources/PC/${key_name}_color.png`
    }
  }
  return urlObj
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
