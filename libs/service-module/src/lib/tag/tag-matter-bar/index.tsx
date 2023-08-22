/**
 author: william   email:362661044@qq.com
 create_at:2021/10/27 下午 4:17
 **/

import React, { useEffect, useRef, useState, useMemo } from 'react'
// import tagImg from 'assets/icons/tag/tag-black.png'
// import tagImgGray from 'assets/icons/tag/tag-gray.png'

import cs from 'classnames'

import css from './index.module.scss'
import { TagModel } from '@flyele-nx/types'
import { TagUtils } from '../tag_utils'
import { MatterCreateCell } from '@flyele-nx/ui'
import TagEditArea from './components/tag-edit-area'
import TagWidgetBar from './components/TagWidgetBar'
import { TagsHandler } from '@flyele-nx/zustand-handler'
import tagBlack from '../../../assets/tags/tag-black.png'
import tagGray from '../../../assets/tags/tag-gray.png'
import { useTagInfoStore } from '@flyele-nx/zustand-store'

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

  const [showTagModal, isShowTagModal] = useState<boolean>(false)

  const Tags = useTagInfoStore((state) => state.tagsList)

  useEffect(() => {
    if (Tags.length > 0) {
      tagListMap.current = TagUtils.transformTagsMap(Tags)
    } else {
      setSelectedTagKeys([])
    }
  }, [Tags])

  const onClick = () => {
    isShowTagModal(true)
  }

  const onSure = (tags: TagModel[], selected: string[]) => {
    tagListMap.current = TagUtils.transformTagsMap(tags)
    if (onChange) onChange(selected, tags)
    TagsHandler.updateTagsList(tags)
    setSelectedTagKeys(selected)
  }

  const showDefaultContent = useMemo(() => {
    if (selectedTagKeys.length > 0 && tagListMap.current) {
      return false
    }
    if (selectedTagKeys.length === 0 || tagListMap.current === undefined) {
      return true
    }
    return false
  }, [selectedTagKeys.length])

  const showTags = useMemo(() => {
    if (selectedTagKeys.length === 0 || tagListMap.current === undefined)
      return []
    return selectedTagKeys.map((key) => {
      return tagListMap.current!.get(key)!
    })
  }, [selectedTagKeys])

  return (
    <>
      <MatterCreateCell
        isMatterCreate
        onClick={() => onClick()}
        placeholder="添加标签"
        img={selectedTagKeys.length > 0 ? tagBlack : tagGray}
        cellCla={isMatter ? css['tab-cell'] : ''}
        cellContentCla={cs({
          [css.bg_fff]: !isMatter && tagIds && tagIds.length > 0,
          [css['cell-content']]: isMatter
        })}
        showDefaultContent={showDefaultContent}
      >
        <div className={css['tag-matter-bar']}>
          <TagWidgetBar tags={showTags} onAdd={onClick} />
        </div>
      </MatterCreateCell>
      <TagEditArea
        defaultSelectedKeys={selectedTagKeys}
        showTagModal={showTagModal}
        isShowTagModal={isShowTagModal}
        onSure={onSure}
      />
    </>
  )
}
