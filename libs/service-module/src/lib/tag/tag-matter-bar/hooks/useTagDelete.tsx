import { IAction } from '../../../context-menu/types'

interface ITagsActions {
  tag_id: string
  toggleDeleteVisible?: React.Dispatch<React.SetStateAction<boolean>>
}

export const useTagDelete = (props: ITagsActions): IAction => {
  const { toggleDeleteVisible } = props

  const action = async () => {
    toggleDeleteVisible && toggleDeleteVisible(true)
  }

  return {
    txt: '删除',
    callback: action,
    checkAction: true
  }
}
