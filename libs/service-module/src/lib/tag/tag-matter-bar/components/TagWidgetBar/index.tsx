/**
 author: william   email:362661044@qq.com
 create_at:2021/10/26 下午 8:46
 **/

import React from 'react'

import css from './index.module.scss'
import { TagModel } from '@flyele-nx/types'
import TagWidget from '../../../tag-widget'
import TagAddButton from '../../../tag-add-button'

// 用于布局 tag 没有点击事件
interface TagWidgetBarProps {
  tags: TagModel[]
  onAdd?: () => void
  rowGap?: number
  columnGap?: number
}

export default function TagWidgetBar(props: TagWidgetBarProps) {
  const { tags, onAdd, rowGap = 8, columnGap = 8 } = props

  const buildTags = () => {
    return tags.map((item) => <TagWidget key={item.id} {...item} />)
  }

  return (
    <div className={css['tags-bar']} style={{ rowGap, columnGap }}>
      <>{buildTags()}</>
      {onAdd && <TagAddButton onClick={onAdd} />}
    </div>
  )
}
