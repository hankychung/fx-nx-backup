import { TagModel } from '@flyele-nx/types'
import { ITagInfoState, useTagInfoStore } from '@flyele-nx/zustand-store'
import { produce } from 'immer'

class TagHandler {
  private static instance: TagHandler
  private tagsList: TagModel[] = []

  private constructor() {
    // 私有构造函数，防止直接实例化对象
  }

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
        this.tagsList = data
      })
    )
  }

  getTagsList() {
    return this.tagsList
  }
}

export const TagsHandler = TagHandler.getInstance()
