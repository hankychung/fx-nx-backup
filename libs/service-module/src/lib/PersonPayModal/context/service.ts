/*
 * @Author: wanghui wanghui@flyele.net
 * @Date: 2023-03-08 16:13:13
 * @LastEditors: wanghui wanghui@flyele.net
 * @LastEditTime: 2023-03-09 16:12:46
 */
import { BaseEventNotify } from '@flyele/flyele-components'

export type IEvent = {
  show: boolean
  close: undefined
  selectMember: { list: any[] }
  showPay: { show: boolean; payInfo?: any }
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
