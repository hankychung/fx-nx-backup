import { useMemo } from 'react'
// import { useTagUpdate } from './useTagUpdate'
import { TagModel } from '@flyele-nx/types'
import { useTagDelete } from './useTagDelete'

interface ITagsActions {
  tag_id: string
  isVipWin?: boolean
  toggleDeleteVisible?: React.Dispatch<React.SetStateAction<boolean>>
}

export const useTagsMenuActions = (props: ITagsActions) => {
  const { tag_id, toggleDeleteVisible } = props

  // /**
  //  * 菜单功能—修改
  //  */
  // const tagUpdate = useTagUpdate()
  /**
   * 菜单功能—删除
   */
  const tagDelete = useTagDelete({ tag_id, toggleDeleteVisible })

  /**
   * 右键菜单
   */
  const menuActions = useMemo(() => {
    return [tagDelete]
  }, [tagDelete])

  return {
    menuActions
  }
}
