/**
 author: william   email:362661044@qq.com
 create_at:2021/10/27 下午 4:17
 **/

import React, { useEffect, useRef, useState } from 'react'
// import tagImg from 'assets/icons/tag/tag-black.png'
// import tagImgGray from 'assets/icons/tag/tag-gray.png'

import cs from 'classnames'

import css from './index.module.scss'
import { TagModel } from '@flyele-nx/types'
import { TagUtils } from '../tag_utils'
import { LabelApi } from '@flyele-nx/service'
import Cell from './components/cell'
import TagEditArea from './components/tag-edit-area'

// 创建事项tab 专属
interface TagMatterBarProps {
  isMatter?: boolean
  onChange?: (keys: string[], tagArr?: TagModel[]) => void
  tagIds?: string[]
}

// 创建专属
export function TagMatterBar(props: TagMatterBarProps) {
  const { isMatter, onChange, tagIds } = props

  const [selectedTagKeys, setSelectedTagKeys] = useState<string[]>([])

  const tagListMap = useRef<Map<string, TagModel> | undefined>(undefined)

  const [_focusUpdate, setFocusUpdate] = useState(1) // 强制刷新

  const [showTagModal, isShowTagModal] = useState<boolean>(false)
  useEffect(() => {
    if (tagIds && tagIds?.length > 0) {
      setSelectedTagKeys((v) => (v === tagIds ? v : tagIds))
      LabelApi.getTagList().then((res) => {
        if (res.code === 0) {
          const data = res.data as TagModel[]

          tagListMap.current = TagUtils.transformTagsMap(data)
          setFocusUpdate((v) => v + 1)
        }
      })
    } else {
      setSelectedTagKeys([])
    }
  }, [tagIds])

  const onClick = () => {
    console.log('点击了！！！！！！！！！！')
    isShowTagModal(true)
  }

  const onSure = (tags: TagModel[], selected: string[]) => {
    tagListMap.current = TagUtils.transformTagsMap(tags)
    if (onChange) onChange(selected, tags)
    setSelectedTagKeys(selected)
  }

  const buildContent = () => {
    // if (selectedTagKeys.length === 0 || tagListMap.current === undefined)
    //   return null

    // const _tags: TagModel[] = selectedTagKeys.map((key) => {
    //   return tagListMap.current!.get(key)!
    // })

    // return (
    //   <div className={css['tag-matter-bar']}>
    //     <TagWidgetBar tags={_tags} onAdd={onClick} />
    //   </div>
    // )
    return <div>123</div>
  }

  return (
    <>
      <Cell
        onClick={() => onClick()}
        placeholder="添加标签"
        content={
          selectedTagKeys.length > 0 && tagListMap.current
            ? buildContent
            : undefined
        }
        img={selectedTagKeys.length > 0 ? '' : ''}
        cellCla={isMatter ? css['tab-cell'] : ''}
        cellContentCla={cs({
          [css.bg_fff]: !isMatter && tagIds && tagIds.length > 0,
          [css['cell-content']]: isMatter
        })}
      />
      <TagEditArea
        defaultSelectedKeys={selectedTagKeys}
        showTagModal={showTagModal}
        isShowTagModal={isShowTagModal}
        onSure={onSure}
      />
    </>
  )
}
