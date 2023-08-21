import { LabelApi } from '@flyele-nx/service'
import { IAction } from '../../../context-menu/types'
import { cloneDeep } from 'lodash'
import { TagModel } from '@flyele-nx/types'
import { TagsHandler } from '@flyele-nx/zustand-handler'
import { useMessage } from '@flyele-nx/ui'

interface ITagsActions {
  tag_id: string
  toggleDeleteVisible?: React.Dispatch<React.SetStateAction<boolean>>
}

export const useTagDelete = (props: ITagsActions): IAction => {
  const { tag_id, toggleDeleteVisible } = props

  const Tags = TagsHandler.getTagsList()
  const [showMsg] = useMessage()

  const action = async () => {
    const res = await LabelApi.deleteTag(tag_id)

    if (res) {
      const _tags = cloneDeep(Tags)
      const index = _tags.findIndex((item) => item.id === tag_id)

      _tags.splice(index, 1)

      // setTags(_tags)

      // onRemoveTag(id)
      toggleDeleteVisible && toggleDeleteVisible(false)
      // Pubjs.publish(PUB.DEL_TAG, { tagId: id })
    } else {
      showMsg({
        msgType: '错误',
        content: '删除标签失败'
      })
    }
  }

  return {
    txt: '删除',
    callback: action,
    checkAction: true
  }
}
