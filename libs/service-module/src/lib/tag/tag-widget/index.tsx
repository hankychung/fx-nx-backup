/**
 author: william   email:362661044@qq.com
 create_at:2021/10/20 下午 3:10
 **/

import React from 'react'
import { TagModel } from '@flyele-nx/service'
import classNames from 'classnames'
import { TagUtils } from '../tag_utils'
import css from './index.module.scss'
import { DoneIcon } from '@flyele-nx/icon'

export enum TagWidgetSize {
  normal = 'normal',
  large = 'large'
}

export interface TagWidgetModel extends TagModel {
  done?: boolean
  onClick?: (id: string) => void
  colourful?: boolean
  size?: TagWidgetSize
  widgetContainerCla?: string
  nowrap?: boolean
}

// const brNotColor = 'rgba(235, 235, 235, 1)'
const textNotColor = 'rgba(153, 159, 171, 1)'

export default function TagWidget(props: TagWidgetModel) {
  const {
    name,
    done,
    color,
    id,
    onClick: _onClick,
    colourful = true,
    size = TagWidgetSize.normal,
    widgetContainerCla,
    nowrap = false
  } = props

  const bgColor = TagUtils.getBgColor(color)
  const textColor = TagUtils.getTextColor(color)

  // size 类名 判断
  const sizeClassName = (): string => {
    switch (size) {
      case TagWidgetSize.normal:
        return css['tag-normal']
      case TagWidgetSize.large:
        return css['tag-large']
      default:
        return ''
    }
  }

  const tagCn = classNames([css.tag, sizeClassName()], {
    [css['not-color']]: !colourful,
    [css['empty-color']]: colourful && id === '-1',
    [css.nowrapClass]: nowrap
  })

  const tagTextCn = classNames([css['tag-text']], {
    [css['tag-text-large']]: size === TagWidgetSize.large
  })

  return (
    <div
      className={classNames(`${css['tag-container']}`, widgetContainerCla)}
      key={id}
      onClick={_onClick ? () => _onClick(id) : undefined}
    >
      <div
        className={tagCn}
        style={{
          // backgroundColor: colourful ? bgColor : 'white',
          backgroundColor: colourful && id !== '-1' ? bgColor : 'white'
        }}
      >
        <span
          className={tagTextCn}
          style={{
            color:
              id !== '-1' ? (colourful ? textColor : textNotColor) : '#6A6A6A'
          }}
        >
          {name}
        </span>
        {done ? (
          <DoneIcon
            width={11}
            height={11}
            className={css['tag-done']}
            color={id !== '-1' ? textColor : '#6A6A6A'}
          />
        ) : null}
      </div>
    </div>
  )
}
