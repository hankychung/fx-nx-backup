import { useMemo } from 'react'
import { useTagDelete } from './useTagDelete'
import { useTagUpdate } from './useTagUpdate'

interface ITagsActions {
  tag_id: string
  toggleDeleteVisible?: React.Dispatch<React.SetStateAction<boolean>>
  showAlert: () => Promise<unknown>
}

export const useTagsMenuActions = (props: ITagsActions) => {
  const { tag_id, toggleDeleteVisible, showAlert } = props

  /**
   * 菜单功能—修改
   */
  const tagUpdate = useTagUpdate({ showAlert })
  /**
   * 菜单功能—删除
   */
  const tagDelete = useTagDelete({ tag_id, toggleDeleteVisible })

  /**
   * 右键菜单
   */
  const menuActions = useMemo(() => {
    return [tagDelete, tagUpdate]
  }, [tagDelete, tagUpdate])

  return {
    menuActions
  }
}
