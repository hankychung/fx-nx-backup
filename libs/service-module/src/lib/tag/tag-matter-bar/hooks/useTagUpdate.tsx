import { IAction } from '../../../context-menu/types'

interface ITagsActions {
  showAlert: () => Promise<unknown>
}

export const useTagUpdate = (props: ITagsActions): IAction => {
  const { showAlert } = props

  const action = async () => {
    showAlert()
  }

  return {
    txt: '修改',
    callback: action,
    checkAction: true
  }
}
