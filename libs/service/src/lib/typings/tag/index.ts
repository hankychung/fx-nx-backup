import { TagWidgetColor } from './const'

export interface TagModel {
  id: string
  tag_id?: string
  name: string
  color: TagWidgetColor
  /**
   * afterSliptLength 用来定制标签宽度的css宽度Width值
   */
  displayLength?: number
}
