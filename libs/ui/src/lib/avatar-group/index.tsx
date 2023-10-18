// 以单头像为基础的头像组组件， 接收一个数组,来源： flyele-component/src/components/Avatar/FlyAvatarGroup
import React, { useState, useMemo, ReactNode } from 'react'
import { FlyAvatar } from '@flyele/flyele-components'
import cs from 'classnames'
import style from './index.module.scss'

interface IProps {
  /**
   * 头像列表
   */
  list: IAvatar[]
  /**
   * 头像的尺寸
   * @default 20
   */
  avatarSize?: number
  /**
   * 头像之间的间隔
   * @default 4
   */
  shiftingWidth?: number
  /**
   * 最多显示多少个头像，包含more
   */
  max?: number
  /**
   * 加在更多按钮上的class
   */
  moreBtnClass?: string
  /**
   * 是否需要边框
   */
  border?: boolean
  /**
   * 边框颜色
   */
  borderColor?: string
  /**
   * 是否需要一行单个隔开显示
   * 默认否
   */
  inOneRow?: boolean
  /**
   * 自定义渲染.
   */
  renderItem?: (val: IAvatar) => ReactNode
  /**
   * 自定义宽度
   * 需要自己带单位
   * 默认 100%
   */
  rootWidth?: string
}

interface IAvatar {
  src: string
  status?: 'finished'
  userId: string
  overlayClassName?: string
  borderColor?: string
  border?: boolean
}

const AVATAR_WIDTH = 20
const SHIFTING_WIDTH = 4

const _AvatarGroup: React.FC<IProps> = ({
  list,
  avatarSize,
  shiftingWidth,
  moreBtnClass,
  max,
  border = true,
  borderColor = '',
  inOneRow = false,
  renderItem,
  rootWidth = '100%'
}) => {
  const [restCount, setRestCount] = useState(0)

  const _avatarSize = avatarSize || AVATAR_WIDTH
  const _shiftingWidth = shiftingWidth || SHIFTING_WIDTH

  const avatars = useMemo(() => {
    if (max && list.length >= max) {
      console.log('list', list.length, max)
      const _list = list.slice(0, max - 1)
      // 如果最大可渲染长度小于完整长度，需要出现moreBtn
      const rest = list.length - max + 1

      setRestCount(rest)
      return _list
    }
    return list
  }, [max, list])

  const moreBtnSize = useMemo(
    () => ({
      minWidth: _avatarSize,
      height: _avatarSize,
      borderRadius: restCount >= 10 ? `${_avatarSize}px` : '100%'
    }),
    [_avatarSize, restCount]
  )

  const rootStyle = useMemo(() => {
    const baseStyle = {
      width: rootWidth
    }

    if (!inOneRow) return baseStyle

    return {
      ...baseStyle,
      display: 'grid',
      gridTemplateColumns: `repeat(${max}, ${_avatarSize}px)`,
      gridTemplateRows: `repeat(1, ${_avatarSize}px)`,
      gridGap: `${_shiftingWidth}px`
    }
  }, [_avatarSize, _shiftingWidth, inOneRow, max, rootWidth])

  return (
    <div className={style['avatar-group']} style={rootStyle}>
      {avatars.map((i) => {
        if (renderItem) {
          return (
            <div
              key={i.userId}
              className={style['item-box']}
              style={{ height: `${_avatarSize}px`, width: `${_avatarSize}px` }}
            >
              {renderItem(i)}
            </div>
          )
        }
        return (
          <FlyAvatar
            overlayClassName={i.overlayClassName}
            groupAvatar
            src={i.src}
            border={i.border || border}
            borderColor={i.borderColor || borderColor}
            shifting
            shiftingWidth={inOneRow ? 0 : _shiftingWidth}
            key={i.userId}
            size={_avatarSize}
            status={i.status}
          />
        )
      })}

      {!!restCount && (
        <div
          style={moreBtnSize}
          className={cs(style['more-icon'], moreBtnClass, {
            [style.ml0]: inOneRow
          })}
        >
          {`+${restCount}`}
        </div>
      )}
    </div>
  )
}

export const AvatarGroup = React.memo(_AvatarGroup)
