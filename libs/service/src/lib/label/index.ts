import { service } from '../service'
import { TagModel } from '../typings/tag'

class Label {
  private prefix = 'label/v1'

  async getTagList() {
    return await service.get<TagModel[]>({
      url: `${this.prefix}/tags`
    })
  }
}

export const LabelApi = new Label()
