// /**
//  author: william   email:362661044@qq.com
//  create_at:2021/10/26 下午 3:36
//  **/
// import { BaseObserver } from '@utils/base_observer'
// import { tagApi } from '@/components/Tag/api/tag_api'

// export enum TagEditAreaEventKey {
//   visible,
//   setKeys,
// }

// interface TagEditAreaEvent<T = any> {
//   type: TagEditAreaEventKey
//   data: T
// }

// export class TagEditAreaController extends BaseObserver<TagEditAreaEvent> {
//   setKeys(keys: string[]) {
//     this.notification({ type: TagEditAreaEventKey.setKeys, data: keys })
//   }

//   show() {
//     this.notification({ type: TagEditAreaEventKey.visible, data: true })
//   }

//   hide() {
//     this.notification({ type: TagEditAreaEventKey.visible, data: false })
//   }

//   // 获取绑定的标签
//   getBingTags(refId: string) {
//     return tagApi.getBindTag(refId)
//   }
// }
