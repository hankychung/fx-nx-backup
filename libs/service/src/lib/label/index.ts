import { service } from '../service'
import { TagModel, TagObjType, ITagParams } from '../typings/tag'

class Label {
  private prefix = 'label/v1'

  async getTagList() {
    return await service.get<TagModel[]>({
      url: `${this.prefix}/tags`
    })
  }

  async createTag(params: ITagParams) {
    return await service.post({ url: `${this.prefix}/tag`, data: params })
  }

  // 绑定标签
  async bindTag(model: {
    refId: string
    tagKeys: string[]
    obj_type: TagObjType
    is_all_bind?: boolean
  }) {
    const { refId, tagKeys, obj_type, is_all_bind = true } = model

    return await service.post({
      url: `${this.prefix}/tag/bind/${refId}`,
      data: {
        tag_ids: tagKeys.join(),
        obj_type: obj_type.toString(),
        is_all_bind
      }
    })
  }

  // 获取自定义视图列表
  getCustomPanelList() {
    return service.get<{ id: string; title: string; content?: string }[]>({
      url: `${this.prefix}/view/list`
    })
  }

  //自定义视图排序，id逗号分割
  sortCustomPanel(ids: string[]) {
    return service.post({
      url: `${this.prefix}/view/item/sort`,
      data: { ids }
    })
  }
}

export const LabelApi = new Label()
