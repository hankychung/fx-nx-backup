/*
 * @Author: wanghui wanghui@flyele.net
 * @Date: 2023-03-08 16:13:13
 * @LastEditors: wanghui wanghui@flyele.net
 * @LastEditTime: 2023-03-25 12:42:16
 */
import { IActiveGoods } from '@flyele-nx/api'
import { BaseEventNotify } from '@flyele/flyele-components'
import { IFlyeleAvatarItem } from '../../pay-modal'
export type IEvent = {
  show: boolean
  close: undefined
  selectMember: { list: IFlyeleAvatarItem[] }
  showPay: {
    show: boolean
    payInfo?: IActiveGoods
    userInfo?: IFlyeleAvatarItem[]
    isPayFinish?: boolean
  }
}
export class SelectMemberService extends BaseEventNotify<IEvent> {
  selectMember(args: IEvent['selectMember']) {
    this.notification({ event: 'selectMember', data: args })
  }

  show(args: IEvent['show']) {
    this.notification({ event: 'show', data: args })
  }

  close() {
    this.notification({ event: 'close', data: undefined })
  }

  showPay(args: IEvent['showPay']) {
    this.notification({ event: 'showPay', data: args })
  }
}
