import { TagModel } from '@flyele-nx/types'
import { ITagInfoState, useTagInfoStore } from '@flyele-nx/zustand-store'
import { produce } from 'immer'

class TagHandler {
  private static instance: TagHandler

  static getInstance() {
    if (!TagHandler.instance) {
      TagHandler.instance = new TagHandler()
    }
    return TagHandler.instance
  }

  // 更新TagsList
  updateTagsList(data: TagModel[]) {
    useTagInfoStore.setState(
      produce((state: ITagInfoState) => {
        state.tagsList = data
      })
    )
  }
}

export const TagsHandler = TagHandler.getInstance()
