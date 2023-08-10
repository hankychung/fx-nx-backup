import React from 'react'
import styles from './index.module.scss'
import { ISpaceAvatarColorConfig, ISpaceAvatarConfig } from '@flyele-nx/types'
import { getSpaceAvatarUrl } from '@flyele-nx/utils'
import { DiamondSpaceIcon } from '@flyele-nx/icon'

//hex -> rgba
function hexToRgba(hex: string, opacity?: string | number) {
  return (
    'rgba(' +
    parseInt('0x' + hex.slice(1, 3)) +
    ',' +
    parseInt('0x' + hex.slice(3, 5)) +
    ',' +
    parseInt('0x' + hex.slice(5, 7)) +
    ',' +
    opacity +
    ')'
  )
}

const _EditSpaceAvatar = ({
  avatarColorList,
  avatarList,
  avatar,
  avatarColor,
  onAvatarChange,
  onAvatarBgChange
}: {
  avatarColorList: ISpaceAvatarColorConfig[]
  avatarList: ISpaceAvatarConfig[]
  avatar?: string // 头像
  avatarColor?: string // 头像背景
  onAvatarChange?: (e: ISpaceAvatarConfig) => void // 头像修改
  onAvatarBgChange?: (e: ISpaceAvatarColorConfig) => void // 头像背景修改
}) => {
  /**
   * 选中头像背景色
   */
  const selectAvatarBg = (selectedItem: ISpaceAvatarColorConfig) => {
    onAvatarBgChange && onAvatarBgChange(selectedItem)
  }

  /**
   * 选中头像icon
   */
  const selectAvatar = (selectedItem: ISpaceAvatarConfig) => {
    onAvatarChange && onAvatarChange(selectedItem)
  }

  return (
    <div
      className={styles['avatar-container']}
      onClick={(e) => {
        e.stopPropagation()
      }}
    >
      <div className={styles['background-list']}>
        {avatarColorList.map((item) => (
          <div
            key={item.icon_color}
            className={styles['background-item']}
            onClick={() => selectAvatarBg(item)}
            style={{
              backgroundColor: `#${item.icon_color}`,
              boxShadow:
                item.icon_color === avatarColor
                  ? `0 0 0 3px ${hexToRgba(`#${item.icon_color}`, 0.3)}`
                  : 'none'
            }}
          />
        ))}
      </div>

      <div className={styles['avatar-icon-list']}>
        {avatarList.map((item) => {
          const avatarInfo = getSpaceAvatarUrl(item.key_name)

          return (
            <div
              key={item.key_name}
              onClick={() => selectAvatar(item)}
              className={styles['avatar-icon-item']}
              style={{
                backgroundColor:
                  item.key_name === avatar ? `#${avatarColor}` : 'transparent'
              }}
            >
              <img
                className={styles['avatar-icon-img']}
                src={
                  item.key_name === avatar
                    ? avatarInfo.active
                    : avatarInfo.normal
                }
                alt=""
              />

              {item.level === 2 && (
                <div className={styles.diamond}>
                  <DiamondSpaceIcon width={16} height={16} />
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export const EditSpaceAvatar = React.memo(_EditSpaceAvatar)
